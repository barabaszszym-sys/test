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

// Progi rabatowe
export const DISCOUNT_THRESHOLDS = [
  { minClients: 0, discount: 0 },
  { minClients: 10, discount: 1 },
  { minClients: 25, discount: 2 },
  { minClients: 50, discount: 3 },
] as const

export type DiscountThreshold = (typeof DISCOUNT_THRESHOLDS)[number]
