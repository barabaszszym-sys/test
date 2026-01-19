import { Suspense } from "react"
import { RolesTable } from "@/components/admin/roles-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminRolesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Role i uprawnienia</h1>
        <p className="text-muted-foreground">Zarządzanie rolami użytkowników i ich uprawnieniami w systemie</p>
      </div>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <RolesTable />
      </Suspense>
    </div>
  )
}
