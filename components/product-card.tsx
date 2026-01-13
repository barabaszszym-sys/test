import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { Check } from "lucide-react"

interface ProductCardProps {
  product: Product
}

const categoryLabels = {
  premium: "Premium",
  standard: "Standard",
  bio: "Bio",
  starter: "Starter",
}

const categoryColors = {
  premium: "bg-orange-500 text-white",
  standard: "bg-blue-500 text-white",
  bio: "bg-green-600 text-white",
  starter: "bg-purple-500 text-white",
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold leading-tight">{product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
          </div>
          <Badge className={categoryColors[product.category]}>{categoryLabels[product.category]}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Białko:</span>
            <span className="ml-1 font-medium">{product.protein}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Waga:</span>
            <span className="ml-1 font-medium">{product.weight} kg</span>
          </div>
        </div>

        <div className="space-y-1.5">
          {product.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div>
            <div className="text-2xl font-bold text-primary">{product.pricePerUnit} zł</div>
            <div className="text-xs text-muted-foreground">za opakowanie</div>
          </div>
          {!product.inStock && (
            <Badge variant="outline" className="border-red-500 text-red-500">
              Brak w magazynie
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}
