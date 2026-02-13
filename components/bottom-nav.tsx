"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Home, Users, FileText, Menu, Package, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/auth"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/clients", label: "Klienci", icon: Users },
  { href: "/products", label: "Produkty", icon: Package },
  { href: "/invoices", label: "Faktury", icon: FileText },
]

const moreItems = [
  { href: "/points", label: "Punkty i nagrody" },
  { href: "/profile", label: "Profil" },
  { href: "/admin", label: "Panel Admin" },
  { href: "/customer-account", label: "Konto klienta" },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="sticky bottom-0 z-50 border-t border-border bg-background rounded-b-[2.25rem] w-[320px] shrink-0">
      <div className="flex h-16 items-center justify-between px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] transition-colors min-w-0",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] transition-colors min-w-0",
                moreItems.some((i) => pathname.startsWith(i.href))
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Menu className="h-5 w-5" />
              <span className="truncate">Więcej</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mb-2 w-40">
            {moreItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Wyloguj</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
