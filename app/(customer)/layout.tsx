"use client"

import type React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { MobileFrame } from "@/components/mobile-frame"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { href: "/auth/register", label: "Rejestracja klienta" },
  { href: "/dashboard", label: "Aplikacja dystrybutora" },
  { href: "/admin", label: "Panel Admin" },
]

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileFrame>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      <nav className="sticky bottom-0 z-50 border-t border-border bg-background rounded-b-[2.25rem] w-[320px] shrink-0">
        <div className="flex h-14 items-center justify-end px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                <Menu className="h-5 w-5" />
                <span>Więcej</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </MobileFrame>
  )
}
