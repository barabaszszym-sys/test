"use client"

import React from "react"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { verifyResetToken, resetPassword } from "@/lib/auth"
import { ChevronLeft, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [tokenError, setTokenError] = useState("")

  useEffect(() => {
    if (!token) {
      setTokenError("Brak tokenu resetowania")
      return
    }

    const { email: tokenEmail, error } = verifyResetToken(token)
    if (error) {
      setTokenError(error)
    } else {
      setEmail(tokenEmail)
    }
  }, [token])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Hasła nie zgadzają się")
      return
    }

    if (newPassword.length < 8) {
      setError("Hasło musi mieć co najmniej 8 znaków")
      return
    }

    if (!token) return

    setIsLoading(true)
    const { success, error: resetError } = resetPassword(token, newPassword)

    if (!success) {
      setError(resetError)
      setIsLoading(false)
      return
    }

    setIsSuccess(true)
    setIsLoading(false)

    // Redirect na login po 2 sekundach
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  if (tokenError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 p-4">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="border-b border-gray-200 text-center">
            <CardTitle className="text-red-600">Link wygasł</CardTitle>
            <CardDescription>Token do resetowania hasła jest nieprawidłowy lub wygasł</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4 text-sm text-gray-600">
              Spróbuj ponownie zażądać linku do resetowania hasła.
            </p>
            <Button className="w-full" onClick={() => router.push("/auth/forgot-password")}>
              Żądaj nowego linku
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (isSuccess) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 p-4">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="border-b border-gray-200 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Hasło zmienione</CardTitle>
            <CardDescription>Twoje hasło zostało pomyślnie zresetowane</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4 text-sm text-gray-600">
              Za chwilę zostaniesz przekierowany na stronę logowania.
            </p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => router.push("/")}
            >
              Przejdź do logowania
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
        <h1 className="mb-2 text-3xl font-bold text-green-600">Ustaw nowe hasło</h1>
        <p className="text-gray-600">
          Resetujesz hasło dla: <strong>{email}</strong>
        </p>
      </div>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <CardTitle>Nowe hasło</CardTitle>
          <CardDescription>Wybierz silne hasło do ochrony swojego konta</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nowe hasło */}
            <div className="space-y-2">
              <Label htmlFor="password">Nowe hasło</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <p className="text-xs text-gray-500">Minimum 8 znaków</p>
            </div>

            {/* Potwierdź hasło */}
            <div className="space-y-2">
              <Label htmlFor="confirm">Potwierdź hasło</Label>
              <Input
                id="confirm"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* Błąd */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Przycisk */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading || !newPassword || !confirmPassword}
            >
              {isLoading ? "Resetowanie..." : "Resetuj hasło"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
