"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building2, User, Mail, Phone, MapPin, Calendar, Hash, Edit, LogOut, Lock, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { getDistributor, isLoggedIn, logout } from "@/lib/storage"
import type { Distributor } from "@/lib/types"

export default function ProfilePage() {
  const router = useRouter()
  const [distributor, setDistributor] = useState<Distributor | null>(null)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(true)
  const [notifSms, setNotifSms] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/")
      return
    }
    setDistributor(getDistributor())
  }, [])

  const handleLogout = () => {
    logout()
    router.replace("/")
  }

  if (!distributor) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-primary px-4 pt-2 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-white">Profil</h1>
        </div>
        
        {/* User avatar and name */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {distributor.ownerFirstName} {distributor.ownerLastName}
            </h2>
            <p className="text-white/80 text-sm">{distributor.companyName}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Dane osobowe */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Dane osobowe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Imie</span>
              <span className="text-sm font-medium">{distributor.ownerFirstName}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Nazwisko</span>
              <span className="text-sm font-medium">{distributor.ownerLastName}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium">{distributor.email}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Telefon</span>
              <span className="text-sm font-medium">{distributor.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Dane firmy */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Dane firmy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Nazwa firmy</span>
              <span className="text-sm font-medium text-right max-w-[180px]">{distributor.companyName}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">NIP</span>
              <span className="text-sm font-medium font-mono">{distributor.nip}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">Adres</span>
              <span className="text-sm font-medium text-right max-w-[180px]">{distributor.address}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Kod dystrybutora</span>
              <span className="text-sm font-medium font-mono">{distributor.distributorCode}</span>
            </div>
          </CardContent>
        </Card>

        {/* Informacje o koncie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Informacje o koncie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Data rejestracji</span>
              <span className="text-sm font-medium">
                {new Date(distributor.createdAt).toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Rabat podstawowy</span>
              <span className="text-sm font-medium">{distributor.baseDiscount}%</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Rabat z programu</span>
              <span className="text-sm font-medium text-primary">{distributor.programDiscount}%</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Zarejestrowani klienci</span>
              <span className="text-sm font-medium">{distributor.registeredClientsCount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Opiekun klienta */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Twoj opiekun</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {distributor.consultant.firstName} {distributor.consultant.lastName}
                </p>
                <p className="text-xs text-muted-foreground">{distributor.consultant.email}</p>
              </div>
              <a href={`tel:${distributor.consultant.phone}`}>
                <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent">
                  <Phone className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Zmiana hasla */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Zmiana hasla
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-xs">Aktualne haslo</Label>
              <Input id="current-password" type="password" placeholder="Aktualne haslo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-xs">Nowe haslo</Label>
              <Input id="new-password" type="password" placeholder="Nowe haslo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-xs">Powtorz nowe haslo</Label>
              <Input id="confirm-password" type="password" placeholder="Powtorz nowe haslo" />
            </div>
            {passwordSaved && (
              <p className="text-sm text-green-600 font-medium">Haslo zostalo zmienione.</p>
            )}
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => {
                setPasswordSaved(true)
                setTimeout(() => setPasswordSaved(false), 3000)
              }}
            >
              Zmien haslo
            </Button>
          </CardContent>
        </Card>

        {/* Powiadomienia */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              Powiadomienia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-muted-foreground">Powiadomienia na adres email</p>
              </div>
              <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Push</p>
                <p className="text-xs text-muted-foreground">Powiadomienia push w przegladarce</p>
              </div>
              <Switch checked={notifPush} onCheckedChange={setNotifPush} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">SMS</p>
                <p className="text-xs text-muted-foreground">Powiadomienia SMS na telefon</p>
              </div>
              <Switch checked={notifSms} onCheckedChange={setNotifSms} />
            </div>
          </CardContent>
        </Card>

        {/* Wylogowanie */}
        <Button
          variant="outline"
          className="w-full bg-transparent text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Wyloguj sie
        </Button>
      </div>
    </div>
  )
}
