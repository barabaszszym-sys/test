# SOYMAX - Aplikacja Lojalnościowa dla Dystrybutorów

## Opis projektu

Aplikacja mobilna (PWA) dla dystrybutorów firmy SOYMAX, umożliwiająca zarządzanie programem lojalnościowym, rejestrację klientów końcowych oraz śledzenie rabatów i faktur. System obejmuje również panel administracyjny dla pracowników SOYMAX oraz aplikację dla klientów końcowych.

---

## 1. Informacje ogólne

| Parametr | Wartość |
|----------|---------|
| Typ aplikacji | PWA (Progressive Web App) |
| Platforma | Mobile-first, responsywna |
| Framework | Next.js 15 (App Router) |
| UI Library | shadcn/ui + Tailwind CSS |
| Języki | TypeScript, React |
| Dystrybucja | Link webowy + opcjonalnie sklepy (PWA) |

---

## 2. Role użytkowników

| Rola | Opis | Uprawnienia | Szacowana liczba |
|------|------|-------------|------------------|
| **Administrator** | Pełny dostęp do systemu | Zarządzanie wszystkimi danymi, użytkownikami, rolami | ~5 osób |
| **Handlowiec** | Pracownik SOYMAX opiekujący się dystrybutorami | Zarządzanie przypisanymi dystrybutorami i ich klientami, dodawanie wizyt | ~10-20 osób |
| **Dystrybutor** | Główni użytkownicy aplikacji mobilnej | Rejestracja klientów, podgląd rabatów, faktur, promocji | 200-500 |
| **Klient końcowy** | Użytkownicy aplikacji klienta | Podgląd punktów, wymiana nagród, kod QR | setki/tysiące |

---

## 3. Ekrany aplikacji dystrybutora

### 3.1 Ekran logowania (`/`)
- Prosty przycisk "Zaloguj się"
- Logo firmy SOYMAX
- POC: bez faktycznej autoryzacji, przekierowanie do dashboardu

**Wymagania produkcyjne:**
- Integracja z systemem autoryzacji (OAuth2 / własny backend)
- Dwuskładnikowe uwierzytelnianie (opcjonalne)
- "Zapomniałem hasła"

---

### 3.2 Dashboard (`/dashboard`)
Główny ekran po zalogowaniu z podsumowaniem statusu dystrybutora.

**Elementy:**
1. **Karta "Rabat specjalny"**
   - Aktualny procent rabatu (duża cyfra wycentrowana)
   - Progress bar do następnego progu (orange-500)
   - Informacja o kolejnym progu: "kolejny rabat: X% (Y klientów)"
   - Kliknięcie otwiera sheet z listą aktywnych bonusów z promocji

2. **Statystyki klientów**
   - Liczba wszystkich klientów
   - Liczba aktywnych / nieaktywnych
   - Nowi w tym miesiącu

3. **Quick Actions (przyciski szybkiego dostępu)**
   - "Dodaj klienta" (główne CTA)
   - "Lista klientów"
   - "Faktury"

4. **Karuzelka promocji**
   - Slider z aktualnymi promocjami
   - Kliknięcie przenosi do szczegółów promocji

5. **Dane konsultanta**
   - Imię i nazwisko opiekuna
   - Przycisk "Zadzwoń"
   - Przycisk "Email"

**Wymagania produkcyjne:**
- API: pobieranie danych dystrybutora
- API: pobieranie aktualnych promocji
- Real-time aktualizacja statystyk

---

### 3.3 Lista klientów (`/clients`)
Przegląd wszystkich zarejestrowanych klientów końcowych.

**Elementy:**
1. **Statystyki zbiorcze** (karty na górze)
   - Wszyscy klienci
   - Aktywni (pobrali aplikację)
   - Nieaktywni

2. **Wyszukiwarka**
   - Filtrowanie po imieniu, nazwisku, telefonie, emailu

3. **Filtry (tabs)**
   - Wszyscy / Aktywni / Nieaktywni

4. **Sortowanie**
   - Najnowsi
   - Alfabetycznie
   - Najwięcej punktów

5. **Lista kart klientów**
   - Imię i nazwisko
   - Numer telefonu
   - Status (badge: aktywny/nieaktywny)
   - Punkty
   - Data rejestracji
   - Data ostatnich zakupów

6. **Floating Action Button**
   - "Dodaj klienta" → `/clients/register`

**Wymagania produkcyjne:**
- API: CRUD klientów
- Paginacja dla dużej liczby klientów
- Eksport listy do CSV/Excel

---

### 3.4 Rejestracja klienta (`/clients/register`)
Formularz dodawania nowego klienta do programu.

