import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX } from "lucide-react"

interface StatsSummaryProps {
  total: number
  active: number
  inactive: number
  newThisMonth?: number
}

export function StatsSummary({ total, active, inactive, newThisMonth }: StatsSummaryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Twoi klienci</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 p-4">
        <div className="flex flex-col items-center text-center">
          <Users className="mb-1 h-5 w-5 text-muted-foreground" />
          <span className="text-2xl font-bold">{total}</span>
          <span className="text-xs text-muted-foreground">Wszyscy</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <UserCheck className="mb-1 h-5 w-5 text-primary" />
          <span className="text-2xl font-bold text-primary">{active}</span>
          <span className="text-xs text-muted-foreground">Aktywni</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <UserX className="mb-1 h-5 w-5 text-muted-foreground" />
          <span className="text-2xl font-bold">{inactive}</span>
          <span className="text-xs text-muted-foreground">Nieaktywni</span>
        </div>
      </CardContent>
      {newThisMonth !== undefined && newThisMonth > 0 && (
        <div className="border-t px-4 py-2 text-center text-sm text-primary">+{newThisMonth} nowych w tym miesiącu</div>
      )}
    </Card>
  )
}
