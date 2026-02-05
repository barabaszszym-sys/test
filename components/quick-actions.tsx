import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserPlus, Users, ShoppingCart } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid gap-3">
      <Button size="lg" className="h-14 text-base" asChild>
        <Link href="/clients/register">
          <UserPlus className="mr-2 h-5 w-5" />
          Zarejestruj nowego klienta
        </Link>
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="lg" className="h-12 bg-transparent" asChild>
          <Link href="/clients">
            <Users className="mr-2 h-4 w-4" />
            Lista klientów
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="h-12 bg-transparent" asChild>
          <Link href="/orders">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Zamówienia
          </Link>
        </Button>
      </div>
    </div>
  )
}
