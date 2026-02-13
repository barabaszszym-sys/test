"use client"

import type { PointsHistoryEntry } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PointsHistoryProps {
  entries: PointsHistoryEntry[]
}

export function PointsHistory({ entries }: PointsHistoryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Historia punktow</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-sm font-medium truncate">{entry.operation}</p>
                <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString("pl-PL")}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className={`text-sm font-bold ${entry.points > 0 ? "text-green-600" : "text-red-600"}`}>
                  {entry.points > 0 ? "+" : ""}{entry.points} pkt
                </span>
                <span className="text-xs text-muted-foreground">Saldo: {entry.balance}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
