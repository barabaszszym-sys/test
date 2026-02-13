"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Users, UserCheck, Tag, BarChart3, Settings, ArrowLeft, Shield, Trophy, Gift, ArrowRightLeft, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type AdminRole = "admin" | "salesperson"

const allMenuItems = [
  { href: "/admin/products", label: "Produkty", icon: Package, roles: ["admin", "salesperson"] as AdminRole[] },
  { href: "/admin/distributors", label: "Dystrybutorzy", icon: Users, roles: ["admin", "salesperson"] as AdminRole[] },
  { href: "/admin/clients", label: "Klienci", icon: UserCheck, roles: ["admin", "salesperson"] as AdminRole[] },
  { href: "/admin/promotions", label: "Promocje", icon: Tag, roles: ["admin"] as AdminRole[] },
  { href: "/admin/loyalty-programs", label: "Programy lojalnosciowe", icon: Trophy, roles: ["admin"] as AdminRole[] },
  { href: "/admin/rewards", label: "Nagrody", icon: Gift, roles: ["admin"] as AdminRole[] },
  { href: "/admin/redemptions", label: "Wymiany", icon: ArrowRightLeft, roles: ["admin"] as AdminRole[] },
  { href: "/admin/salespersons", label: "Handlowcy", icon: Briefcase, roles: ["admin"] as AdminRole[] },
  { href: "/admin/sales", label: "Raporty", icon: BarChart3, roles: ["admin", "salesperson"] as AdminRole[] },
  { href: "/admin/roles", label: "Role i uprawnienia", icon: Shield, roles: ["admin"] as AdminRole[] },
  { href: "/admin/settings", label: "Ustawienia", icon: Settings, roles: ["admin"] as AdminRole[] },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [currentRole, setCurrentRole] = useState<AdminRole>("admin")

  const menuItems = allMenuItems.filter((item) => item.roles.includes(currentRole))

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex flex-col gap-2 border-b border-border px-4 py-3">
        <h1 className="text-lg font-bold text-primary">SOYMAX Admin</h1>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentRole("admin")}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium transition-colors",
              currentRole === "admin"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            Admin
          </button>
          <button
            onClick={() => setCurrentRole("salesperson")}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium transition-colors",
              currentRole === "salesperson"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            Handlowiec
          </button>
        </div>
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
