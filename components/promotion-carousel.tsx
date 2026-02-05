"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Promotion } from "@/lib/types"

interface PromotionCarouselProps {
  promotions: Promotion[]
}

export function PromotionCarousel({ promotions }: PromotionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((i) => (i + 1) % promotions.length)
  }

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + promotions.length) % promotions.length)
  }

  if (promotions.length === 0) return null

  const promotion = promotions[currentIndex]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Aktualności i promocje</h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={next}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Link href={`/promotions/${promotion.id}`}>
        <Card className="overflow-hidden transition-shadow hover:shadow-md cursor-pointer">
          <div className="aspect-[2/1] w-full overflow-hidden bg-muted">
            <img
              src={promotion.imageUrl || "/placeholder.svg"}
              alt={promotion.title}
              className="h-full w-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="mb-1 text-base font-semibold">{promotion.title}</div>
            <p className="text-sm text-muted-foreground">{promotion.description}</p>
          </CardContent>
        </Card>
      </Link>

      <div className="flex justify-center gap-1.5">
        {promotions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
