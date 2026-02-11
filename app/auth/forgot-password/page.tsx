"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateResetToken } from "@/lib/auth"
import { ChevronLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const { resetToken, error: tokenError } = generateResetToken(email)

    if (tokenError) {
      setError(tokenError)
      setIsLoading(false)
      return
    }

    // W produkcji tutaj byłby wysłany email
    // Na potrzeby POC wyświetlamy link
    console.log(`Reset link: /auth/reset?token=${resetToken}`)
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 p-4">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="border-b border-gray-200 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Email wysłany</CardTitle>
            <CardDescription>Sprawdzić swoją skrzynkę odbiorczą</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm text-gray-600">
              Wysłaliśmy link do resetowania hasła na adres <strong>{email}</strong>. Link jest ważny przez 1 godzinę.
            </p>
            <div className="rounded-md bg-blue-50 p-3 text-xs text-blue-700">
              <p className="font-semibold mb-1">POC - Link resetowania:</p>
              <a
                href={`/auth/reset?token=${generateResetToken(email).resetToken}`}
                className="text-blue-600 hover:underline break-all"
              >
                /auth/reset?token=...
              </a>
            </div>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => router.push("/")}
            >
              Wróć do logowania
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 p-4">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Wróć
      </Link>

      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-green-600">Resetuj hasło</h1>
        <p className="text-gray-600">Wpisz swój email, aby otrzymać link do resetowania hasła</p>
      </div>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <CardTitle>Zapomniałeś hasła?</CardTitle>
          <CardDescription>Nie martw się, jest łatwe do resetowania</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="przyklad@soymax.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading || !email}
            >
              {isLoading ? "Wysyłanie..." : "Wyślij link resetowania"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
