import { Suspense } from "react"
import { ProductsTable } from "@/components/admin/products-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminProductsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Produkty</h1>
        <p className="text-muted-foreground">Zarządzaj katalogiem produktów SOYMAX</p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ProductsTable />
      </Suspense>
    </div>
  )
}
