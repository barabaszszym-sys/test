"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Store, Phone, Mail, MapPin, User, Calendar, Clock, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getFromStorage, saveToStorage } from "@/lib/storage"
import { mockDistributorsList, mockVisits, mockAdminUsers } from "@/lib/mock-data"
import type { Distributor, Visit } from "@/lib/types"

export function DistributorsTable() {
  const [distributors, setDistributors] = useState<Distributor[]>(() => {
    const stored = getFromStorage<Distributor[]>("admin_distributors")
    return stored || mockDistributorsList
  })
  const [visits, setVisits] = useState<Visit[]>(() => {
    const stored = getFromStorage<Visit[]>("admin_visits")
    return stored || mockVisits
  })
  const [search, setSearch] = useState("")
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<Distributor>>({})
  const [isAddingVisit, setIsAddingVisit] = useState(false)
  const [newVisitNote, setNewVisitNote] = useState("")
  const [newVisitDate, setNewVisitDate] = useState(new Date().toISOString().split("T")[0])

  const filteredDistributors = distributors.filter(
    (distributor) =>
      distributor.companyName.toLowerCase().includes(search.toLowerCase()) ||
      distributor.nip.includes(search) ||
      distributor.address.toLowerCase().includes(search.toLowerCase()) ||
      distributor.consultant.lastName.toLowerCase().includes(search.toLowerCase()),
  )

  const openDrawer = (distributor: Distributor, edit = false) => {
    setSelectedDistributor(distributor)
    setEditForm(distributor)
    setIsEditing(edit)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedDistributor(null)
    setIsEditing(false)
    setEditForm({})
  }

  const handleSave = () => {
    if (!selectedDistributor || !editForm) return

    const updatedDistributors = distributors.map((d) => (d.id === selectedDistributor.id ? { ...d, ...editForm } : d))
    setDistributors(updatedDistributors)
    saveToStorage("admin_distributors", updatedDistributors)
    closeDrawer()
  }

  const handleDelete = (distributorId: string) => {
    const updatedDistributors = distributors.filter((d) => d.id !== distributorId)
    setDistributors(updatedDistributors)
    saveToStorage("admin_distributors", updatedDistributors)
    closeDrawer()
  }

  const getTotalDiscount = (distributor: Distributor) => {
    return distributor.baseDiscount + distributor.programDiscount
  }

  const getDistributorVisits = (distributorId: string) => {
    return visits
      .filter((v) => v.distributorId === distributorId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getSalespersonName = (salespersonId: string) => {
    const user = mockAdminUsers.find((u) => u.id === salespersonId)
    return user ? `${user.firstName} ${user.lastName}` : "Nieznany"
  }

  const handleAddVisit = () => {
    if (!selectedDistributor || !newVisitNote.trim()) return

    const newVisit: Visit = {
      id: `visit-${Date.now()}`,
      distributorId: selectedDistributor.id,
      salespersonId: "user-2", // W produkcji: ID zalogowanego handlowca
      date: newVisitDate,
      note: newVisitNote.trim(),
      createdAt: new Date().toISOString(),
    }

    const updatedVisits = [...visits, newVisit]
    setVisits(updatedVisits)
    saveToStorage("admin_visits", updatedVisits)
    setNewVisitNote("")
    setNewVisitDate(new Date().toISOString().split("T")[0])
    setIsAddingVisit(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Szukaj po nazwie, NIP, lokalizacji..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" />
          Dodaj dystrybutora
        </Button>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Nazwa firmy</TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>Lokalizacja</TableHead>
              <TableHead>Rabat</TableHead>
              <TableHead>Klienci</TableHead>
              <TableHead>Opiekun</TableHead>
              <TableHead className="w-24">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDistributors.map((distributor) => (
              <TableRow
                key={distributor.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => openDrawer(distributor)}
              >
                <TableCell>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Store className="h-5 w-5 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{distributor.companyName}</TableCell>
                <TableCell className="text-muted-foreground">{distributor.nip}</TableCell>
                <TableCell className="text-muted-foreground max-w-[200px] truncate">{distributor.address}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {getTotalDiscount(distributor)}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{distributor.activeClientsCount}</span>
                  <span className="text-muted-foreground">/{distributor.registeredClientsCount}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {distributor.consultant.firstName} {distributor.consultant.lastName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        openDrawer(distributor, true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(distributor.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{isEditing ? "Edytuj dystrybutora" : "Szczegóły dystrybutora"}</SheetTitle>
            <SheetDescription>
              {isEditing ? "Edytuj dane dystrybutora" : "Podgląd informacji o dystrybutorze"}
            </SheetDescription>
          </SheetHeader>

          {selectedDistributor && (
            <div className="mt-6">
              {isEditing ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nazwa firmy</Label>
                    <Input
                      id="companyName"
                      value={editForm.companyName || ""}
                      onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nip">NIP</Label>
                    <Input
                      id="nip"
                      value={editForm.nip || ""}
                      onChange={(e) => setEditForm({ ...editForm, nip: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input
                      id="address"
                      value={editForm.address || ""}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        value={editForm.phone || ""}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email || ""}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="baseDiscount">Rabat podstawowy (%)</Label>
                      <Input
                        id="baseDiscount"
                        type="number"
                        value={editForm.baseDiscount || 0}
                        onChange={(e) => setEditForm({ ...editForm, baseDiscount: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programDiscount">Rabat z programu (%)</Label>
                      <Input
                        id="programDiscount"
                        type="number"
                        value={editForm.programDiscount || 0}
                        onChange={(e) => setEditForm({ ...editForm, programDiscount: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="info">Informacje</TabsTrigger>
                    <TabsTrigger value="visits">
                      Wizyty ({getDistributorVisits(selectedDistributor.id).length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="mt-4 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                        <Store className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedDistributor.companyName}</h3>
                        <p className="text-sm text-muted-foreground">Kod: {selectedDistributor.distributorCode}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDistributor.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDistributor.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDistributor.email}</span>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border p-4 space-y-2">
                      <p className="text-xs text-muted-foreground uppercase font-medium">NIP</p>
                      <p className="font-mono text-lg">{selectedDistributor.nip}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-xs text-muted-foreground">Rabat podstawowy</p>
                        <p className="text-lg font-semibold">{selectedDistributor.baseDiscount}%</p>
                      </div>
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-xs text-muted-foreground">Rabat z programu</p>
                        <p className="text-lg font-semibold">{selectedDistributor.programDiscount}%</p>
                      </div>
                      <div className="rounded-lg bg-orange-100 p-3">
                        <p className="text-xs text-orange-800">Łączny rabat</p>
                        <p className="text-lg font-semibold text-orange-800">{getTotalDiscount(selectedDistributor)}%</p>
                      </div>
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-xs text-muted-foreground">Aktywni klienci</p>
                        <p className="text-lg font-semibold">
                          {selectedDistributor.activeClientsCount}/{selectedDistributor.registeredClientsCount}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Opiekun klienta</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {selectedDistributor.consultant.firstName} {selectedDistributor.consultant.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{selectedDistributor.consultant.phone}</p>
                        <p className="text-sm text-muted-foreground">{selectedDistributor.consultant.email}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="visits" className="mt-4 space-y-4">
                    {/* Add Visit Form */}
                    {isAddingVisit ? (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Nowa wizyta</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="visitDate">Data wizyty</Label>
                            <Input
                              id="visitDate"
                              type="date"
                              value={newVisitDate}
                              onChange={(e) => setNewVisitDate(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="visitNote">Notatka</Label>
                            <Textarea
                              id="visitNote"
                              placeholder="Opisz przebieg wizyty..."
                              value={newVisitNote}
                              onChange={(e) => setNewVisitNote(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent"
                              onClick={() => {
                                setIsAddingVisit(false)
                                setNewVisitNote("")
                              }}
                            >
                              Anuluj
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={handleAddVisit}
                              disabled={!newVisitNote.trim()}
                            >
                              Zapisz wizytę
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setIsAddingVisit(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Dodaj wizytę
                      </Button>
                    )}

                    {/* Visits Timeline */}
                    <div className="space-y-1">
                      {getDistributorVisits(selectedDistributor.id).length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Brak zarejestrowanych wizyt</p>
                          <p className="text-sm">Dodaj pierwszą wizytę u tego dystrybutora</p>
                        </div>
                      ) : (
                        <div className="relative">
                          {/* Timeline line */}
                          <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />
                          
                          {getDistributorVisits(selectedDistributor.id).map((visit, index) => (
                            <div key={visit.id} className="relative pl-10 pb-6 last:pb-0">
                              {/* Timeline dot */}
                              <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                              
                              <div className="rounded-lg border border-border p-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="font-medium">
                                      {new Date(visit.date).toLocaleDateString("pl-PL", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">
                                    {getSalespersonName(visit.salespersonId)}
                                  </Badge>
                                </div>
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                                  <p className="text-sm text-muted-foreground">{visit.note}</p>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    Dodano: {new Date(visit.createdAt).toLocaleString("pl-PL")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          )}

          <SheetFooter className="mt-6">
            {isEditing ? (
              <div className="flex w-full gap-2">
                <Button variant="outline" onClick={closeDrawer} className="flex-1 bg-transparent">
                  Anuluj
                </Button>
                <Button onClick={handleSave} className="flex-1 bg-primary">
                  Zapisz
                </Button>
              </div>
            ) : (
              <div className="flex w-full gap-2">
                <Button variant="outline" onClick={closeDrawer} className="flex-1 bg-transparent">
                  Zamknij
                </Button>
                <Button onClick={() => setIsEditing(true)} className="flex-1 bg-primary">
                  <Edit className="mr-2 h-4 w-4" />
                  Edytuj
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
