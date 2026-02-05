import type { Distributor, Client, Order, Promotion, RankingEntry } from "./types"
import { mockDistributor, mockClients, mockOrders, mockPromotions, mockRanking } from "./mock-data"

const STORAGE_KEYS = {
  DISTRIBUTOR: "soymax_distributor",
  CLIENTS: "soymax_clients",
  ORDERS: "soymax_orders",
  PROMOTIONS: "soymax_promotions",
  RANKING: "soymax_ranking",
  IS_LOGGED_IN: "soymax_is_logged_in",
} as const

// Helpers
function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  const item = localStorage.getItem(key)
  if (!item) return defaultValue
  try {
    return JSON.parse(item) as T
  } catch {
    return defaultValue
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

// Auth
export function isLoggedIn(): boolean {
  return getItem(STORAGE_KEYS.IS_LOGGED_IN, false)
}

export function login(): void {
  setItem(STORAGE_KEYS.IS_LOGGED_IN, true)
  // Initialize mock data on first login
  if (!localStorage.getItem(STORAGE_KEYS.DISTRIBUTOR)) {
    initializeMockData()
  }
}

export function logout(): void {
  setItem(STORAGE_KEYS.IS_LOGGED_IN, false)
}

// Initialize mock data
export function initializeMockData(): void {
  setItem(STORAGE_KEYS.DISTRIBUTOR, mockDistributor)
  setItem(STORAGE_KEYS.CLIENTS, mockClients)
  setItem(STORAGE_KEYS.ORDERS, mockOrders)
  setItem(STORAGE_KEYS.PROMOTIONS, mockPromotions)
  setItem(STORAGE_KEYS.RANKING, mockRanking)
}

// Reset data
export function resetAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key)
  })
  initializeMockData()
}

// Distributor
export function getDistributor(): Distributor {
  return getItem(STORAGE_KEYS.DISTRIBUTOR, mockDistributor)
}

export function updateDistributor(data: Partial<Distributor>): Distributor {
  const current = getDistributor()
  const updated = { ...current, ...data }
  setItem(STORAGE_KEYS.DISTRIBUTOR, updated)
  return updated
}

// Clients
export function getClients(): Client[] {
  return getItem(STORAGE_KEYS.CLIENTS, mockClients)
}

export function getClientById(id: string): Client | undefined {
  return getClients().find((c) => c.id === id)
}

export function addClient(client: Omit<Client, "id">): Client {
  const clients = getClients()
  const newClient: Client = {
    ...client,
    id: `client-${Date.now()}`,
  }
  clients.push(newClient)
  setItem(STORAGE_KEYS.CLIENTS, clients)

  // Update distributor client counts
  const distributor = getDistributor()
  updateDistributor({
    registeredClientsCount: clients.length,
    activeClientsCount: clients.filter((c) => c.status === "active").length,
  })

  return newClient
}

export function updateClient(id: string, data: Partial<Client>): Client | null {
  const clients = getClients()
  const index = clients.findIndex((c) => c.id === id)
  if (index === -1) return null
  clients[index] = { ...clients[index], ...data }
  setItem(STORAGE_KEYS.CLIENTS, clients)
  return clients[index]
}

// Orders
export function getOrders(): Order[] {
  return getItem(STORAGE_KEYS.ORDERS, mockOrders)
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id)
}

// Promotions
export function getPromotions(): Promotion[] {
  return getItem(STORAGE_KEYS.PROMOTIONS, mockPromotions)
}

// Ranking
export function getRanking(): RankingEntry[] {
  return getItem(STORAGE_KEYS.RANKING, mockRanking)
}

export function getFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null
  const item = localStorage.getItem(key)
  if (!item) return null
  try {
    return JSON.parse(item) as T
  } catch {
    return null
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}
