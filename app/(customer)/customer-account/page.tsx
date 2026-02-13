"use client"

import { useState, useEffect } from "react"
import { QrCode, Gift, Star, ChevronLeft, ChevronRight, Check, Clock, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { mockEndCustomer, mockRewards, mockRedemptions, mockDistributor } from "@/lib/mock-data"
import { getFromStorage, saveToStorage } from "@/lib/storage"
import type { Reward, Redemption } from "@/lib/types"

export default function CustomerAccountPage() {
  const [customer, setCustomer] = useState(mockEndCustomer)
  const [rewards, setRewards] = useState<Reward[]>([])
  const [redemptions, setRedemptions] = useState<Redemption[]>([])
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSuccessSheet, setShowSuccessSheet] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    const storedCustomer = getFromStorage<typeof mockEndCustomer>("customer_data")
    const storedRewards = getFromStorage<Reward[]>("customer_rewards")
    const storedRedemptions = getFromStorage<Redemption[]>("customer_redemptions")
    
    setCustomer(storedCustomer || mockEndCustomer)
    setRewards(storedRewards || mockRewards)
    setRedemptions(storedRedemptions || mockRedemptions)
  }, [])

  const handleRedeemReward = () => {
    if (!selectedReward || customer.points < selectedReward.pointsCost) return

    const newRedemption: Redemption = {
      id: `redemption-${Date.now()}`,
      clientId: customer.id,
      rewardId: selectedReward.id,
      rewardName: selectedReward.name,
      pointsSpent: selectedReward.pointsCost,
      status: "pending",
      redeemedAt: new Date().toISOString(),
      pickupType: selectedReward.pickupType,
    }

    const updatedRedemptions = [...redemptions, newRedemption]
    const updatedCustomer = {
      ...customer,
      points: customer.points - selectedReward.pointsCost,
    }

    setRedemptions(updatedRedemptions)
    setCustomer(updatedCustomer)
    saveToStorage("customer_redemptions", updatedRedemptions)
    saveToStorage("customer_data", updatedCustomer)

    setShowConfirmDialog(false)
    setShowSuccessSheet(true)
  }

  const getPickupLabel = (type: string) => {
    switch (type) {
      case "distributor": return "Odbiór u dystrybutora"
      case "soymax": return "Odbiór w SOYMAX"
      case "delivery": return "Dostawa kurierem"
      default: return type
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "gadget": return "Gadżet"
      case "voucher": return "Voucher"
      case "product": return "Produkt"
      case "experience": return "Doświadczenie"
      default: return category
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Przetwarzanie</Badge>
      case "ready":
        return <Badge className="gap-1 bg-orange-500"><Package className="h-3 w-3" />Do odbioru</Badge>
      case "collected":
        return <Badge className="gap-1 bg-green-600"><Check className="h-3 w-3" />Odebrano</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const visibleRewards = rewards.filter(r => r.inStock)
  const maxIndex = Math.max(0, visibleRewards.length - 2)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6 text-primary-foreground">
        <h1 className="text-xl font-bold text-center">Moje Konto</h1>
        <p className="text-center text-sm opacity-90">{customer.firstName} {customer.lastName}</p>
      </div>

      {/* QR Code Section */}
      <div className="px-4 -mt-4">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 bg-white border-2 border-gray-200 rounded-xl">
                {/* QR Code placeholder - in production would use a QR library */}
                <div className="w-48 h-48 bg-white flex items-center justify-center relative">
                  <div className="absolute inset-0 grid grid-cols-7 grid-rows-7 gap-1 p-2">
                    {/* Simplified QR pattern */}
                    {Array.from({ length: 49 }).map((_, i) => {
                      const isCorner = (i < 7 && (i % 7 < 3)) || 
                                       (i < 21 && i >= 14 && (i % 7 < 3)) ||
                                       (i >= 42 && (i % 7 < 3)) ||
                                       (i < 7 && (i % 7 > 3)) ||
                                       (i >= 42 && (i % 7 > 3))
                      const isRandom = Math.random() > 0.5
                      return (
                        <div
                          key={i}
                          className={`rounded-sm ${isCorner || isRandom ? 'bg-gray-900' : 'bg-white'}`}
                        />
                      )
                    })}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-1 rounded">
                      <QrCode className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Twój kod klienta</p>
              <p className="font-mono text-lg font-bold tracking-wider">{customer.customerCode}</p>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Pokaż kod dystrybutorowi przy zakupie, aby zbierać punkty
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Points Section */}
      <div className="px-4 mt-4">
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Twoje punkty</p>
                <p className="text-4xl font-bold">{customer.points.toLocaleString()}</p>
                <p className="text-sm opacity-90 mt-1">punktów do wymiany</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                <Star className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Twoj dystrybutor */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-semibold mb-3">Twoj dystrybutor</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-primary">
                  {mockDistributor.companyName.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{mockDistributor.companyName}</p>
                <p className="text-sm text-muted-foreground">{mockDistributor.phone}</p>
                <p className="text-xs text-muted-foreground truncate">{mockDistributor.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Carousel */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-lg font-semibold">Nagrody do wymiany</h2>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
              disabled={carouselIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => setCarouselIndex(Math.min(maxIndex, carouselIndex + 1))}
              disabled={carouselIndex >= maxIndex}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden px-4">
          <div
            className="flex gap-3 transition-transform duration-300"
            style={{ transform: `translateX(-${carouselIndex * 156}px)` }}
          >
            {visibleRewards.map((reward) => {
              const canAfford = customer.points >= reward.pointsCost
              return (
                <Card
                  key={reward.id}
                  className={`flex-shrink-0 w-36 cursor-pointer transition-all hover:shadow-md ${
                    !canAfford ? 'opacity-60' : ''
                  }`}
                  onClick={() => setSelectedReward(reward)}
                >
                  <CardContent className="p-3">
                    <div className="aspect-square w-full rounded-lg bg-muted mb-2 flex items-center justify-center overflow-hidden">
                      <Gift className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-sm line-clamp-2 h-10">{reward.name}</h3>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-orange-500" />
                      <span className={`text-sm font-bold ${canAfford ? 'text-orange-500' : 'text-muted-foreground'}`}>
                        {reward.pointsCost}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* My Redemptions */}
      {redemptions.length > 0 && (
        <div className="mt-6 px-4">
          <h2 className="text-lg font-semibold mb-3">Moje wymienione nagrody</h2>
          <div className="space-y-3">
            {redemptions
              .sort((a, b) => new Date(b.redeemedAt).getTime() - new Date(a.redeemedAt).getTime())
              .map((redemption) => (
                <Card key={redemption.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                          <Gift className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{redemption.rewardName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(redemption.redeemedAt).toLocaleDateString("pl-PL")}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(redemption.status)}
                    </div>
                    {redemption.status === "ready" && (
                      <p className="text-sm text-orange-600 mt-2">
                        {getPickupLabel(redemption.pickupType)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Reward Detail Sheet */}
      <Sheet open={!!selectedReward && !showConfirmDialog && !showSuccessSheet} onOpenChange={() => setSelectedReward(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {selectedReward && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedReward.name}</SheetTitle>
                <SheetDescription>
                  {getCategoryLabel(selectedReward.category)}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
                  <Gift className="h-16 w-16 text-muted-foreground" />
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">{selectedReward.description}</p>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-orange-500" />
                      <span className="text-lg font-bold text-orange-600">
                        {selectedReward.pointsCost} pkt
                      </span>
                    </div>
                    <Badge variant="secondary">{getPickupLabel(selectedReward.pickupType)}</Badge>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground mb-1">Twoje punkty po wymianie:</p>
                    <p className="text-2xl font-bold">
                      {customer.points >= selectedReward.pointsCost 
                        ? (customer.points - selectedReward.pointsCost).toLocaleString()
                        : "Brak wystarczających punktów"
                      }
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={customer.points < selectedReward.pointsCost}
                  onClick={() => setShowConfirmDialog(true)}
                >
                  {customer.points >= selectedReward.pointsCost 
                    ? "Wymień nagrodę"
                    : `Brakuje ${selectedReward.pointsCost - customer.points} pkt`
                  }
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirm Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potwierdzenie wymiany</AlertDialogTitle>
            <AlertDialogDescription>
              Czy na pewno chcesz wymienić <strong>{selectedReward?.pointsCost} punktów</strong> na{" "}
              <strong>{selectedReward?.name}</strong>?
              <br /><br />
              Po wymianie zostanie Ci{" "}
              <strong>
                {selectedReward && (customer.points - selectedReward.pointsCost).toLocaleString()} punktów
              </strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleRedeemReward}>Wymień</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Sheet */}
      <Sheet open={showSuccessSheet} onOpenChange={(open) => {
        setShowSuccessSheet(open)
        if (!open) setSelectedReward(null)
      }}>
        <SheetContent className="w-full sm:max-w-md">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Gratulacje!</h2>
            <p className="text-muted-foreground mb-6">
              Nagroda <strong>{selectedReward?.name}</strong> została pomyślnie wymieniona.
            </p>
            <div className="p-4 rounded-lg bg-muted w-full mb-6">
              <p className="text-sm text-muted-foreground mb-1">Sposób odbioru:</p>
              <p className="font-medium">{selectedReward && getPickupLabel(selectedReward.pickupType)}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {selectedReward?.pickupType === "distributor" 
                ? "Nagrodę możesz odebrać u swojego dystrybutora. Pokaż kod z aplikacji."
                : selectedReward?.pickupType === "soymax"
                ? "Skontaktujemy się z Tobą w sprawie odbioru nagrody."
                : "Nagroda zostanie wysłana na Twój adres."
              }
            </p>
            <Button className="w-full" onClick={() => {
              setShowSuccessSheet(false)
              setSelectedReward(null)
            }}>
              Zamknij
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
