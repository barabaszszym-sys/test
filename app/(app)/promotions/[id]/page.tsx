"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Gift, Percent, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Promotion } from "@/lib/types"
import { getPromotions } from "@/lib/storage"

export default function PromotionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [promotion, setPromotion] = useState<Promotion | null>(null)
  const [participating, setParticipating] = useState(false)

  useEffect(() => {
    const promotions = getPromotions()
    const found = promotions.find((p) => p.id === params.id)
    setPromotion(found || null)

    // Check if user already participating (stored in localStorage)
    const participatingPromos = JSON.parse(localStorage.getItem("soymax_participating_promos") || "[]")
    setParticipating(participatingPromos.includes(params.id))
  }, [params.id])

  const handleParticipate = () => {
    const participatingPromos = JSON.parse(localStorage.getItem("soymax_participating_promos") || "[]")
    if (!participatingPromos.includes(params.id)) {
      participatingPromos.push(params.id)
      localStorage.setItem("soymax_participating_promos", JSON.stringify(participatingPromos))
      setParticipating(true)
    }
  }

  if (!promotion) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Promocja nie została znaleziona</p>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getTypeIcon = () => {
    switch (promotion.type) {
      case "points":
        return <Star className="h-4 w-4" />
      case "product":
        return <Gift className="h-4 w-4" />
      case "info":
        return <Percent className="h-4 w-4" />
    }
  }

  const getTypeLabel = () => {
    switch (promotion.type) {
      case "points":
        return "Punkty"
      case "product":
        return "Produkt"
      case "info":
        return "Rabat"
    }
  }

  const getTypeBadgeColor = () => {
    switch (promotion.type) {
      case "points":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "product":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "info":
        return "bg-green-100 text-green-700 border-green-200"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Szczegóły promocji</h1>
        </div>
      </div>

      {/* Main image */}
      <div className="relative aspect-[2/1] w-full overflow-hidden">
        <img
          src={promotion.imageUrl || "/placeholder.svg"}
          alt={promotion.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className={`mb-2 ${getTypeBadgeColor()}`}>
            {getTypeIcon()}
            <span className="ml-1">{getTypeLabel()}</span>
          </Badge>
          <h2 className="text-2xl font-bold text-white">{promotion.title}</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Bonus indicators */}
        {(promotion.multiplier || promotion.discountBonus) && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {promotion.multiplier && (
                  <div className="flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-white">
                    <Star className="h-5 w-5" />
                    <span className="text-lg font-bold">x{promotion.multiplier} punkty</span>
                  </div>
                )}
                {promotion.discountBonus && (
                  <div className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-white">
                    <Percent className="h-5 w-5" />
                    <span className="text-lg font-bold">+{promotion.discountBonus}% rabatu</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Date range */}
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Okres trwania</p>
              <p className="font-medium">
                {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 font-semibold">Opis promocji</h3>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {promotion.fullDescription ? (
                promotion.fullDescription.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={i} className="font-semibold text-foreground mt-4 mb-2">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    )
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <li key={i} className="ml-4">
                        {line.replace("- ", "").replace(/\*\*/g, "")}
                      </li>
                    )
                  }
                  if (line.trim() === "") return null
                  return (
                    <p key={i}>
                      {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={j} className="text-foreground">
                              {part.replace(/\*\*/g, "")}
                            </strong>
                          )
                        }
                        return part
                      })}
                    </p>
                  )
                })
              ) : (
                <p>{promotion.description}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="fixed bottom-20 left-0 right-0 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button
            className="w-full h-12 text-base font-semibold"
            size="lg"
            onClick={handleParticipate}
            disabled={participating}
          >
            {participating ? "Bierzesz udział w promocji" : "Weź udział"}
          </Button>
        </div>
      </div>
    </div>
  )
}
