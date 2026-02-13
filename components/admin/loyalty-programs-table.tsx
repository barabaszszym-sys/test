"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { mockLoyaltyPrograms } from "@/lib/mock-data"
import type { LoyaltyProgram } from "@/lib/types"

export function LoyaltyProgramsTable() {
  const [programs, setPrograms] = useState<LoyaltyProgram[]>(mockLoyaltyPrograms)
  const [editingProgram, setEditingProgram] = useState<LoyaltyProgram | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSave = () => {
    if (!editingProgram) return
    const exists = programs.find((p) => p.id === editingProgram.id)
    if (exists) {
      setPrograms(programs.map((p) => (p.id === editingProgram.id ? editingProgram : p)))
    } else {
      setPrograms([...programs, editingProgram])
    }
    setEditingProgram(null)
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setPrograms(programs.filter((p) => p.id !== id))
  }

  const openNew = () => {
    setEditingProgram({
      id: `prog-${Date.now()}`,
      name: "",
      description: "",
      operations: [],
      multiplier: 1,
      isActive: true,
      startDate: "",
      endDate: "",
    })
    setIsDialogOpen(true)
  }

  const openEdit = (program: LoyaltyProgram) => {
    setEditingProgram({ ...program })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Dodaj program
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa</TableHead>
                <TableHead>Przelicznik</TableHead>
                <TableHead>Okres</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{program.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{program.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>x{program.multiplier}</TableCell>
                  <TableCell className="text-sm">
                    {program.startDate} - {program.endDate}
                  </TableCell>
                  <TableCell>
                    <Badge variant={program.isActive ? "default" : "secondary"}>
                      {program.isActive ? "Aktywny" : "Nieaktywny"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(program)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(program.id)}>
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
            <DialogTitle>{editingProgram?.name ? "Edytuj program" : "Nowy program"}</DialogTitle>
          </DialogHeader>
          {editingProgram && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nazwa</Label>
                <Input
                  value={editingProgram.name}
                  onChange={(e) => setEditingProgram({ ...editingProgram, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Opis</Label>
                <Textarea
                  value={editingProgram.description}
                  onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Operacje punktowane (po przecinku)</Label>
                <Input
                  value={editingProgram.operations.join(", ")}
                  onChange={(e) =>
                    setEditingProgram({
                      ...editingProgram,
                      operations: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Przelicznik</Label>
                  <Input
                    type="number"
                    min={1}
                    value={editingProgram.multiplier}
                    onChange={(e) =>
                      setEditingProgram({ ...editingProgram, multiplier: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="flex items-end gap-2 pb-1">
                  <Switch
                    checked={editingProgram.isActive}
                    onCheckedChange={(checked) =>
                      setEditingProgram({ ...editingProgram, isActive: checked })
                    }
                  />
                  <Label>Aktywny</Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Data rozpoczecia</Label>
                  <Input
                    type="date"
                    value={editingProgram.startDate}
                    onChange={(e) => setEditingProgram({ ...editingProgram, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Data zakonczenia</Label>
                  <Input
                    type="date"
                    value={editingProgram.endDate}
                    onChange={(e) => setEditingProgram({ ...editingProgram, endDate: e.target.value })}
                  />
                </div>
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
