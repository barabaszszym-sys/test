"use client"

import { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function DashboardNotification() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="relative border-orange-200 bg-orange-50">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        Zaoszczędź 140 zł płacąc za fakturę Fx09.09.2026 w przeciągu 3 dni
      </AlertDescription>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 h-6 w-6 p-0 hover:bg-orange-100"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4 text-orange-600" />
      </Button>
    </Alert>
  )
}
