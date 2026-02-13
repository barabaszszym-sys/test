"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, User, Lock, Bell, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { mockEndCustomer } from "@/lib/mock-data"

export default function CustomerProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(false)
  const [notifSms, setNotifSms] = useState(false)

  const [formData, setFormData] = useState({
    firstName: mockEndCustomer.firstName,
    lastName: mockEndCustomer.lastName,
    phone: mockEndCustomer.phone,
    email: mockEndCustomer.email,
    city: "Warszawa",
    zipCode: "00-001",
    farmCity: "",
    farmStreet: "",
    farmNumber: "",
    farmZipCode: "",
    farmPostOffice: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
          <h1 className="text-lg font-semibold text-white">Moj profil</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{formData.firstName} {formData.lastName}</h2>
            <p className="text-white/80 text-sm">{formData.email}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Dane osobowe */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Dane osobowe
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Zapisz" : "Edytuj"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Imie</Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Nazwisko</Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-9"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Telefon</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-9"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Adres zamieszkania */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Adres zamieszkania</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Miasto</Label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Kod pocztowy</Label>
                <Input
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Adres gospodarstwa */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Adres gospodarstwa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Miejscowosc</Label>
              <Input
                name="farmCity"
                value={formData.farmCity}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="np. Piaseczno"
                className="h-9"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Ulica</Label>
                <Input
                  name="farmStreet"
                  value={formData.farmStreet}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="np. Polna"
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Numer</Label>
                <Input
                  name="farmNumber"
                  value={formData.farmNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="np. 15"
                  className="h-9"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Kod pocztowy</Label>
                <Input
                  name="farmZipCode"
                  value={formData.farmZipCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="00-001"
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Poczta</Label>
                <Input
                  name="farmPostOffice"
                  value={formData.farmPostOffice}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="np. Piaseczno"
                  className="h-9"
                />
              </div>
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
              <Label htmlFor="cp-current" className="text-xs">Aktualne haslo</Label>
              <Input id="cp-current" type="password" placeholder="Aktualne haslo" className="h-9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cp-new" className="text-xs">Nowe haslo</Label>
              <Input id="cp-new" type="password" placeholder="Nowe haslo" className="h-9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cp-confirm" className="text-xs">Powtorz nowe haslo</Label>
              <Input id="cp-confirm" type="password" placeholder="Powtorz nowe haslo" className="h-9" />
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

        {/* Newsletter */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Newsletter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Subskrypcja newsletter</p>
                <p className="text-xs text-muted-foreground">Informacje o promocjach i nowosciach</p>
              </div>
              <Switch checked={newsletter} onCheckedChange={setNewsletter} />
            </div>
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
                <p className="text-xs text-muted-foreground">Powiadomienia na email</p>
              </div>
              <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Push</p>
                <p className="text-xs text-muted-foreground">Powiadomienia push</p>
              </div>
              <Switch checked={notifPush} onCheckedChange={setNotifPush} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">SMS</p>
                <p className="text-xs text-muted-foreground">Powiadomienia SMS</p>
              </div>
              <Switch checked={notifSms} onCheckedChange={setNotifSms} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
