"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Users, UserCheck, Tag, BarChart3, Settings, ArrowLeft, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { href: "/admin/products", label: "Produkty", icon: Package },
  { href: "/admin/distributors", label: "Dystrybutorzy", icon: Users },
  { href: "/admin/clients", label: "Klienci", icon: UserCheck },
  { href: "/admin/promotions", label: "Promocje", icon: Tag },
  { href: "/admin/sales", label: "Sprzedaż", icon: BarChart3 },
  { href: "/admin/roles", label: "Role i uprawnienia", icon: Shield },
  { href: "/admin/settings", label: "Ustawienia", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <h1 className="text-lg font-bold text-primary">SOYMAX Admin</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Wróć do aplikacji</span>
        </Link>
      </div>
    </aside>
  )
}
