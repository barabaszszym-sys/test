import { Suspense } from "react"
import { ProductsCatalog } from "@/components/products-catalog"

export default function ProductsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-2xl space-y-6 p-4 pb-20">
      <div>
        <h1 className="text-2xl font-bold">Katalog produktów</h1>
        <p className="text-sm text-muted-foreground">Pasze sojowe SOYMAX dla zwierząt gospodarskich</p>
      </div>

      <Suspense fallback={<div className="py-12 text-center text-muted-foreground">Ładowanie...</div>}>
        <ProductsCatalog />
      </Suspense>
    </div>
  )
}
