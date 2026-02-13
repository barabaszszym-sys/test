"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Users } from "lucide-react"

interface Salesperson {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  region: string
  distributorsCount: number
  isActive: boolean
}

const mockSalespersons: Salesperson[] = [
  {
    id: "sp-1",
    firstName: "Anna",
    lastName: "Kowalska",
    email: "anna.kowalska@soymax.pl",
    phone: "+48 502 111 222",
    region: "Mazowieckie",
    distributorsCount: 12,
    isActive: true,
  },
  {
    id: "sp-2",
    firstName: "Piotr",
    lastName: "Wisniewski",
    email: "p.wisniewski@soymax.pl",
    phone: "+48 503 333 444",
    region: "Wielkopolskie",
    distributorsCount: 8,
    isActive: true,
  },
  {
    id: "sp-3",
    firstName: "Katarzyna",
    lastName: "Dabrowska",
    email: "k.dabrowska@soymax.pl",
    phone: "+48 504 555 666",
    region: "Podlaskie",
    distributorsCount: 5,
    isActive: false,
  },
]

export function SalespersonsTable() {
  const [salespersons, setSalespersons] = useState<Salesperson[]>(mockSalespersons)
  const [editing, setEditing] = useState<Salesperson | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSave = () => {
    if (!editing) return
    const exists = salespersons.find((s) => s.id === editing.id)
    if (exists) {
      setSalespersons(salespersons.map((s) => (s.id === editing.id ? editing : s)))
    } else {
      setSalespersons([...salespersons, editing])
    }
    setEditing(null)
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setSalespersons(salespersons.filter((s) => s.id !== id))
  }

  const openNew = () => {
    setEditing({
      id: `sp-${Date.now()}`,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      region: "",
      distributorsCount: 0,
      isActive: true,
    })
    setIsDialogOpen(true)
  }

  const openEdit = (sp: Salesperson) => {
    setEditing({ ...sp })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Dodaj handlowca
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Handlowiec</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Dystrybutorzy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salespersons.map((sp) => (
                <TableRow key={sp.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{sp.firstName} {sp.lastName}</p>
                      <p className="text-xs text-muted-foreground">{sp.email}</p>
                      <p className="text-xs text-muted-foreground">{sp.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{sp.region}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {sp.distributorsCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={sp.isActive ? "default" : "secondary"}>
                      {sp.isActive ? "Aktywny" : "Nieaktywny"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(sp)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(sp.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing?.firstName ? "Edytuj handlowca" : "Nowy handlowiec"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Imie</Label>
                  <Input
                    value={editing.firstName}
                    onChange={(e) => setEditing({ ...editing, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nazwisko</Label>
                  <Input
                    value={editing.lastName}
                    onChange={(e) => setEditing({ ...editing, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editing.email}
                  onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Telefon</Label>
                <Input
                  value={editing.phone}
                  onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Region</Label>
                <Input
                  value={editing.region}
                  onChange={(e) => setEditing({ ...editing, region: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleSave}>
                Zapisz
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
