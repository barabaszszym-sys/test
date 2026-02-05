"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Search, Users, UserCheck, UserX } from "lucide-react"
import { ClientCard } from "@/components/client-card"
import { getClients, isLoggedIn } from "@/lib/storage"
import type { Client } from "@/lib/types"

type FilterStatus = "all" | "active" | "inactive"
type SortOption = "newest" | "alphabetical" | "points"

export default function ClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/")
      return
    }
    setClients(getClients())
    setIsLoading(false)
  }, [router])

  // Statistics
  const stats = useMemo(() => {
    const total = clients.length
    const active = clients.filter((c) => c.status === "active").length
    const inactive = total - active
    return { total, active, inactive }
  }, [clients])

  // Filtered and sorted clients
  const filteredClients = useMemo(() => {
    let result = [...clients]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.firstName.toLowerCase().includes(query) ||
          c.lastName.toLowerCase().includes(query) ||
          c.phone.includes(query) ||
          c.email.toLowerCase().includes(query),
      )
    }

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((c) => c.status === filterStatus)
    }

    // Sort
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
        break
      case "alphabetical":
        result.sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`))
        break
      case "points":
        result.sort((a, b) => b.points - a.points)
        break
    }

    return result
  }, [clients, searchQuery, filterStatus, sortOption])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">Ładowanie...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-foreground">Moi klienci</h1>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => router.push("/clients/register")}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Dodaj
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj klienta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </header>

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Wszyscy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-green-600 mb-1">
                <UserCheck className="h-4 w-4" />
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              <p className="text-xs text-muted-foreground">Aktywni</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-400 mb-1">
                <UserX className="h-4 w-4" />
              </div>
              <p className="text-2xl font-bold text-gray-400">{stats.inactive}</p>
              <p className="text-xs text-muted-foreground">Nieaktywni</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as FilterStatus)}>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                Wszyscy
              </TabsTrigger>
              <TabsTrigger value="active" className="flex-1">
                Aktywni
              </TabsTrigger>
              <TabsTrigger value="inactive" className="flex-1">
                Nieaktywni
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sortowanie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Najnowsi</SelectItem>
              <SelectItem value="alphabetical">Alfabetycznie (A-Z)</SelectItem>
              <SelectItem value="points">Najwięcej punktów</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Client List */}
        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">
              {searchQuery ? "Nie znaleziono klientów" : "Brak klientów do wyświetlenia"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
