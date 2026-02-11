"use client"

import React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { login, getSession } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("dist@soymax.pl")
  const [password, setPassword] = useState("password123")
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (getSession()) {
      router.replace("/dashboard")
    }
  }, [router])

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    setError("")
    setIsLoading(true)

    const { session, error: loginError } = login({
      email: email || "dist@soymax.pl",
      password: password || "password123",
      rememberMe,
    })

    if (loginError) {
      setError(loginError)
      setIsLoading(false)
      return
    }

    // Redirect na dashboard
    setTimeout(() => {
      router.replace("/dashboard")
    }, 300)
  }

  // Auto-login na pierwszym otwarciu
  useEffect(() => {
    if (!getSession() && email && password) {
      const timer = setTimeout(() => {
        handleLogin()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-gray-50 p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-green-600">SOYMAX</h1>
        <p className="text-gray-600">Program Lojalnościowy dla Dystrybutorów</p>
      </div>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <CardTitle>Zaloguj się</CardTitle>
          <CardDescription>Wpisz swoje dane logowania</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="przyklad@soymax.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Hasło */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Hasło</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700 underline"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Pamiętaj mnie */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Pamiętaj mnie
              </label>
            </div>

            {/* Błąd */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Przycisk logowania */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </Button>

            {/* Info POC */}
            <div className="rounded-md bg-blue-50 p-3 text-xs text-blue-700 space-y-1">
              <p className="font-semibold">Testowe konta:</p>
              <p>Dystrybutor: dist@soymax.pl / password123</p>
              <p>Admin: admin@soymax.pl / admin123</p>
              <p>Handlowiec: sales@soymax.pl / sales123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
