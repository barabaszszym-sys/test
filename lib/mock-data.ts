import type { Distributor, Client, Order, Promotion, RankingEntry, Invoice, Product } from "./types"

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

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Soymax Premium 25kg",
    category: "premium",
    description: "Najwyższej jakości pasza sojowa dla bydła mlecznego i opasowego",
    protein: 46,
    weight: 25,
    pricePerUnit: 250,
    imageUrl: "/premium-soy-feed-bag.jpg",
    inStock: true,
    features: ["Wysoka strawność", "Optymalna zawartość białka 46%", "Bez GMO", "Dla bydła mlecznego i opasowego"],
  },
  {
    id: "prod-2",
    name: "Soymax Standard 25kg",
    category: "standard",
    description: "Uniwersalna pasza dla bydła mlecznego i opasowego",
    protein: 44,
    weight: 25,
    pricePerUnit: 200,
    imageUrl: "/standard-soy-feed-bag.jpg",
    inStock: true,
    features: ["Dobra strawność", "Zawartość białka 44%", "Uniwersalne zastosowanie", "Optymalna cena"],
  },
  {
    id: "prod-3",
    name: "Soymax Bio+ 20kg",
    category: "bio",
    description: "Ekologiczna pasza sojowa z certyfikatem EU Organic",
    protein: 45,
    weight: 20,
    pricePerUnit: 350,
    imageUrl: "/organic-bio-soy-feed-bag.jpg",
    inStock: true,
    features: [
      "100% składników ekologicznych",
      "Certyfikat EU Organic",
      "Bez GMO i antybiotyków",
      "Zawartość białka 45%",
    ],
  },
  {
    id: "prod-4",
    name: "Soymax Starter 10kg",
    category: "starter",
    description: "Specjalistyczna pasza dla młodych zwierząt",
    protein: 48,
    weight: 10,
    pricePerUnit: 175,
    imageUrl: "/starter-young-animals-feed.jpg",
    inStock: true,
    features: [
      "Dla cieląt i młodych zwierząt",
      "Najwyższa zawartość białka 48%",
      "Łatwo przyswajalna",
      "Wspiera rozwój",
    ],
  },
  {
    id: "prod-5",
    name: "Soymax Premium Plus 25kg",
    category: "premium",
    description: "Wzbogacona formuła Premium z dodatkami mineralnymi",
    protein: 47,
    weight: 25,
    pricePerUnit: 280,
    imageUrl: "/premium-plus-enhanced-feed.jpg",
    inStock: true,
    features: [
      "Dodatki mineralne i witaminy",
      "Zawartość białka 47%",
      "Dla wysokowydajnych stad",
      "Wspomaga produkcję mleka",
    ],
  },
  {
    id: "prod-6",
    name: "Soymax Bio Standard 20kg",
    category: "bio",
    description: "Standardowa pasza ekologiczna w przystępnej cenie",
    protein: 43,
    weight: 20,
    pricePerUnit: 280,
    imageUrl: "/bio-standard-organic-feed.jpg",
    inStock: false,
    features: ["Certyfikat ekologiczny", "Zawartość białka 43%", "Bez GMO", "Dobra cena w segmencie bio"],
  },
]

export const mockDistributorsList: Distributor[] = [
  {
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
  },
  {
    id: "dist-2",
    companyName: "Agro-Lider Sp. z o.o.",
    nip: "9876543210",
    address: "ul. Wiejska 42, 60-200 Poznań",
    phone: "+48 502 345 678",
    email: "biuro@agrolider.pl",
    distributorCode: "DIST-2024-0015",
    baseDiscount: 7,
    programDiscount: 3,
    consultant: mockConsultant,
    registeredClientsCount: 87,
    activeClientsCount: 72,
  },
  {
    id: "dist-3",
    companyName: "FarmPartner",
    nip: "5678901234",
    address: "ul. Rolnicza 8, 30-100 Kraków",
    phone: "+48 503 456 789",
    email: "info@farmpartner.pl",
    distributorCode: "DIST-2024-0023",
    baseDiscount: 6,
    programDiscount: 2,
    consultant: {
      id: "cons-2",
      firstName: "Marek",
      lastName: "Wiśniewski",
      phone: "+48 601 234 567",
      email: "marek.wisniewski@soymax.pl",
    },
    registeredClientsCount: 72,
    activeClientsCount: 58,
  },
  {
    id: "dist-4",
    companyName: "ZielonePole",
    nip: "3456789012",
    address: "ul. Łąkowa 22, 50-300 Wrocław",
    phone: "+48 504 567 890",
    email: "kontakt@zielonepole.pl",
    distributorCode: "DIST-2024-0031",
    baseDiscount: 5,
    programDiscount: 3,
    consultant: {
      id: "cons-2",
      firstName: "Marek",
      lastName: "Wiśniewski",
      phone: "+48 601 234 567",
      email: "marek.wisniewski@soymax.pl",
    },
    registeredClientsCount: 65,
    activeClientsCount: 51,
  },
  {
    id: "dist-5",
    companyName: "AgroBiznes24",
    nip: "2345678901",
    address: "ul. Przemysłowa 5, 80-400 Gdańsk",
    phone: "+48 505 678 901",
    email: "sklep@agrobiznes24.pl",
    distributorCode: "DIST-2024-0008",
    baseDiscount: 4,
    programDiscount: 1,
    consultant: mockConsultant,
    registeredClientsCount: 54,
    activeClientsCount: 42,
  },
  {
    id: "dist-6",
    companyName: "PolskaFarma",
    nip: "6789012345",
    address: "ul. Słoneczna 17, 20-500 Lublin",
    phone: "+48 506 789 012",
    email: "biuro@polskafarma.pl",
    distributorCode: "DIST-2024-0056",
    baseDiscount: 5,
    programDiscount: 2,
    consultant: {
      id: "cons-3",
      firstName: "Katarzyna",
      lastName: "Nowak",
      phone: "+48 602 345 678",
      email: "katarzyna.nowak@soymax.pl",
    },
    registeredClientsCount: 48,
    activeClientsCount: 39,
  },
  {
    id: "dist-7",
    companyName: "Rolnik Plus",
    nip: "4567890123",
    address: "ul. Ogrodowa 33, 40-600 Katowice",
    phone: "+48 507 890 123",
    email: "sklep@rolnikplus.pl",
    distributorCode: "DIST-2024-0072",
    baseDiscount: 3,
    programDiscount: 1,
    consultant: {
      id: "cons-3",
      firstName: "Katarzyna",
      lastName: "Nowak",
      phone: "+48 602 345 678",
      email: "katarzyna.nowak@soymax.pl",
    },
    registeredClientsCount: 32,
    activeClientsCount: 25,
  },
  {
    id: "dist-8",
    companyName: "Gospodarstwo Zdrowe",
    nip: "7890123456",
    address: "ul. Zielona 9, 70-700 Szczecin",
    phone: "+48 508 901 234",
    email: "kontakt@gospodarstwo-zdrowe.pl",
    distributorCode: "DIST-2024-0089",
    baseDiscount: 4,
    programDiscount: 2,
    consultant: mockConsultant,
    registeredClientsCount: 41,
    activeClientsCount: 35,
  },
]
