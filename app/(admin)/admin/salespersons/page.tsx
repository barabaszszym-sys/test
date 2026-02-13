import { Suspense } from "react"
import { SalespersonsTable } from "@/components/admin/salespersons-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminSalespersonsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Handlowcy</h1>
        <p className="text-muted-foreground">Zarzadzaj zespolem handlowcow i przypisaniem dystrybutorów</p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <SalespersonsTable />
      </Suspense>
    </div>
  )
}
