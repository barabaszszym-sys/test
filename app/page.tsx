"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { isLoggedIn, login } from "@/lib/storage"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/dashboard")
    }
  }, [router])

  const handleLogin = () => {
    login()
    router.push("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">SOYMAX</h1>
        <p className="text-muted-foreground">Program Lojalnościowy dla Dystrybutorów</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Witaj!</CardTitle>
          <CardDescription>Zaloguj się, aby uzyskać dostęp do aplikacji</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" size="lg" onClick={handleLogin}>
            Zaloguj się
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">POC - kliknij aby przejść do dashboardu</p>
        </CardContent>
      </Card>
    </main>
  )
}
