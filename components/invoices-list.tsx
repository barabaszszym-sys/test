"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, Calendar } from "lucide-react"
import { mockInvoices } from "@/lib/mock-data"
import type { Invoice } from "@/lib/types"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(value)
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getStatusBadge(status: Invoice["status"]) {
  switch (status) {
    case "paid":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Opłacona</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Oczekująca</Badge>
    case "overdue":
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Przeterminowana</Badge>
  }
}

function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const handleDownload = () => {
    alert(`Pobieranie faktury: ${invoice.invoiceNumber}\n\nW wersji produkcyjnej plik PDF zostałby pobrany.`)
  }

  return (
    <Card className="cursor-pointer transition-shadow hover:shadow-md active:scale-[0.99]" onClick={handleDownload}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground">{invoice.invoiceNumber}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(invoice.date)}</span>
              </div>
            </div>
          </div>
          <Download className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Kwota brutto</p>
            <p className="text-lg font-bold text-foreground">{formatCurrency(invoice.grossValue)}</p>
          </div>
          {getStatusBadge(invoice.status)}
        </div>
      </CardContent>
    </Card>
  )
}

export function InvoicesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const invoices = mockInvoices

  const filteredInvoices = useMemo(() => {
    if (!searchQuery.trim()) return invoices

    const query = searchQuery.toLowerCase()
    return invoices.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        formatDate(invoice.date).toLowerCase().includes(query) ||
        invoice.grossValue.toString().includes(query),
    )
  }, [invoices, searchQuery])

  return (
    <>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Szukaj po numerze, dacie, kwocie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Invoices Grid */}
      <div className="mt-4">
        {filteredInvoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-2 text-muted-foreground">Nie znaleziono faktur</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
