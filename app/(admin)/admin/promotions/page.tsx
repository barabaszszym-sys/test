import { Suspense } from "react"
import { PromotionsTable } from "@/components/admin/promotions-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminPromotionsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Promocje</h1>
        <p className="text-muted-foreground">Zarządzaj promocjami i akcjami specjalnymi</p>
      </div>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <PromotionsTable />
      </Suspense>
    </div>
  )
}
