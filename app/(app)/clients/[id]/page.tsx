"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Phone, Mail, Calendar, ShoppingBag, Award, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getClientById, isLoggedIn } from "@/lib/storage"
import type { Client } from "@/lib/types"

export default function ClientDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [client, setClient] = useState<Client | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/")
      return
    }
    const id = params.id as string
    const found = getClientById(id)
    if (found) {
      setClient(found)
    } else {
      setNotFound(true)
    }
  }, [])

  const formatDate = (date: string | null) => {
    if (!date) return "Brak"
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  if (notFound) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Wstecz
        </Button>
        <p className="text-center text-muted-foreground py-12">Klient nie znaleziony.</p>
      </div>
    )
  }

  if (!client) return null

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-primary px-4 pt-2 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-white">Szczegoly klienta</h1>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {client.firstName} {client.lastName}
            </h2>
            <Badge
              variant="secondary"
              className={
                client.status === "active"
                  ? "bg-white/20 text-white mt-1"
                  : "bg-white/10 text-white/70 mt-1"
              }
            >
              {client.status === "active" ? "Aktywny" : "Nieaktywny"}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white">{client.points}</p>
            <p className="text-xs text-white/70">punktow</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Dane kontaktowe */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dane kontaktowe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{client.email}</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{client.phone}</span>
              </div>
              <a href={`tel:${client.phone}`}>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  Zadzwon
                </Button>
              </a>
            </div>
            {client.city && (
              <>
                <Separator />
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {client.zipCode && `${client.zipCode} `}{client.city}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Statystyki */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Statystyki</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Punkty</span>
              </div>
              <span className="text-sm font-bold text-primary">{client.points} pkt</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Data rejestracji</span>
              </div>
              <span className="text-sm font-medium">{formatDate(client.registrationDate)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Ostatni zakup</span>
              </div>
              <span className="text-sm font-medium">{formatDate(client.lastPurchaseDate)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Newsletter</span>
              </div>
              <Badge variant={client.newsletter ? "default" : "secondary"} className="text-xs">
                {client.newsletter ? "Tak" : "Nie"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Akcje */}
        <div className="flex gap-3">
          <a href={`tel:${client.phone}`} className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Phone className="mr-2 h-4 w-4" />
              Zadzwon
            </Button>
          </a>
          <a href={`mailto:${client.email}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              <Mail className="mr-2 h-4 w-4" />
              Napisz
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
