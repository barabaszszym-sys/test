import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import type { Consultant } from "@/lib/types"

interface ConsultantCardProps {
  consultant: Consultant
}

export function ConsultantCard({ consultant }: ConsultantCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 text-sm font-medium text-muted-foreground">Twój opiekun klienta</div>
        <div className="mb-3 text-base font-semibold">
          {consultant.firstName} {consultant.lastName}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
            <a href={`tel:${consultant.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              Zadzwoń
            </a>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
            <a href={`mailto:${consultant.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
