import type { Distributor, Client, Order, Promotion, RankingEntry, Invoice } from "./types"

export const mockConsultant = {
  id: "cons-1",
  firstName: "Anna",
  lastName: "Kowalska",
  phone: "+48 600 123 456",
  email: "anna.kowalska@soymax.pl",
}

export const mockDistributor: Distributor = {
  id: "dist-1",
  companyName: "AgroPartner Sp. z o.o.",
  nip: "1234567890",
  address: "ul. Polna 15, 00-001 Warszawa",
  phone: "+48 501 234 567",
  email: "kontakt@agropartner.pl",
  distributorCode: "DIST-2024-0042",
  baseDiscount: 5,
  programDiscount: 2,
  consultant: mockConsultant,
  registeredClientsCount: 18,
  activeClientsCount: 15,
}

export const mockClients: Client[] = [
  {
    id: "client-1",
    firstName: "Jan",
    lastName: "Nowak",
    phone: "+48 600 111 222",
    email: "jan.nowak@gmail.com",
    status: "active",
    points: 1250,
    registrationDate: "2024-01-15",
    lastPurchaseDate: "2024-12-10",
    distributorId: "dist-1",
  },
  {
    id: "client-2",
    firstName: "Maria",
    lastName: "Wiśniewska",
    phone: "+48 600 333 444",
    email: "maria.w@gmail.com",
    status: "active",
    points: 890,
    registrationDate: "2024-02-20",
    lastPurchaseDate: "2024-12-05",
    distributorId: "dist-1",
  },
  {
    id: "client-3",
    firstName: "Piotr",
    lastName: "Kowalczyk",
    phone: "+48 600 555 666",
    email: "piotr.k@wp.pl",
    status: "inactive",
    points: 320,
    registrationDate: "2024-03-10",
    lastPurchaseDate: "2024-08-15",
    distributorId: "dist-1",
  },
  {
    id: "client-4",
    firstName: "Agnieszka",
    lastName: "Zielińska",
    phone: "+48 600 777 888",
    email: "a.zielinska@onet.pl",
    status: "active",
    points: 2100,
    registrationDate: "2024-01-05",
    lastPurchaseDate: "2024-12-12",
    distributorId: "dist-1",
  },
  {
    id: "client-5",
    firstName: "Tomasz",
    lastName: "Lewandowski",
    phone: "+48 600 999 000",
    email: "t.lewandowski@gmail.com",
    status: "active",
    points: 560,
    registrationDate: "2024-04-18",
    lastPurchaseDate: "2024-11-28",
    distributorId: "dist-1",
  },
]

export const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "ZAM/2024/12/001",
    date: "2024-12-10",
    netValue: 4500,
    grossValue: 5535,
    status: "completed",
    appliedDiscount: 7,
    distributorId: "dist-1",
    items: [
      { id: "item-1", productName: "Soymax Premium 25kg", quantity: 10, unitPrice: 250, totalPrice: 2500 },
      { id: "item-2", productName: "Soymax Standard 25kg", quantity: 10, unitPrice: 200, totalPrice: 2000 },
    ],
  },
  {
    id: "order-2",
    orderNumber: "ZAM/2024/12/002",
    date: "2024-12-08",
    netValue: 2800,
    grossValue: 3444,
    status: "in_progress",
    appliedDiscount: 7,
    distributorId: "dist-1",
    items: [{ id: "item-3", productName: "Soymax Bio 20kg", quantity: 8, unitPrice: 350, totalPrice: 2800 }],
  },
  {
    id: "order-3",
    orderNumber: "ZAM/2024/11/045",
    date: "2024-11-25",
    netValue: 6200,
    grossValue: 7626,
    status: "completed",
    appliedDiscount: 7,
    distributorId: "dist-1",
    items: [
      { id: "item-4", productName: "Soymax Premium 25kg", quantity: 15, unitPrice: 250, totalPrice: 3750 },
      { id: "item-5", productName: "Soymax Starter 10kg", quantity: 14, unitPrice: 175, totalPrice: 2450 },
    ],
  },
]

