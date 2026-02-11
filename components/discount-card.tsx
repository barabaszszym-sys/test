"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ChevronRight, Star, Percent, Gift } from "lucide-react"
import { DISCOUNT_THRESHOLDS, type Promotion } from "@/lib/types"
import { getPromotions } from "@/lib/storage"

interface DiscountCardProps {
  currentClients: number
  programDiscount: number
}

export function DiscountCard({ currentClients, programDiscount }: DiscountCardProps) {
  const router = useRouter()
  const [activePromotions, setActivePromotions] = useState<Promotion[]>([])
  const [participatingPromos, setParticipatingPromos] = useState<string[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    const promotions = getPromotions()
    // Filter active promotions with multipliers or discount bonuses
    const active = promotions.filter((p) => (p.multiplier || p.discountBonus) && new Date(p.endDate) >= new Date())
    setActivePromotions(active)

    // Get participating promos
    const participating = JSON.parse(localStorage.getItem("soymax_participating_promos") || "[]")
    setParticipatingPromos(participating)
  }, [sheetOpen])

  // Find current and next threshold
  let currentThreshold = DISCOUNT_THRESHOLDS[0]
  let nextThreshold = DISCOUNT_THRESHOLDS[1]

  for (let i = DISCOUNT_THRESHOLDS.length - 1; i >= 0; i--) {
    if (currentClients >= DISCOUNT_THRESHOLDS[i].minClients) {
      currentThreshold = DISCOUNT_THRESHOLDS[i]
      nextThreshold = DISCOUNT_THRESHOLDS[i + 1] || null
      break
    }
  }

  const progress = nextThreshold
    ? ((currentClients - currentThreshold.minClients) / (nextThreshold.minClients - currentThreshold.minClients)) * 100
    : 100

  const clientsToNext = nextThreshold ? nextThreshold.minClients - currentClients : 0

  // Calculate total bonus from participating promotions
  const totalMultiplier = activePromotions
    .filter((p) => p.multiplier && participatingPromos.includes(p.id))
    .reduce((max, p) => Math.max(max, p.multiplier || 1), 1)

  const totalDiscountBonus = activePromotions
    .filter((p) => p.discountBonus && participatingPromos.includes(p.id))
    .reduce((sum, p) => sum + (p.discountBonus || 0), 0)

  const hasActiveBonuses = totalMultiplier > 1 || totalDiscountBonus > 0

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Card className="border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] relative">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Twój rabat</h2>
              <ChevronRight className="h-5 w-5 opacity-70" />
            </div>

            <div className="mb-4 flex items-baseline justify-center gap-1">
              <span className="text-6xl font-bold">{programDiscount}</span>
              <span className="text-3xl font-semibold">%</span>
            </div>

            {hasActiveBonuses && (
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                {totalMultiplier > 1 && (
                  <Badge className="bg-amber-500 text-white border-0">
                    <Star className="mr-1 h-3 w-3" />x{totalMultiplier} punkty
                  </Badge>
                )}
                {totalDiscountBonus > 0 && (
                  <Badge className="bg-white/20 text-white border-0">
                    <Percent className="mr-1 h-3 w-3" />+{totalDiscountBonus}% bonus
                  </Badge>
                )}
              </div>
            )}

            {nextThreshold ? (
              <>
                <Progress
                  value={progress}
                  className="w-full h-2 bg-orange-200 [&>[data-slot=progress-indicator]]:bg-orange-500 mb-2"
                />
                <p className="text-sm text-center opacity-90">
                  kolejny rabat: {nextThreshold.discount}% ({clientsToNext} klientów)
                </p>
              </>
            ) : (
              <div className="text-sm font-medium text-center">Gratulacje! Osiągnąłeś maksymalny poziom rabatu!</div>
            )}
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <SheetHeader className="text-left">
          <SheetTitle>Twój rabat i bonusy</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 overflow-y-auto pb-8">
          {/* Base discount summary */}
          <div className="rounded-xl bg-muted/50 p-4">
            <h3 className="mb-3 font-semibold">Podsumowanie rabatu</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rabat z programu lojalnościowego</span>
                <span className="font-semibold">+{programDiscount}%</span>
              </div>
              {totalDiscountBonus > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Bonus z promocji</span>
                  <span className="font-semibold">+{totalDiscountBonus}%</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Łączny dodatkowy rabat</span>
                <span className="text-primary">+{programDiscount + totalDiscountBonus}%</span>
              </div>
            </div>
          </div>

          {/* Points multiplier */}
          {totalMultiplier > 1 && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-amber-700">Mnożnik punktów aktywny!</h3>
              </div>
              <p className="text-sm text-amber-600">
                Aktualnie zbierasz <strong>x{totalMultiplier}</strong> punktów za każdy zakup produktów objętych
                promocją.
              </p>
            </div>
          )}

          {/* Active promotions */}
          <div>
            <h3 className="mb-3 font-semibold">Aktywne promocje z bonusami</h3>
            {activePromotions.length === 0 ? (
              <p className="text-sm text-muted-foreground">Brak aktywnych promocji z bonusami</p>
            ) : (
              <div className="space-y-3">
                {activePromotions.map((promo) => {
                  const isParticipating = participatingPromos.includes(promo.id)
                  return (
                    <Card
                      key={promo.id}
                      className={`cursor-pointer transition-all ${isParticipating ? "border-primary bg-primary/5" : ""}`}
                      onClick={() => {
                        setSheetOpen(false)
                        router.push(`/promotions/${promo.id}`)
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {promo.type === "points" && (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                <Star className="h-5 w-5 text-amber-600" />
                              </div>
                            )}
                            {promo.type === "product" && (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <Gift className="h-5 w-5 text-blue-600" />
                              </div>
                            )}
                            {promo.type === "info" && (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <Percent className="h-5 w-5 text-green-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium truncate">{promo.title}</h4>
                              {isParticipating && (
                                <Badge variant="secondary" className="text-xs">
                                  Aktywna
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">{promo.description}</p>
                            <div className="mt-2 flex gap-2">
                              {promo.multiplier && (
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                                  x{promo.multiplier} punkty
                                </Badge>
                              )}
                              {promo.discountBonus && (
                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                  +{promo.discountBonus}% rabatu
                                </Badge>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Progress to next level */}
          <div>
            <h3 className="mb-3 font-semibold">Poziomy rabatu</h3>
            <div className="space-y-3">
              {DISCOUNT_THRESHOLDS.map((threshold, index) => {
                const isActive = currentClients >= threshold.minClients
                const isCurrent = currentThreshold === threshold
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-lg p-3 ${
                      isCurrent ? "bg-primary/10 border border-primary/20" : isActive ? "bg-muted/50" : "opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                          isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">+{threshold.discount}% rabatu</p>
                        <p className="text-xs text-muted-foreground">
                          {threshold.minClients === 0 ? "Start" : `Od ${threshold.minClients} klientów`}
                        </p>
                      </div>
                    </div>
                    {isCurrent && <Badge>Aktualny</Badge>}
                    {isActive && !isCurrent && <span className="text-xs text-muted-foreground">Osiągnięty</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
