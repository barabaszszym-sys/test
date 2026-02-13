import { Suspense } from "react"
import { RewardsTable } from "@/components/admin/rewards-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminRewardsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Katalog nagrod</h1>
        <p className="text-muted-foreground">Zarzadzaj nagrodami dostepnymi w programach lojalnosciowych</p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <RewardsTable />
      </Suspense>
    </div>
  )
}
