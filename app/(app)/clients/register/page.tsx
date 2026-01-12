"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, MessageSquare, QrCode, UserPlus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDistributor } from "@/lib/storage"

export default function ClientRegisterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("form")

  // Form state
  const [clientName, setClientName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [sendMethod, setSendMethod] = useState<"sms" | "email">("sms")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const distributor = getDistributor()

  // Generate QR code URL (mock for POC)
  const registrationUrl = `https://soymax.app/register/${distributor.distributorCode}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending invitation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setClientName("")
    setPhone("")
    setEmail("")
    setSendMethod("sms")
    setIsSubmitted(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Dodaj klienta</h1>
            <p className="text-sm text-muted-foreground">Wyślij zaproszenie lub udostępnij kod QR</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Formularz
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Kod QR
            </TabsTrigger>
          </TabsList>

          {/* Form Tab */}
          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Wyślij zaproszenie</CardTitle>
                <CardDescription>Wprowadź dane klienta i wyślij link aktywacyjny</CardDescription>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Nazwa klienta</Label>
                      <Input
                        id="clientName"
                        placeholder="Jan Kowalski"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Numer telefonu</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+48 123 456 789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Adres e-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jan.kowalski@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Metoda wysyłki linku aktywacyjnego</Label>
                      <RadioGroup
                        value={sendMethod}
                        onValueChange={(value) => setSendMethod(value as "sms" | "email")}
                        className="grid grid-cols-2 gap-3"
                      >
                        <Label
                          htmlFor="sms"
                          className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                            sendMethod === "sms"
                              ? "border-green-600 bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <RadioGroupItem value="sms" id="sms" className="sr-only" />
                          <MessageSquare
                            className={`h-6 w-6 ${sendMethod === "sms" ? "text-green-600" : "text-gray-400"}`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              sendMethod === "sms" ? "text-green-600" : "text-gray-600"
                            }`}
                          >
                            SMS
                          </span>
                        </Label>

                        <Label
                          htmlFor="email-method"
                          className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                            sendMethod === "email"
                              ? "border-green-600 bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <RadioGroupItem value="email" id="email-method" className="sr-only" />
                          <Mail className={`h-6 w-6 ${sendMethod === "email" ? "text-green-600" : "text-gray-400"}`} />
                          <span
                            className={`text-sm font-medium ${
                              sendMethod === "email" ? "text-green-600" : "text-gray-600"
                            }`}
                          >
                            E-mail
                          </span>
                        </Label>
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                      {isLoading ? (
                        "Wysyłanie..."
                      ) : (
                        <>
                          {sendMethod === "sms" ? (
                            <MessageSquare className="h-4 w-4 mr-2" />
                          ) : (
                            <Mail className="h-4 w-4 mr-2" />
                          )}
                          Wyślij link aktywacyjny
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  // Success state
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">Zaproszenie wysłane!</h3>
                      <p className="text-muted-foreground">
                        Wysłaliśmy link aktywacyjny na podany {sendMethod === "sms" ? "numer telefonu" : "adres e-mail"}
                        :
                      </p>
                      <p className="font-medium text-gray-900">{sendMethod === "sms" ? phone : email}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Klient otrzyma wiadomość z linkiem do rejestracji w programie lojalnościowym SOYMAX.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => router.push("/clients")}
                      >
                        Lista klientów
                      </Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleReset}>
                        Dodaj kolejnego
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Code Tab */}
          <TabsContent value="qr">
            <Card>
              <CardHeader>
                <CardTitle>Kod QR do rejestracji</CardTitle>
                <CardDescription>Pokaż ten kod klientowi, aby mógł się samodzielnie zarejestrować</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                {/* QR Code placeholder */}
                <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center p-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(registrationUrl)}`}
                    alt="Kod QR do rejestracji"
                    className="w-full h-full"
                  />
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Twój unikalny link rejestracyjny:</p>
                  <code className="block p-2 bg-gray-100 rounded text-xs break-all">{registrationUrl}</code>
                </div>

                <div className="w-full p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Jak to działa?</h4>
                  <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                    <li>Klient skanuje kod QR swoim telefonem</li>
                    <li>Otwiera się formularz rejestracji</li>
                    <li>Klient wypełnia swoje dane</li>
                    <li>Po weryfikacji klient zostaje przypisany do Ciebie</li>
                  </ol>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    navigator.clipboard.writeText(registrationUrl)
                  }}
                >
                  Kopiuj link
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
