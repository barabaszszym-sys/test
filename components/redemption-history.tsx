"use client"

import type { Redemption } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RedemptionHistoryProps {
  redemptions: Redemption[]
}

const statusLabels: Record<Redemption["status"], string> = {
  pending: "Oczekuje",
  ready: "Gotowa",
  collected: "Odebrana",
}

const statusVariants: Record<Redemption["status"], "default" | "secondary" | "outline"> = {
  pending: "secondary",
  ready: "default",
  collected: "outline",
}

export function RedemptionHistory({ redemptions }: RedemptionHistoryProps) {
  if (redemptions.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Moje wymiany</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">Nie masz jeszcze zadnych wymian.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Moje wymiany</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {redemptions.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-sm font-medium truncate">{r.rewardName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(r.redeemedAt).toLocaleDateString("pl-PL")} | -{r.pointsSpent} pkt
                </p>
              </div>
              <Badge variant={statusVariants[r.status]} className="text-[10px] shrink-0">
                {statusLabels[r.status]}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
