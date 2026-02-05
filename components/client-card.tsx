"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Calendar, ShoppingBag, Award } from "lucide-react"
import type { Client } from "@/lib/types"

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  const formatDate = (date: string | null) => {
    if (!date) return "Brak"
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-foreground">
              {client.firstName} {client.lastName}
            </h3>
            <Badge
              variant={client.status === "active" ? "default" : "secondary"}
              className={
                client.status === "active"
                  ? "bg-green-100 text-green-700 hover:bg-green-100 mt-1"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-100 mt-1"
              }
            >
              {client.status === "active" ? "Aktywny" : "Nieaktywny"}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-orange-500">
            <Award className="h-4 w-4" />
            <span className="font-bold">{client.points}</span>
            <span className="text-xs text-muted-foreground">pkt</span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{client.email}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">Rejestracja: {formatDate(client.registrationDate)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="text-xs">Ostatni zakup: {formatDate(client.lastPurchaseDate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