**Tabs:**

**Tab 1: Formularz ręczny**
- Pole: Nazwa klienta (imię i nazwisko)
- Pole: Numer telefonu
- Pole: Adres e-mail
- Wybór metody wysyłki linku aktywacyjnego (SMS / Email)
- Przycisk "Wyślij link aktywacyjny"
- Po wysłaniu: komunikat potwierdzający z informacją gdzie wysłano link

**Tab 2: Kod QR**
- Dynamicznie generowany kod QR
- Link rejestracyjny z kodem dystrybutora
- Instrukcja dla klienta

**Wymagania produkcyjne:**
- API: generowanie tokenów rejestracyjnych
- Integracja SMS gateway (np. SMSAPI, Twilio)
- Integracja email (np. SendGrid, Resend)
- Walidacja numeru telefonu (format PL)

---

### 3.5 Faktury (`/invoices`)
Lista faktur elektronicznych do pobrania.

**Elementy:**
1. **Wyszukiwarka**
   - Filtrowanie po numerze, dacie, kwocie

2. **Galeria kart faktur**
   - Numer faktury
   - Data wystawienia
   - Kwota brutto
   - Status (opłacona / oczekująca / przeterminowana)
   - Ikona PDF

3. **Akcja kliknięcia**
   - Pobieranie pliku PDF faktury

**Wymagania produkcyjne:**
- API: pobieranie listy faktur z systemu ERP (Comarch)
- Generowanie/pobieranie PDF
- Filtrowanie po datach i statusie

---

### 3.6 Katalog produktów (`/products`)
Przeglądanie katalogu pasz sojowych SOYMAX.

**Elementy:**
1. **Wyszukiwarka**
   - Filtrowanie po nazwie produktu

2. **Filtry kategorii (tabs)**
   - Wszystkie / Premium / Standard / Bio / Starter

