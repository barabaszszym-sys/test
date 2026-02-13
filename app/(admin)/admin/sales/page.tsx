"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileSpreadsheet, Users, ShoppingBag, TrendingUp, Gift } from "lucide-react"

const reportTypes = [
  { id: "promotions", label: "Aktywne promocje", icon: TrendingUp, description: "Lista aktywnych promocji z datami i zasiegiem" },
  { id: "clients-per-dist", label: "Klienci per dystrybutor", icon: Users, description: "Zestawienie klientow w rozbiciu na dystrybutorów" },
  { id: "discount-usage", label: "Wykorzystanie rabatow", icon: ShoppingBag, description: "Statystyki uzycia rabatow i kodow promocyjnych" },
  { id: "redemptions", label: "Wymiany nagrod", icon: Gift, description: "Historia wymian punktow na nagrody" },
]

export default function AdminSalesPage() {
  const [exportingId, setExportingId] = useState<string | null>(null)

  const handleExport = (reportId: string) => {
    setExportingId(reportId)
    setTimeout(() => {
      setExportingId(null)
      alert("Raport zostal pobrany (mock)")
    }, 1500)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Raporty</h1>
        <p className="text-muted-foreground">Generuj i eksportuj raporty do Excel</p>
      </div>

      <div className="grid gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon
          return (
            <Card key={report.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{report.label}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleExport(report.id)}
                  disabled={exportingId === report.id}
                >
                  {exportingId === report.id ? (
                    "Eksportowanie..."
                  ) : (
                    <>
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Eksportuj Excel
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Podsumowanie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">18</p>
              <p className="text-xs text-muted-foreground">Dystrybutorzy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">87</p>
              <p className="text-xs text-muted-foreground">Klienci</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">Aktywne promocje</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Wymiany nagrod</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
