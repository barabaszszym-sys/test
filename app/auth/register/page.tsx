"use client"

import React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const distributorId = searchParams.get("ref") || ""

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    zipCode: "",
    farmCity: "",
    farmStreet: "",
    farmNumber: "",
    farmZipCode: "",
    farmPostalCode: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Email
    if (!formData.email) {
      newErrors.email = "Email jest wymagany"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Podaj prawidłowy email"
    }

    // Hasło
    if (!formData.password) {
      newErrors.password = "Hasło jest wymagane"
    } else if (formData.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków"
    }

    // Imię
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Imię jest wymagane"
    }

    // Nazwisko
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Nazwisko jest wymagane"
    }

    // Telefon
    if (!formData.phone.trim()) {
      newErrors.phone = "Numer telefonu jest wymagany"
    } else if (!/^[\d\s\+\-\(\)]{9,}$/.test(formData.phone)) {
      newErrors.phone = "Podaj prawidłowy numer telefonu"
    }

    // Miasto
    if (!formData.city.trim()) {
      newErrors.city = "Miasto jest wymagane"
    }

    // Kod pocztowy
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Kod pocztowy jest wymagany"
    } else if (!/^\d{2}-\d{3}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Podaj kod pocztowy w formacie XX-XXX"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Wyczyść błąd dla tego pola
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Mock delay dla symulacji wysyłki
    setTimeout(() => {
      console.log("[v0] Registration form submitted:", {
        ...formData,
        distributorId,
      })
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 p-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-green-600">SOYMAX</h1>
          <p className="text-gray-600">Program Lojalnościowy dla Klientów</p>
        </div>

        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="border-b border-gray-200 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle>Rejestracja potwierdzona!</CardTitle>
            <CardDescription>Sprawdź swoją skrzynkę email</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Wysłaliśmy link aktywacyjny na adres <strong>{formData.email}</strong>. 
                Kliknij w link, aby aktywować swoje konto.
              </AlertDescription>
            </Alert>

            <p className="text-sm text-gray-600">
              Link wygaśnie za 24 godziny. Jeśli nie widzisz emaila, sprawdź folder spam.
            </p>

            <Button
              onClick={() => router.push("/")}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Wróć na stronę logowania
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-green-600">SOYMAX</h1>
        <p className="text-gray-600">Program Lojalnościowy dla Klientów</p>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <CardTitle>Rejestracja klienta</CardTitle>
          <CardDescription>Załóż konto i dołącz do programu lojalnościowego</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="twoj@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Hasło */}
            <div className="space-y-2">
              <Label htmlFor="password">Hasło *</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Imię i Nazwisko */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">Imię *</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Jan"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nazwisko *</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Nowak"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            {/* Telefon */}
            <div className="space-y-2">
              <Label htmlFor="phone">Numer telefonu *</Label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+48 600 123 456"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Miasto i Kod pocztowy */}
            <div className="grid grid-cols-2 gap-3">
              
              
            </div>

            {/* Adres gospodarstwa (opcjonalne) */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-base">Adres gospodarstwa</h3>

              {/* Miejscowość */}
              <div className="space-y-2">
                <Label htmlFor="farmCity">Miejscowość</Label>
                <Input
                  id="farmCity"
                  type="text"
                  name="farmCity"
                  placeholder="np. Piaseczno"
                  value={formData.farmCity}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Ulica i Numer */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="farmStreet">Ulica</Label>
                  <Input
                    id="farmStreet"
                    type="text"
                    name="farmStreet"
                    placeholder="np. ul. Polna"
                    value={formData.farmStreet}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmNumber">Numer</Label>
                  <Input
                    id="farmNumber"
                    type="text"
                    name="farmNumber"
                    placeholder="np. 15"
                    value={formData.farmNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Kod pocztowy i Poczta */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="farmZipCode">Kod pocztowy</Label>
                  <Input
                    id="farmZipCode"
                    type="text"
                    name="farmZipCode"
                    placeholder="00-001"
                    value={formData.farmZipCode}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmPostalCode">Poczta</Label>
                  <Input
                    id="farmPostalCode"
                    type="text"
                    name="farmPostalCode"
                    placeholder="np. Piaseczno"
                    value={formData.farmPostalCode}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Przycisk submit */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Rejestrowanie..." : "Zarejestruj się"}
            </Button>

            {/* Link do logowania */}
            <p className="text-center text-sm text-gray-600">
              Masz już konto?{" "}
              <Link href="/" className="text-green-600 hover:underline font-medium">
                Zaloguj się
              </Link>
            </p>

            {/* Info o dystrybutorze */}
            {distributorId && (
              <div className="rounded-md bg-blue-50 p-2 text-xs text-blue-700">
                Rejestracja z referencji dystrybutora: <strong>{distributorId}</strong>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
