"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DiscountCard } from "@/components/discount-card"
import { StatsSummary } from "@/components/stats-summary"
import { QuickActions } from "@/components/quick-actions"
import { PromotionCarousel } from "@/components/promotion-carousel"
import { ConsultantCard } from "@/components/consultant-card"
import { DashboardNotification } from "@/components/dashboard-notification"
import { DiscountsCarousel } from "@/components/discounts-carousel"
import { getDistributor, getClients, getPromotions, isLoggedIn } from "@/lib/storage"
import { mockDiscounts } from "@/lib/mock-data"
import type { Distributor, Client, Promotion } from "@/lib/types"

export default function DashboardPage() {
  const router = useRouter()
  const [distributor, setDistributor] = useState<Distributor | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/")
      return
    }
    setDistributor(getDistributor())
    setClients(getClients())
    setPromotions(getPromotions())
  }, [])

  if (!distributor) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Ładowanie...</div>
      </div>
    )
  }

  const activeClients = clients.filter((c) => c.status === "active").length
  const inactiveClients = clients.filter((c) => c.status === "inactive").length

  // Calculate new clients this month
  const now = new Date()
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  const newThisMonth = clients.filter((c) => c.registrationDate.startsWith(thisMonth)).length

  return (
    <div className="space-y-6 p-4 pb-20">
      <DashboardNotification />

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cześć</h1>
          <p className="text-sm text-muted-foreground">{distributor.companyName}</p>
        </div>
      </header>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Obecnie masz: {distributor.points || 0} punktów</h2>
      </div>

      <DiscountCard currentClients={clients.length} programDiscount={distributor.programDiscount} />

      <StatsSummary
        total={clients.length}
        active={activeClients}
        inactive={inactiveClients}
        newThisMonth={newThisMonth}
      />

      <QuickActions />

      <DiscountsCarousel discounts={mockDiscounts} />

      <PromotionCarousel promotions={promotions} />

      <ConsultantCard consultant={distributor.consultant} />
    </div>
  )
}
