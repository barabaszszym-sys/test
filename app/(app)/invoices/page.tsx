import { Suspense } from "react"
import { Receipt } from "lucide-react"
import { mockInvoices } from "@/lib/mock-data"
import { InvoicesList } from "@/components/invoices-list"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(value)
}

export default function InvoicesPage() {
  const invoices = mockInvoices
  const totalValue = invoices.reduce((sum, inv) => sum + inv.grossValue, 0)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 pb-4 pt-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
            <Receipt className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Faktury</h1>
            <p className="text-sm text-muted-foreground">
              {invoices.length} faktur, razem {formatCurrency(totalValue)}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <Suspense fallback={null}>
            <InvoicesList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
