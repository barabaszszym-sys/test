"use client"

import { useState } from "react"
import Image from "next/image"
import type { Reward } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Gift, Check } from "lucide-react"

interface RewardsCatalogProps {
  rewards: Reward[]
  userPoints: number
}

export function RewardsCatalog({ rewards, userPoints }: RewardsCatalogProps) {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleRedeem = () => {
    setShowConfirm(false)
    setShowSuccess(true)
  }

  const handleClose = () => {
    setSelectedReward(null)
    setShowConfirm(false)
    setShowSuccess(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Katalog nagrod</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex gap-3 overflow-x-auto px-4 pb-4">
            {rewards.map((reward) => {
              const canAfford = userPoints >= reward.pointsCost
              return (
                <button
                  key={reward.id}
                  type="button"
                  onClick={() => {
                    setSelectedReward(reward)
                    setShowConfirm(true)
                    setShowSuccess(false)
                  }}
                  className="flex flex-col w-36 shrink-0 rounded-lg border bg-card text-left overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-24 w-full bg-muted">
                    <Image
                      src={reward.imageUrl}
                      alt={reward.name}
                      fill
                      className="object-cover"
                    />
                    {!reward.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Niedostepna</span>
                      </div>
                    )}
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <p className="text-xs font-semibold leading-tight line-clamp-2">{reward.name}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${canAfford ? "text-primary" : "text-muted-foreground"}`}>
                        {reward.pointsCost} pkt
                      </span>
                      <Badge variant={reward.inStock ? "default" : "secondary"} className="text-[9px] px-1 py-0">
                        {reward.category}
                      </Badge>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sheet potwierdzenia / sukcesu */}
      <Sheet open={!!selectedReward} onOpenChange={(open) => { if (!open) handleClose() }}>
        <SheetContent side="bottom" className="rounded-t-xl">
          {showSuccess ? (
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <SheetHeader className="text-center">
                <SheetTitle>Wymiana zrealizowana</SheetTitle>
                <SheetDescription>
                  Nagroda "{selectedReward?.name}" zostala zamowiona. Sprawdz status w sekcji "Moje wymiany".
                </SheetDescription>
              </SheetHeader>
              <Button onClick={handleClose} className="w-full bg-green-600 hover:bg-green-700">Zamknij</Button>
            </div>
          ) : selectedReward ? (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  {selectedReward.name}
                </SheetTitle>
                <SheetDescription>{selectedReward.description}</SheetDescription>
              </SheetHeader>
              <div className="space-y-3 py-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Koszt</span>
                  <span className="font-bold">{selectedReward.pointsCost} pkt</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Twoje punkty</span>
                  <span className="font-bold">{userPoints} pkt</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Po wymianie</span>
                  <span className={`font-bold ${userPoints - selectedReward.pointsCost >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {userPoints - selectedReward.pointsCost} pkt
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Odbiór</span>
                  <span className="font-medium">
                    {selectedReward.pickupType === "distributor" ? "U dystrybutora" : selectedReward.pickupType === "soymax" ? "W siedzibie SOYMAX" : "Dostawa kurierem"}
                  </span>
                </div>
              </div>
              <SheetFooter className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">Anuluj</Button>
                <Button
                  onClick={handleRedeem}
                  disabled={userPoints < selectedReward.pointsCost || !selectedReward.inStock}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Wymien
                </Button>
              </SheetFooter>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  )
}
