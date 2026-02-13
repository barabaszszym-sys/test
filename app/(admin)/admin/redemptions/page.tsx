import { Suspense } from "react"
import { RedemptionsTable } from "@/components/admin/redemptions-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminRedemptionsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Wymiany nagrod</h1>
        <p className="text-muted-foreground">Przegladaj i zarzadzaj wymianami punktow na nagrody</p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <RedemptionsTable />
      </Suspense>
    </div>
  )
}
