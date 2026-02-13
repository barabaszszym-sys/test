"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Gift } from "lucide-react"
import { mockRewards } from "@/lib/mock-data"
import type { Reward } from "@/lib/types"

export function RewardsTable() {
  const [rewards, setRewards] = useState<Reward[]>(mockRewards)
  const [editingReward, setEditingReward] = useState<Reward | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSave = () => {
    if (!editingReward) return
    const exists = rewards.find((r) => r.id === editingReward.id)
    if (exists) {
      setRewards(rewards.map((r) => (r.id === editingReward.id ? editingReward : r)))
    } else {
      setRewards([...rewards, editingReward])
    }
    setEditingReward(null)
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setRewards(rewards.filter((r) => r.id !== id))
  }

  const openNew = () => {
    setEditingReward({
      id: `reward-${Date.now()}`,
      name: "",
      description: "",
      pointsCost: 0,
      imageUrl: "",
      category: "merch",
      inStock: true,
    })
    setIsDialogOpen(true)
  }

  const openEdit = (reward: Reward) => {
    setEditingReward({ ...reward })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Dodaj nagrode
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nagroda</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Koszt (pkt)</TableHead>
                <TableHead>Dostepnosc</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Gift className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{reward.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{reward.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{reward.category}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{reward.pointsCost} pkt</TableCell>
                  <TableCell>
                    <Badge variant={reward.inStock ? "default" : "secondary"}>
                      {reward.inStock ? "Dostepna" : "Niedostepna"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(reward)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(reward.id)}>
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
            <DialogTitle>{editingReward?.name ? "Edytuj nagrode" : "Nowa nagroda"}</DialogTitle>
          </DialogHeader>
          {editingReward && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nazwa</Label>
                <Input
                  value={editingReward.name}
                  onChange={(e) => setEditingReward({ ...editingReward, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Opis</Label>
                <Textarea
                  value={editingReward.description}
                  onChange={(e) => setEditingReward({ ...editingReward, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Koszt (punkty)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={editingReward.pointsCost}
                    onChange={(e) =>
                      setEditingReward({ ...editingReward, pointsCost: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kategoria</Label>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    value={editingReward.category}
                    onChange={(e) =>
                      setEditingReward({
                        ...editingReward,
                        category: e.target.value as Reward["category"],
                      })
                    }
                  >
                    <option value="merch">Merch</option>
                    <option value="voucher">Voucher</option>
                    <option value="experience">Doswiadczenie</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>URL zdjecia</Label>
                <Input
                  value={editingReward.imageUrl}
                  onChange={(e) => setEditingReward({ ...editingReward, imageUrl: e.target.value })}
                  placeholder="/images/reward.jpg"
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
