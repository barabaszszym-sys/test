# SOYMAX - Aplikacja Lojalnościowa dla Dystrybutorów

## Opis projektu

Aplikacja mobilna (PWA) dla dystrybutorów firmy SOYMAX, umożliwiająca zarządzanie programem lojalnościowym, rejestrację klientów końcowych oraz śledzenie rabatów i faktur.

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

| Rola | Opis | Szacowana liczba |
|------|------|------------------|
| **Admin/Konsultant** | Pracownicy SOYMAX zarządzający dystrybutorami | ~10 osób |
| **Dystrybutor** | Główni użytkownicy aplikacji | 200-500 |
| **Klient końcowy** | Zarejestrowani przez dystrybutorów | setki/tysiące |

---

## 3. Ekrany aplikacji

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
   - Aktualny procent rabatu (duża cyfra)
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

### 3.6 Szczegóły promocji (`/promotions/[id]`)
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

### 3.7 Ekrany planowane (poza POC)

| Ekran | Ścieżka | Opis |
|-------|---------|------|
| Profil/Ustawienia | `/profile` | Dane dystrybutora, edycja, preferencje |
| Ranking | `/ranking` | TOP dystrybutorów, gamifikacja |
| Promocje (lista) | `/promotions` | Pełna lista wszystkich promocji |
| Pomoc/FAQ | `/help` | Często zadawane pytania, kontakt |

---

## 4. Model danych

### 4.1 Dystrybutor (Distributor)
```typescript
interface Distributor {
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
```

### 4.2 Konsultant (Consultant)
```typescript
interface Consultant {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
}
```

### 4.3 Klient końcowy (Client)
```typescript
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
```

### 4.4 Promocja (Promotion)
```typescript
interface Promotion {
  id: string
  title: string
  description: string
  fullDescription?: string
  imageUrl: string
  startDate: string
  endDate: string
  type: "product" | "points" | "info"
  multiplier?: number // np. 2 dla x2 punkty
  discountBonus?: number // dodatkowy % rabatu
}
```

### 4.5 Faktura (Invoice)
```typescript
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
```

### 4.6 Progi rabatowe
```typescript
const DISCOUNT_THRESHOLDS = [
  { minClients: 0, discount: 0 },
  { minClients: 10, discount: 1 },
  { minClients: 25, discount: 2 },
  { minClients: 50, discount: 3 },
]
```

---

## 5. Integracje zewnętrzne

| System | Cel | Priorytet |
|--------|-----|-----------|
| **Comarch ERP** | Faktury, zamówienia, dane dystrybutorów | Wysoki |
| **SMS Gateway** | Wysyłka linków aktywacyjnych SMS | Wysoki |
| **Email Service** | Wysyłka linków aktywacyjnych email | Wysoki |
| **Push Notifications** | Powiadomienia o promocjach | Średni |
| **Analytics** | Śledzenie użycia aplikacji | Niski |

---

## 6. Wymagania niefunkcjonalne

### 6.1 Wydajność
- Czas ładowania strony: < 3s
- Czas odpowiedzi API: < 500ms
- Obsługa offline (PWA cache)

### 6.2 Bezpieczeństwo
- HTTPS obligatoryjne
- Autoryzacja JWT/OAuth2
- Walidacja danych wejściowych
- CORS policy

### 6.3 Dostępność
- WCAG 2.1 AA
- Obsługa screen readerów
- Minimum kontrast 4.5:1

### 6.4 Responsywność
- Mobile-first (320px+)
- Tablet (768px+)
- Desktop (1024px+)

---

## 7. Stack technologiczny (rekomendowany)

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI:** shadcn/ui + Tailwind CSS
- **State:** React hooks + localStorage (POC) / Zustand/SWR (prod)
- **Forms:** React Hook Form + Zod

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

## 8. Zakres POC vs Produkcja

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

---

## 9. Harmonogram sugerowany

| Faza | Zakres | Czas |
|------|--------|------|
| **Faza 1** | Backend API (auth, CRUD) | 2-3 tyg |
| **Faza 2** | Integracja Comarch (faktury, dystrybutorzy) | 2-3 tyg |
| **Faza 3** | SMS/Email gateway | 1 tyg |
| **Faza 4** | Panel admina (promocje, konsultanci) | 2-3 tyg |
| **Faza 5** | Testy, poprawki, deploy | 1-2 tyg |

**Szacowany czas całkowity:** 8-12 tygodni

---

## 10. Pliki projektu POC

### Struktura
```
app/
├── page.tsx                         # Logowanie
├── layout.tsx                       # Root layout
├── globals.css                      # Style globalne
├── (app)/
│   ├── layout.tsx                   # Layout z nawigacją
│   ├── dashboard/page.tsx           # Dashboard
│   ├── clients/
│   │   ├── page.tsx                 # Lista klientów
│   │   └── register/page.tsx        # Rejestracja klienta
│   ├── invoices/page.tsx            # Faktury
│   └── promotions/[id]/page.tsx     # Szczegóły promocji

components/
├── bottom-nav.tsx                   # Nawigacja dolna
├── discount-card.tsx                # Karta rabatu
├── client-card.tsx                  # Karta klienta
├── consultant-card.tsx              # Dane konsultanta
├── quick-actions.tsx                # Szybkie akcje
├── promotion-carousel.tsx           # Karuzelka promocji
├── stats-summary.tsx                # Statystyki
├── invoices-list.tsx                # Lista faktur

lib/
├── types.ts                         # Definicje TypeScript
├── mock-data.ts                     # Dane mockowe
├── storage.ts                       # Obsługa localStorage
```

---

## 11. Kontakt

**Projekt:** SOYMAX - Aplikacja Lojalnościowa  
**Wersja dokumentu:** 1.0  
**Data:** Styczeń 2026
