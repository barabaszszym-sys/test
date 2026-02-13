"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PointsHistory } from "@/components/points-history"
import { RewardsCatalog } from "@/components/rewards-catalog"
import { RedemptionHistory } from "@/components/redemption-history"
import { getDistributor, isLoggedIn } from "@/lib/storage"
import { mockPointsHistory, mockRedemptions, mockRewards } from "@/lib/mock-data"
import type { Distributor } from "@/lib/types"

export default function PointsPage() {
  const router = useRouter()
  const [distributor, setDistributor] = useState<Distributor | null>(null)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/")
      return
    }
    setDistributor(getDistributor())
  }, [])

  if (!distributor) return null

  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Saldo punktow */}
      <div className="rounded-xl bg-green-600 p-6 text-white text-center">
        <p className="text-sm opacity-80">Twoje saldo punktow</p>
        <p className="text-5xl font-bold mt-1">{distributor.points}</p>
        <p className="text-sm opacity-80 mt-1">punktow</p>
      </div>

      {/* Katalog nagrod */}
      <RewardsCatalog rewards={mockRewards} userPoints={distributor.points} />

      {/* Moje wymiany */}
      <RedemptionHistory redemptions={mockRedemptions} />

      {/* Historia punktow */}
      <PointsHistory entries={mockPointsHistory} />
    </div>
  )
}
