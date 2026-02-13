import { Suspense } from "react"
import { LoyaltyProgramsTable } from "@/components/admin/loyalty-programs-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoyaltyProgramsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Programy lojalnosciowe</h1>
        <p className="text-muted-foreground">Zarzadzaj programami punktowymi i przelicznikami</p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <LoyaltyProgramsTable />
      </Suspense>
    </div>
  )
}
