// Typy danych dla aplikacji SOYMAX

export interface Consultant {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
}

export interface Distributor {
  id: string
  companyName: string
  nip: string
  address: string
  phone: string
  email: string
  distributorCode: string // z Comarcha - readonly
  baseDiscount: number // 0-3%
  programDiscount: number // dodatkowy rabat z programu
  consultant: Consultant
  registeredClientsCount: number
  activeClientsCount: number
}

export interface Client {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  status: "active" | "inactive"
  points: number
  registrationDate: string
  lastPurchaseDate: string | null
  distributorId: string
}

export interface OrderItem {
  id: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  netValue: number
  grossValue: number
  status: "completed" | "in_progress" | "cancelled"
  appliedDiscount: number
  items: OrderItem[]
  distributorId: string
}

export interface Promotion {
  id: string
  title: string
  description: string
  fullDescription?: string // Added full description for detail page
  imageUrl: string
  startDate: string
  endDate: string
  type: "product" | "points" | "info"
  multiplier?: number // Added multiplier for bonus promotions (e.g. 2 for x2 points)
  discountBonus?: number // Added discount bonus percentage
  assignedProductIds?: string[] // Added assigned products and status
  isActive: boolean
}

export interface RankingEntry {
  position: number
  distributorId: string
  companyName: string
  clientsCount: number
  isCurrentUser: boolean
}

export interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  dueDate: string
  netValue: number
  grossValue: number
  status: "paid" | "pending" | "overdue"
  pdfUrl: string
  distributorId: string
}

export interface Product {
  id: string
  name: string
  category: "premium" | "standard" | "bio" | "starter"
  description: string
  protein: number // % zawartości białka
  weight: number // kg
  pricePerUnit: number // PLN
  imageUrl: string
  inStock: boolean
  features: string[]
}

// Role i uprawnienia
export type UserRole = "admin" | "salesperson"

export interface Permission {
  id: string
  name: string
  description: string
}

export interface Role {
  id: string
  name: string
  displayName: string
  description: string
  permissions: string[] // IDs uprawnień
}

export interface AdminUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: UserRole
  assignedDistributorIds: string[] // Dla handlowca - przypisani dystrybutorzy
  isActive: boolean
  createdAt: string
}

// Wizyta handlowca u dystrybutora
export interface Visit {
  id: string
  distributorId: string
  salespersonId: string
  date: string
  note: string
  createdAt: string
}

// Lista wszystkich uprawnień w systemie
export const ALL_PERMISSIONS: Permission[] = [
  { id: "products.view", name: "Produkty - podgląd", description: "Przeglądanie listy produktów" },
  { id: "products.edit", name: "Produkty - edycja", description: "Dodawanie i edycja produktów" },
  { id: "products.delete", name: "Produkty - usuwanie", description: "Usuwanie produktów" },
  { id: "distributors.view", name: "Dystrybutorzy - podgląd", description: "Przeglądanie listy dystrybutorów" },
  { id: "distributors.view_own", name: "Dystrybutorzy - podgląd własnych", description: "Przeglądanie tylko przypisanych dystrybutorów" },
  { id: "distributors.edit", name: "Dystrybutorzy - edycja", description: "Edycja danych dystrybutorów" },
  { id: "distributors.delete", name: "Dystrybutorzy - usuwanie", description: "Usuwanie dystrybutorów" },
  { id: "clients.view", name: "Klienci - podgląd", description: "Przeglądanie listy klientów" },
  { id: "clients.view_own", name: "Klienci - podgląd własnych", description: "Przeglądanie klientów przypisanych dystrybutorów" },
  { id: "clients.edit", name: "Klienci - edycja", description: "Edycja danych klientów" },
  { id: "clients.delete", name: "Klienci - usuwanie", description: "Usuwanie klientów" },
  { id: "promotions.view", name: "Promocje - podgląd", description: "Przeglądanie listy promocji" },
  { id: "promotions.edit", name: "Promocje - edycja", description: "Dodawanie i edycja promocji" },
  { id: "promotions.delete", name: "Promocje - usuwanie", description: "Usuwanie promocji" },
  { id: "sales.view", name: "Sprzedaż - podgląd", description: "Przeglądanie raportów sprzedaży" },
  { id: "sales.view_own", name: "Sprzedaż - podgląd własnych", description: "Przeglądanie sprzedaży przypisanych dystrybutorów" },
  { id: "settings.view", name: "Ustawienia - podgląd", description: "Przeglądanie ustawień" },
  { id: "settings.edit", name: "Ustawienia - edycja", description: "Edycja ustawień systemowych" },
  { id: "users.view", name: "Użytkownicy - podgląd", description: "Przeglądanie listy użytkowników" },
  { id: "users.edit", name: "Użytkownicy - edycja", description: "Dodawanie i edycja użytkowników" },
  { id: "users.delete", name: "Użytkownicy - usuwanie", description: "Usuwanie użytkowników" },
  { id: "roles.view", name: "Role - podgląd", description: "Przeglądanie ról i uprawnień" },
  { id: "roles.edit", name: "Role - edycja", description: "Edycja ról i uprawnień" },
]

// Progi rabatowe
export const DISCOUNT_THRESHOLDS = [
  { minClients: 0, discount: 0 },
  { minClients: 10, discount: 1 },
  { minClients: 25, discount: 2 },
  { minClients: 50, discount: 3 },
] as const

export type DiscountThreshold = (typeof DISCOUNT_THRESHOLDS)[number]