3. **Galeria kart produktów**
   - Zdjęcie produktu
   - Nazwa produktu
   - Kategoria (badge)
   - Krótki opis
   - Zawartość białka
   - Waga opakowania
   - Cechy produktu (badge'e)
   - Cena netto

**Wymagania produkcyjne:**
- API: pobieranie katalogu produktów
- Integracja z systemem magazynowym (dostępność)
- Możliwość składania zamówień

---

### 3.7 Szczegóły promocji (`/promotions/[id]`)
Strona z pełnymi informacjami o promocji.

**Elementy:**
1. **Grafika główna** (hero image)
2. **Tytuł promocji**
3. **Okres trwania** (od-do)
4. **Pełny opis** (HTML/Markdown)
5. **Informacje o bonusach**
   - Mnożnik punktów (np. x2)
   - Dodatkowy rabat (%)
6. **Przycisk CTA** "Weź udział"
   - Zapisuje uczestnictwo w localStorage (POC)
   - Produkcyjnie: API zapisujące do bazy

**Wymagania produkcyjne:**
- API: szczegóły promocji
- API: zapis/odczyt uczestnictwa
- System powiadomień o nowych promocjach

---

## 4. Aplikacja klienta końcowego (`/customer-account`)

Widok mobile-first dla klientów końcowych programu lojalnościowego.

### 4.1 Elementy główne

1. **Kod QR klienta**
   - Unikalny kod QR z identyfikatorem klienta
   - Służy do skanowania przez dystrybutorów podczas zakupów
   - Wyświetlany na górze ekranu

2. **Stan punktów**
   - Duża liczba aktualnie posiadanych punktów
   - Ikona monet/gwiazdek

3. **Karuzelka nagród**
   - Lista wszystkich dostępnych nagród do wymiany
   - Każda nagroda pokazuje: zdjęcie, nazwę, koszt w punktach
   - Oznaczenie dostępności (w magazynie / brak)
   - Kliknięcie otwiera szczegóły nagrody

4. **Szczegóły nagrody (Sheet)**
   - Pełny opis nagrody
   - Zdjęcie w większym formacie
   - Koszt w punktach
   - Typ odbioru (u dystrybutora / w SOYMAX / dostawa)
   - Przycisk "Wymień za X punktów"
   - Dialog potwierdzenia wymiany

5. **Lista wymienionych nagród**
   - Historia wymian z datą i statusem
   - Statusy: oczekuje / gotowa do odbioru / odebrana

### 4.2 Kategorie nagród

| Kategoria | Przykłady |
|-----------|-----------|
| Gadżety | Czapka, kurtka, termos, zestaw narzędzi |
| Vouchery | Voucher 100 PLN, 250 PLN na produkty |
| Produkty | Próbka paszy Premium 5kg |
| Doświadczenia | Szkolenie online |

### 4.3 Typy odbioru nagród

| Typ | Opis |
|-----|------|
| `distributor` | Odbiór u dystrybutora |
| `soymax` | Odbiór w siedzibie SOYMAX |
| `delivery` | Dostawa kurierem |

**Wymagania produkcyjne:**
- API: pobieranie stanu punktów klienta
- API: lista dostępnych nagród
- API: realizacja wymiany punktów na nagrodę
- System powiadomień o gotowości odbioru
- Integracja z systemem magazynowym (stany nagród)

---

## 5. Panel Administracyjny (`/admin`)

Panel do zarządzania treściami i użytkownikami systemu.

### 5.1 Layout i nawigacja

- Menu boczne (sidebar) z zakładkami
- Responsywny design (desktop-first dla panelu)
- Przycisk powrotu do aplikacji dystrybutora

**Zakładki menu:**
- Produkty
- Dystrybutorzy
- Klienci
- Promocje
- Sprzedaż
- Role i uprawnienia
- Ustawienia

### 5.2 Zarządzanie produktami (`/admin/products`)

**Funkcjonalności:**
- Tabela produktów z wyszukiwarką
- Kolumny: zdjęcie, nazwa, kategoria, cena, białko, waga, status
- Drawer ze szczegółami produktu
- Edycja danych produktu
- Dodawanie nowego produktu
- Usuwanie produktu

### 5.3 Zarządzanie dystrybutorami (`/admin/distributors`)

**Funkcjonalności:**
- Tabela dystrybutorów z wyszukiwarką
- Kolumny: nazwa firmy, NIP, lokalizacja, rabat, klienci, opiekun
- Drawer ze szczegółami (zakładki: Informacje / Wizyty)

**Zakładka Informacje:**
- Pełne dane kontaktowe
- NIP
- Rabat podstawowy + z programu = łączny rabat
- Liczba aktywnych klientów
- Dane przypisanego opiekuna (handlowca)

**Zakładka Wizyty (Timeline):**
- Chronologiczna lista wizyt handlowca
- Każda wizyta: data, notatka, nazwisko handlowca
- Formularz dodawania nowej wizyty
- Zapisywanie wizyt w localStorage

### 5.4 Zarządzanie klientami (`/admin/clients`)

**Funkcjonalności:**
- Tabela klientów końcowych
- Podgląd szczegółów
- Placeholder do rozbudowy

### 5.5 Zarządzanie promocjami (`/admin/promotions`)

**Funkcjonalności:**
- Tabela promocji z wyszukiwarką
- Kolumny: nazwa, typ, przypisane produkty, rabat/bonus, okres, status
- Typy promocji: produktowa / punktowa / informacyjna
- Przypisane produkty wyświetlane jako badge'e
- Drawer ze szczegółami promocji
- Edycja i usuwanie promocji

### 5.6 Role i uprawnienia (`/admin/roles`)

**Zakładka Role:**
- Lista ról systemowych (Administrator, Handlowiec)
- Liczba uprawnień przypisanych do roli
- Liczba użytkowników z daną rolą
- Drawer ze szczegółami roli i listą uprawnień pogrupowanych tematycznie

**Zakładka Użytkownicy:**
- Lista użytkowników panelu administracyjnego
- Kolumny: imię i nazwisko, email, rola, przypisani dystrybutorzy, status
- Drawer ze szczegółami użytkownika
- Lista przypisanych dystrybutorów (dla handlowców)
- Uprawnienia wynikające z roli

**Uprawnienia systemowe:**
| Kategoria | Uprawnienia |
|-----------|-------------|
| Produkty | podgląd, edycja, usuwanie |
| Dystrybutorzy | podgląd, podgląd własnych, edycja, usuwanie |
| Klienci | podgląd, podgląd własnych, edycja, usuwanie |
| Promocje | podgląd, edycja, usuwanie |
| Sprzedaż | podgląd, podgląd własnych |
| Ustawienia | podgląd, edycja |
| Użytkownicy | podgląd, edycja, usuwanie |
| Role | podgląd, edycja |

**Różnice między rolami:**
| Funkcja | Administrator | Handlowiec |
|---------|---------------|------------|
| Wszystkie dane | Tak | Tylko przypisani dystrybutorzy |
| Edycja produktów | Tak | Nie |
| Zarządzanie promocjami | Tak | Tylko podgląd |
| Zarządzanie użytkownikami | Tak | Nie |
| Dodawanie wizyt | Tak | Tak (u swoich dystrybutorów) |

### 5.7 Sprzedaż (`/admin/sales`)
- Placeholder do rozbudowy
- Dashboard z wykresami sprzedaży

### 5.8 Ustawienia (`/admin/settings`)
- Placeholder do rozbudowy
- Konfiguracja systemu

---

## 6. Model danych

### 6.1 Dystrybutor (Distributor)
\`\`\`typescript
interface Distributor {
  id: string
  companyName: string
  nip: string
  address: string
  phone: string
  email: string
  distributorCode: string
  baseDiscount: number
  programDiscount: number
  consultant: Consultant
  registeredClientsCount: number
  activeClientsCount: number
}
\`\`\`

### 6.2 Konsultant (Consultant)
\`\`\`typescript
interface Consultant {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
}
\`\`\`

### 6.3 Klient końcowy (Client)
\`\`\`typescript
interface Client {
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
\`\`\`

### 6.4 Produkt (Product)
\`\`\`typescript
interface Product {
  id: string
  name: string
  description: string
  category: "premium" | "standard" | "bio" | "starter"
  price: number
  weight: string
  proteinContent: string
  imageUrl: string
  inStock: boolean
  features: string[]
}
\`\`\`

### 6.5 Promocja (Promotion)
\`\`\`typescript
interface Promotion {
  id: string
  title: string
  description: string
  fullDescription?: string
  imageUrl: string
  startDate: string
  endDate: string
  type: "product" | "points" | "info"
  multiplier?: number
  discountBonus?: number
  assignedProductIds: string[]
  isActive: boolean
}
\`\`\`

### 6.6 Faktura (Invoice)
\`\`\`typescript
interface Invoice {
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
\`\`\`

### 6.7 Role i użytkownicy
\`\`\`typescript
type UserRole = "admin" | "salesperson"

interface Role {
  id: string
  name: string
  displayName: string
  description: string
  permissions: string[]
}

interface AdminUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: UserRole
  assignedDistributorIds: string[]
  isActive: boolean
  createdAt: string
}
\`\`\`

### 6.8 Wizyta (Visit)
\`\`\`typescript
interface Visit {
  id: string
  distributorId: string
  salespersonId: string
  date: string
  note: string
  createdAt: string
}
\`\`\`

### 6.9 Nagroda i wymiana (Reward, Redemption)
\`\`\`typescript
interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  imageUrl: string
  category: "gadget" | "voucher" | "product" | "experience"
  pickupType: "distributor" | "soymax" | "delivery"
  inStock: boolean
}

interface Redemption {
  id: string
  clientId: string
  rewardId: string
  rewardName: string
  pointsSpent: number
  status: "pending" | "ready" | "collected"
  redeemedAt: string
  pickupType: "distributor" | "soymax" | "delivery"
}
\`\`\`

### 6.10 Progi rabatowe
\`\`\`typescript
const DISCOUNT_THRESHOLDS = [
  { minClients: 0, discount: 0 },
  { minClients: 10, discount: 1 },
  { minClients: 25, discount: 2 },
  { minClients: 50, discount: 3 },
]
\`\`\`

---

## 7. Integracje zewnętrzne

| System | Cel | Priorytet |
|--------|-----|-----------|
| **Comarch ERP** | Faktury, zamówienia, dane dystrybutorów | Wysoki |
| **SMS Gateway** | Wysyłka linków aktywacyjnych SMS | Wysoki |
| **Email Service** | Wysyłka linków aktywacyjnych email | Wysoki |
| **Push Notifications** | Powiadomienia o promocjach, nagrodach | Średni |
| **Analytics** | Śledzenie użycia aplikacji | Niski |

---

## 8. Wymagania niefunkcjonalne

### 8.1 Wydajność
- Czas ładowania strony: < 3s
- Czas odpowiedzi API: < 500ms
- Obsługa offline (PWA cache)

### 8.2 Bezpieczeństwo
- HTTPS obligatoryjne
- Autoryzacja JWT/OAuth2
- Walidacja danych wejściowych
- CORS policy
- Row Level Security dla danych użytkowników

### 8.3 Dostępność
- WCAG 2.1 AA
- Obsługa screen readerów
- Minimum kontrast 4.5:1

### 8.4 Responsywność
- Mobile-first (320px+) - aplikacja dystrybutora i klienta
- Tablet (768px+)
- Desktop (1024px+) - panel administracyjny

---

## 9. Stack technologiczny (rekomendowany)

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI:** shadcn/ui + Tailwind CSS
- **State:** React hooks + localStorage (POC) / Zustand/SWR (prod)
- **Forms:** React Hook Form + Zod
- **QR Code:** qrcode.react

### Backend
- **API:** Next.js API Routes / Node.js
- **Baza danych:** PostgreSQL / Supabase
- **Autoryzacja:** NextAuth.js / Clerk / Supabase Auth
- **Storage:** Vercel Blob / S3

### Infrastruktura
- **Hosting:** Vercel
- **CDN:** Vercel Edge Network
- **Monitoring:** Vercel Analytics / Sentry

---

## 10. Zakres POC vs Produkcja

| Funkcjonalność | POC | Produkcja |
|----------------|-----|-----------|
| Logowanie | Mock (1 przycisk) | Pełna autoryzacja |
| Dane | localStorage | Baza danych |
| SMS/Email | Symulacja | Prawdziwa wysyłka |
| Faktury PDF | Alert z info | Pobieranie plików |
| Promocje | Statyczne dane | CMS / Admin panel |
| Ranking | Brak | Pełna implementacja |
| Profil | Brak | Pełna edycja |
| Push notifications | Brak | FCM / OneSignal |
| Role i uprawnienia | localStorage | Baza + middleware |
| Wizyty handlowców | localStorage | Baza + kalendarz |
| System nagród | localStorage | Baza + integracja magazyn |

---

## 11. Harmonogram sugerowany

| Faza | Zakres | Czas |
|------|--------|------|
| **Faza 1** | Backend API (auth, CRUD) | 2-3 tyg |
| **Faza 2** | Integracja Comarch (faktury, dystrybutorzy) | 2-3 tyg |
| **Faza 3** | SMS/Email gateway + powiadomienia | 1-2 tyg |
| **Faza 4** | Panel admina (produkty, promocje, role) | 2-3 tyg |
| **Faza 5** | Aplikacja klienta końcowego (nagrody) | 1-2 tyg |
| **Faza 6** | Testy, poprawki, deploy | 1-2 tyg |

**Szacowany czas całkowity:** 10-15 tygodni

---

## 12. Pliki projektu POC

### Struktura
\`\`\`
app/
├── page.tsx                              # Logowanie
├── layout.tsx                            # Root layout
├── globals.css                           # Style globalne
├── (app)/
│   ├── layout.tsx                        # Layout z nawigacją
│   ├── dashboard/page.tsx                # Dashboard
│   ├── clients/
│   │   ├── page.tsx                      # Lista klientów
│   │   └── register/page.tsx             # Rejestracja klienta
│   ├── invoices/page.tsx                 # Faktury
│   ├── products/page.tsx                 # Katalog produktów
│   ├── promotions/[id]/page.tsx          # Szczegóły promocji
│   └── customer-account/page.tsx         # Konto klienta końcowego
├── (admin)/admin/
│   ├── layout.tsx                        # Layout panelu admin
│   ├── page.tsx                          # Redirect do produktów
│   ├── products/page.tsx                 # Zarządzanie produktami
│   ├── distributors/page.tsx             # Zarządzanie dystrybutorami
│   ├── clients/page.tsx                  # Zarządzanie klientami
│   ├── promotions/page.tsx               # Zarządzanie promocjami
│   ├── sales/page.tsx                    # Raporty sprzedaży
│   ├── roles/page.tsx                    # Role i uprawnienia
│   └── settings/page.tsx                 # Ustawienia

components/
├── bottom-nav.tsx                        # Nawigacja dolna
├── discount-card.tsx                     # Karta rabatu
├── client-card.tsx                       # Karta klienta
├── consultant-card.tsx                   # Dane konsultanta
├── quick-actions.tsx                     # Szybkie akcje
├── promotion-carousel.tsx                # Karuzelka promocji
├── stats-summary.tsx                     # Statystyki
├── invoices-list.tsx                     # Lista faktur
├── products-catalog.tsx                  # Katalog produktów
├── product-card.tsx                      # Karta produktu
├── admin/
│   ├── admin-sidebar.tsx                 # Menu boczne admina
│   ├── products-table.tsx                # Tabela produktów
│   ├── distributors-table.tsx            # Tabela dystrybutorów (z wizytami)
│   ├── promotions-table.tsx              # Tabela promocji
│   └── roles-table.tsx                   # Tabela ról i użytkowników

lib/
├── types.ts                              # Definicje TypeScript
├── mock-data.ts                          # Dane mockowe
├── storage.ts                            # Obsługa localStorage
\`\`\`

---

## 13. Kontakt

**Projekt:** SOYMAX - Aplikacja Lojalnościowa  
**Wersja dokumentu:** 2.0  
**Data:** Styczeń 2026
