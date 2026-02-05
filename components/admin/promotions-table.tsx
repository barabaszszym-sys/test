"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Percent, Calendar, Package, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { mockPromotions, mockProducts } from "@/lib/mock-data"
import type { Promotion, Product } from "@/lib/types"
import { getFromStorage, saveToStorage } from "@/lib/storage"

export function PromotionsTable() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const storedPromotions = getFromStorage<Promotion[]>("soymax_promotions")
    const storedProducts = getFromStorage<Product[]>("soymax_products")
    setPromotions(storedPromotions || mockPromotions)
    setProducts(storedProducts || mockProducts)
  }, [])

  const getAssignedProducts = (productIds: string[] = []) => {
    return products.filter((p) => productIds.includes(p.id))
  }

  const getDiscountDisplay = (promo: Promotion) => {
    if (promo.discountBonus) {
      return `${promo.discountBonus}%`
    }
    if (promo.multiplier) {
      return `x${promo.multiplier} pkt`
    }
    return "-"
  }

  const getTypeLabel = (type: Promotion["type"]) => {
    switch (type) {
      case "product":
        return "Produktowa"
      case "points":
        return "Punktowa"
      case "info":
        return "Informacyjna"
    }
  }

  const getTypeBadgeVariant = (type: Promotion["type"]) => {
    switch (type) {
      case "product":
        return "default"
      case "points":
        return "secondary"
      case "info":
        return "outline"
    }
  }

  const filteredPromotions = promotions.filter(
    (promo) =>
      promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRowClick = (promo: Promotion) => {
    setSelectedPromotion(promo)
    setIsDrawerOpen(true)
  }

  const handleDeletePromotion = (promoId: string) => {
    const updated = promotions.filter((p) => p.id !== promoId)
    setPromotions(updated)
    saveToStorage("soymax_promotions", updated)
    setIsDrawerOpen(false)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Szukaj promocji..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Dodaj promocję
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa promocji</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Przypisane produkty</TableHead>
              <TableHead>Rabat / Bonus</TableHead>
              <TableHead>Okres</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPromotions.map((promo) => {
              const assignedProducts = getAssignedProducts(promo.assignedProductIds)
              return (
                <TableRow
                  key={promo.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(promo)}
                >
                  <TableCell className="font-medium">{promo.title}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(promo.type)}>{getTypeLabel(promo.type)}</Badge>
                  </TableCell>
                  <TableCell>
                    {assignedProducts.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {assignedProducts.slice(0, 2).map((p) => (
                          <Badge key={p.id} variant="outline" className="text-xs">
                            {p.name.split(" ").slice(0, 2).join(" ")}
                          </Badge>
                        ))}
                        {assignedProducts.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{assignedProducts.length - 2}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Wszystkie</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">{getDiscountDisplay(promo)}</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={promo.isActive ? "default" : "secondary"}
                      className={promo.isActive ? "bg-green-600" : ""}
                    >
                      {promo.isActive ? "Aktywna" : "Zakończona"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRowClick(promo)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePromotion(promo.id)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Usuń
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Drawer ze szczegółami promocji */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedPromotion && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <Badge variant={getTypeBadgeVariant(selectedPromotion.type)}>
                    {getTypeLabel(selectedPromotion.type)}
                  </Badge>
                  <Badge
                    variant={selectedPromotion.isActive ? "default" : "secondary"}
                    className={selectedPromotion.isActive ? "bg-green-600" : ""}
                  >
                    {selectedPromotion.isActive ? "Aktywna" : "Zakończona"}
                  </Badge>
                </div>
                <SheetTitle className="text-xl">{selectedPromotion.title}</SheetTitle>
                <SheetDescription>{selectedPromotion.description}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Grafika promocji */}
                {selectedPromotion.imageUrl && (
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <img
                      src={selectedPromotion.imageUrl || "/placeholder.svg"}
                      alt={selectedPromotion.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <Separator />

                {/* Szczegóły rabatu */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Percent className="h-4 w-4" />
                    Rabat / Bonus
                  </h4>
                  <div className="rounded-lg border bg-green-50 p-4">
                    <p className="text-2xl font-bold text-green-600">{getDiscountDisplay(selectedPromotion)}</p>
                    {selectedPromotion.multiplier && <p className="text-sm text-muted-foreground">Mnożnik punktów</p>}
                    {selectedPromotion.discountBonus && (
                      <p className="text-sm text-muted-foreground">Dodatkowy rabat</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Okres trwania */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Okres trwania
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Od</p>
                      <p className="font-medium">{formatDate(selectedPromotion.startDate)}</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">Do</p>
                      <p className="font-medium">{formatDate(selectedPromotion.endDate)}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Przypisane produkty */}
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Przypisane produkty
                  </h4>
                  {getAssignedProducts(selectedPromotion.assignedProductIds).length > 0 ? (
                    <div className="space-y-2">
                      {getAssignedProducts(selectedPromotion.assignedProductIds).map((product) => (
                        <div key={product.id} className="flex items-center gap-3 rounded-lg border p-3">
                          <div className="h-12 w-12 overflow-hidden rounded bg-muted">
                            <img
                              src={product.imageUrl || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.pricePerUnit} zł / szt.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Promocja dotyczy wszystkich produktów</p>
                  )}
                </div>

                <Separator />

                {/* Przyciski akcji */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Edit className="mr-2 h-4 w-4" />
                    Edytuj promocję
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeletePromotion(selectedPromotion.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
