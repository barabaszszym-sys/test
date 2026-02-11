"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Percent, DollarSign, Copy, Check } from "lucide-react"
import type { Discount } from "@/lib/types"

interface DiscountsCarouselProps {
  discounts: Discount[]
}

export function DiscountsCarousel({ discounts }: DiscountsCarouselProps) {
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const activeDiscounts = discounts.filter((d) => d.active)

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Moje rabaty</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-3">
          <div className="overflow-x-auto">
            <div className="flex gap-3 pb-2">
              {activeDiscounts.map((discount) => (
                <button
                  key={discount.id}
                  onClick={() => setSelectedDiscount(discount)}
                  className="flex-shrink-0 w-32 p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {discount.type === "percentage" ? (
                      <Percent className="h-4 w-4 text-primary" />
                    ) : (
                      <DollarSign className="h-4 w-4 text-primary" />
                    )}
                    <span className="font-bold text-lg">{discount.value}</span>
                    {discount.type === "percentage" && <span className="text-xs">%</span>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{discount.name}</p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Sheet open={!!selectedDiscount} onOpenChange={(open) => !open && setSelectedDiscount(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          {selectedDiscount && (
            <>
              <SheetHeader className="text-left">
                <SheetTitle>{selectedDiscount.name}</SheetTitle>
                <SheetDescription>{selectedDiscount.description}</SheetDescription>
              </SheetHeader>

              <div className="space-y-4 mt-6">
                <div className="rounded-lg bg-primary/10 p-4">
                  <p className="text-sm text-muted-foreground mb-2">Kod rabatowy:</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <p className="text-2xl font-bold tracking-wider">{selectedDiscount.code}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyCode(selectedDiscount.code)}
                      className="gap-2"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="h-4 w-4" />
                          Skopiowane
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Kopiuj
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wartość rabatu:</span>
                    <span className="font-semibold">
                      {selectedDiscount.type === "percentage"
                        ? `${selectedDiscount.value}%`
                        : `${selectedDiscount.value} zł`}
                    </span>
                  </div>
                  {selectedDiscount.minOrderValue && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min. wartość zamówienia:</span>
                      <span className="font-semibold">{selectedDiscount.minOrderValue} zł</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ważny do:</span>
                    <span className="font-semibold">
                      {new Date(selectedDiscount.expiryDate).toLocaleDateString("pl-PL")}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Zastosuj rabat
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
