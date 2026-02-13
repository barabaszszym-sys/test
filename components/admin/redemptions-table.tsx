"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, Package } from "lucide-react"
import { mockAdminRedemptions } from "@/lib/mock-data"
import type { AdminRedemption } from "@/lib/types"

const statusConfig = {
  pending: { label: "Oczekujaca", variant: "secondary" as const, icon: Clock },
  ready: { label: "Gotowa", variant: "default" as const, icon: Package },
  collected: { label: "Odebrana", variant: "outline" as const, icon: CheckCircle },
}

export function RedemptionsTable() {
  const [redemptions, setRedemptions] = useState<AdminRedemption[]>(mockAdminRedemptions)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filtered = filterStatus === "all" ? redemptions : redemptions.filter((r) => r.status === filterStatus)

  const updateStatus = (id: string, newStatus: AdminRedemption["status"]) => {
    setRedemptions(
      redemptions.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Filtruj:</span>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie</SelectItem>
            <SelectItem value="pending">Oczekujace</SelectItem>
            <SelectItem value="ready">Gotowe do odbioru</SelectItem>
            <SelectItem value="collected">Odebrane</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Klient</TableHead>
                <TableHead>Nagroda</TableHead>
                <TableHead>Punkty</TableHead>
                <TableHead>Odbiór</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((redemption) => {
                const config = statusConfig[redemption.status]
                const StatusIcon = config.icon
                return (
                  <TableRow key={redemption.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{redemption.clientName}</p>
                        <p className="text-xs text-muted-foreground">{redemption.clientEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{redemption.rewardName}</TableCell>
                    <TableCell>{redemption.pointsSpent} pkt</TableCell>
                    <TableCell className="text-sm">
                      {redemption.pickupType === "distributor" && "U dystrybutora"}
                      {redemption.pickupType === "soymax" && "W siedzibie SOYMAX"}
                      {redemption.pickupType === "delivery" && "Dostawa"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(redemption.redeemedAt).toLocaleDateString("pl-PL")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={config.variant} className="gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {redemption.status === "pending" && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(redemption.id, "ready")}>
                          Potwierdz
                        </Button>
                      )}
                      {redemption.status === "ready" && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(redemption.id, "collected")}>
                          Odebrana
                        </Button>
                      )}
                      {redemption.status === "collected" && (
                        <span className="text-xs text-muted-foreground">Zakonczona</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    Brak wymian do wyswietlenia
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