export const mockPromotions: Promotion[] = [
  {
    id: "promo-1",
    title: "Podwójne punkty!",
    description: "X2 punkty za wszystkie produkty z linii Soymax Premium do końca grudnia",
    fullDescription: `Weź udział w naszej wyjątkowej promocji i zbieraj **podwójne punkty** za każdy zakup produktów z linii Soymax Premium!

**Jak to działa?**
- Każdy zakup produktu Soymax Premium = 2x więcej punktów
- Punkty naliczane automatycznie przy zamówieniu
- Brak limitu punktów do zdobycia

**Produkty objęte promocją:**
- Soymax Premium 25kg
- Soymax Premium Plus 25kg
- Soymax Premium Bio 20kg

**Okres trwania:** 1-31 grudnia 2024

Im więcej zamawiasz, tym więcej zyskujesz! Punkty możesz wymienić na atrakcyjne nagrody w katalogu nagród.`,
    imageUrl: "/double-points-promotion-green-agriculture-soybeans.jpg",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    type: "points",
    multiplier: 2,
  },
  {
    id: "promo-2",
    title: "Nowy produkt: Soymax Bio+",
    description: "Poznaj naszą najnowszą mieszankę paszową z certyfikatem ekologicznym",
    fullDescription: `Przedstawiamy **Soymax Bio+** - naszą najnowszą, w pełni ekologiczną mieszankę paszową stworzoną z myślą o zrównoważonym rolnictwie.

**Kluczowe cechy:**
- 100% składników z certyfikowanych upraw ekologicznych
- Wysoka zawartość białka (min. 44%)
- Bez GMO, bez antybiotyków
- Certyfikat EU Organic

**Dla kogo?**
Idealna dla gospodarstw prowadzących produkcję ekologiczną lub planujących przejście na metody bio.

**Promocja wprowadzająca:**
Zamów Soymax Bio+ do końca stycznia i otrzymaj **+50 punktów bonus** do każdego zamówienia!`,
    imageUrl: "/organic-bio-feed-product-green-soybeans-eco.jpg",
    startDate: "2024-12-01",
    endDate: "2025-01-31",
    type: "product",
  },
  {
    id: "promo-3",
    title: "Zimowa promocja",
    description: "15% rabatu na zamówienia powyżej 10 000 zł netto",
    fullDescription: `Skorzystaj z naszej **zimowej promocji** i zaoszczędź na większych zamówieniach!

**Zasady promocji:**
- Zamówienia o wartości **10 000 - 19 999 zł netto**: +1% do rabatu
- Zamówienia o wartości **20 000 - 49 999 zł netto**: +2% do rabatu  
- Zamówienia o wartości **50 000+ zł netto**: +3% do rabatu

**Ważne informacje:**
- Rabat naliczany automatycznie przy składaniu zamówienia
- Łączy się z Twoim podstawowym rabatem i rabatem z programu lojalnościowego
- Dotyczy wszystkich produktów z oferty SOYMAX

**Okres trwania:** 15 grudnia 2024 - 28 lutego 2025

Zaplanuj zakupy na zimę i zyskaj dodatkowe oszczędności!`,
    imageUrl: "/winter-sale-discount-snow-agriculture-barn.jpg",
    startDate: "2024-12-15",
    endDate: "2025-02-28",
    type: "info",
    discountBonus: 3,
  },
]

export const mockRanking: RankingEntry[] = [
  {
    position: 1,
    distributorId: "dist-top1",
    companyName: "Agro-Lider Sp. z o.o.",
    clientsCount: 87,
    isCurrentUser: false,
  },
  { position: 2, distributorId: "dist-top2", companyName: "FarmPartner", clientsCount: 72, isCurrentUser: false },
  { position: 3, distributorId: "dist-top3", companyName: "ZielonePole", clientsCount: 65, isCurrentUser: false },
  { position: 4, distributorId: "dist-top4", companyName: "AgroBiznes24", clientsCount: 54, isCurrentUser: false },
  { position: 5, distributorId: "dist-top5", companyName: "PolskaFarma", clientsCount: 48, isCurrentUser: false },
  {
    position: 12,
    distributorId: "dist-1",
    companyName: "AgroPartner Sp. z o.o.",
    clientsCount: 18,
    isCurrentUser: true,
  },
]

export const mockInvoices: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "FV/2024/12/0042",
    date: "2024-12-10",
    dueDate: "2024-12-24",
    netValue: 4500,
    grossValue: 5535,
    status: "pending",
    pdfUrl: "/invoices/FV-2024-12-0042.pdf",
    distributorId: "dist-1",
  },
  {
    id: "inv-2",
    invoiceNumber: "FV/2024/12/0038",
    date: "2024-12-05",
    dueDate: "2024-12-19",
    netValue: 2800,
    grossValue: 3444,
    status: "paid",
    pdfUrl: "/invoices/FV-2024-12-0038.pdf",
    distributorId: "dist-1",
  },
  {
    id: "inv-3",
    invoiceNumber: "FV/2024/11/0125",
    date: "2024-11-25",
    dueDate: "2024-12-09",
    netValue: 6200,
    grossValue: 7626,
    status: "paid",
    pdfUrl: "/invoices/FV-2024-11-0125.pdf",
    distributorId: "dist-1",
  },
  {
    id: "inv-4",
    invoiceNumber: "FV/2024/11/0098",
    date: "2024-11-15",
    dueDate: "2024-11-29",
    netValue: 3150,
    grossValue: 3874.5,
    status: "paid",
    pdfUrl: "/invoices/FV-2024-11-0098.pdf",
    distributorId: "dist-1",
  },
  {
    id: "inv-5",
    invoiceNumber: "FV/2024/11/0076",
    date: "2024-11-08",
    dueDate: "2024-11-22",
    netValue: 8900,
    grossValue: 10947,
    status: "paid",
    pdfUrl: "/invoices/FV-2024-11-0076.pdf",
    distributorId: "dist-1",
  },
  {
    id: "inv-6",
    invoiceNumber: "FV/2024/10/0210",
    date: "2024-10-28",
    dueDate: "2024-11-11",
    netValue: 5400,
    grossValue: 6642,
    status: "paid",
    pdfUrl: "/invoices/FV-2024-10-0210.pdf",
    distributorId: "dist-1",
  },
]
