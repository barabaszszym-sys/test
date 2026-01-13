"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getFromStorage, saveToStorage } from "@/lib/storage"
import { mockProducts } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

const categoryLabels: Record<Product["category"], string> = {
  premium: "Premium",
  standard: "Standard",
  bio: "Bio",
  starter: "Starter",
}

const categoryColors: Record<Product["category"], string> = {
  premium: "bg-amber-100 text-amber-800",
  standard: "bg-gray-100 text-gray-800",
  bio: "bg-green-100 text-green-800",
  starter: "bg-blue-100 text-blue-800",
}

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = getFromStorage<Product[]>("admin_products")
    return stored || mockProducts
  })
  const [search, setSearch] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<Product>>({})

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()),
  )

  const openDrawer = (product: Product, edit = false) => {
    setSelectedProduct(product)
    setEditForm(product)
    setIsEditing(edit)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedProduct(null)
    setIsEditing(false)
    setEditForm({})
  }

  const handleSave = () => {
    if (!selectedProduct || !editForm) return

    const updatedProducts = products.map((p) => (p.id === selectedProduct.id ? { ...p, ...editForm } : p))
    setProducts(updatedProducts)
    saveToStorage("admin_products", updatedProducts)
    closeDrawer()
  }

  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter((p) => p.id !== productId)
    setProducts(updatedProducts)
    saveToStorage("admin_products", updatedProducts)
    closeDrawer()
  }

  const handleAddNew = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: "Nowy produkt",
      category: "standard",
      description: "Opis produktu",
      protein: 44,
      weight: 25,
      pricePerUnit: 200,
      imageUrl: "/soy-feed-bag-product.jpg",
      inStock: true,
      features: [],
    }
    setSelectedProduct(newProduct)
    setEditForm(newProduct)
    setIsEditing(true)
    setIsDrawerOpen(true)
  }

  const handleSaveNew = () => {
    if (!editForm.name) return

    const newProduct = { ...editForm } as Product
    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)
    saveToStorage("admin_products", updatedProducts)
    closeDrawer()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Szukaj produktów..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleAddNew} className="bg-primary">
          <Plus className="mr-2 h-4 w-4" />
          Dodaj produkt
        </Button>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Nazwa</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead>Białko</TableHead>
              <TableHead>Waga</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => openDrawer(product)}
              >
                <TableCell>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={categoryColors[product.category]}>
                    {categoryLabels[product.category]}
                  </Badge>
                </TableCell>
                <TableCell>{product.protein}%</TableCell>
                <TableCell>{product.weight} kg</TableCell>
                <TableCell>{product.pricePerUnit.toFixed(2)} zł</TableCell>
                <TableCell>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "Dostępny" : "Niedostępny"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        openDrawer(product, true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(product.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {isEditing
                ? selectedProduct?.id.startsWith("prod-") && !products.find((p) => p.id === selectedProduct?.id)
                  ? "Nowy produkt"
                  : "Edytuj produkt"
                : "Szczegóły produktu"}
            </SheetTitle>
            <SheetDescription>
              {isEditing ? "Wypełnij dane produktu" : "Podgląd informacji o produkcie"}
            </SheetDescription>
          </SheetHeader>

          {selectedProduct && (
            <div className="mt-6 space-y-6">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nazwa produktu</Label>
                    <Input
                      id="name"
                      value={editForm.name || ""}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategoria</Label>
                    <Select
                      value={editForm.category}
                      onValueChange={(value: Product["category"]) => setEditForm({ ...editForm, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="bio">Bio</SelectItem>
                        <SelectItem value="starter">Starter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Opis</Label>
                    <Textarea
                      id="description"
                      value={editForm.description || ""}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="protein">Białko (%)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={editForm.protein || 0}
                        onChange={(e) => setEditForm({ ...editForm, protein: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Waga (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={editForm.weight || 0}
                        onChange={(e) => setEditForm({ ...editForm, weight: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Cena (zł)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={editForm.pricePerUnit || 0}
                      onChange={(e) => setEditForm({ ...editForm, pricePerUnit: Number.parseFloat(e.target.value) })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="inStock">Dostępność</Label>
                    <Switch
                      id="inStock"
                      checked={editForm.inStock}
                      onCheckedChange={(checked) => setEditForm({ ...editForm, inStock: checked })}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedProduct.name}</h3>
                      <Badge variant="secondary" className={categoryColors[selectedProduct.category]}>
                        {categoryLabels[selectedProduct.category]}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Białko</p>
                      <p className="text-lg font-semibold">{selectedProduct.protein}%</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Waga</p>
                      <p className="text-lg font-semibold">{selectedProduct.weight} kg</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Cena</p>
                      <p className="text-lg font-semibold">{selectedProduct.pricePerUnit.toFixed(2)} zł</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="text-lg font-semibold">{selectedProduct.inStock ? "Dostępny" : "Niedostępny"}</p>
                    </div>
                  </div>

                  {selectedProduct.features.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-medium">Cechy produktu</p>
                      <ul className="space-y-1">
                        {selectedProduct.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <SheetFooter className="mt-6">
            {isEditing ? (
              <div className="flex w-full gap-2">
                <Button variant="outline" onClick={closeDrawer} className="flex-1 bg-transparent">
                  Anuluj
                </Button>
                <Button
                  onClick={
                    selectedProduct?.id.startsWith("prod-") && !products.find((p) => p.id === selectedProduct?.id)
                      ? handleSaveNew
                      : handleSave
                  }
                  className="flex-1 bg-primary"
                >
                  Zapisz
                </Button>
              </div>
            ) : (
              <div className="flex w-full gap-2">
                <Button variant="outline" onClick={closeDrawer} className="flex-1 bg-transparent">
                  Zamknij
                </Button>
                <Button onClick={() => setIsEditing(true)} className="flex-1 bg-primary">
                  <Edit className="mr-2 h-4 w-4" />
                  Edytuj
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
