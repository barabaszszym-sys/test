import { Suspense } from "react"
import { DistributorsTable } from "@/components/admin/distributors-table"

export default function AdminDistributorsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dystrybutorzy</h1>
        <p className="text-muted-foreground">Zarządzaj listą dystrybutorów - sklepów z paszą</p>
      </div>
      <Suspense fallback={<div className="text-muted-foreground">Ładowanie...</div>}>
        <DistributorsTable />
      </Suspense>
    </div>
  )
}
