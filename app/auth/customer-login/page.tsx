"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export default function CustomerLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push("/customer-account")
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <span className="text-2xl font-bold text-foreground">SOYMAX</span>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Logowanie klienta</CardTitle>
          <CardDescription>Zaloguj sie do swojego konta klienta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="twoj@email.pl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Haslo</Label>
              <Input id="password" type="password" placeholder="Twoje haslo" />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Logowanie..." : "Zaloguj sie"}
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
              Zapomniales hasla?
            </Link>
            <p className="text-sm text-muted-foreground">
              Nie masz konta?{" "}
              <Link href="/auth/register" className="text-primary font-medium hover:underline">
                Zarejestruj sie
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
