# SOYMAX - Lista Funkcjonalności Aplikacji

## Aplikacja Dystrybutora (Mobile-first)

### Logowanie i Autoryzacja
- Logowanie do aplikacji - uwierzytelnienie użytkownika (dystrybutora)
- Wylogowanie z aplikacji - zakończenie sesji użytkownika
- Przekierowanie do dashboardu po zalogowaniu

### Dashboard
- Wyświetlanie aktualnego poziomu rabatu specjalnego
- Wyświetlanie postępu do kolejnego progu rabatowego
- Podgląd liczby zarejestrowanych klientów (aktywnych/wszystkich)
- Wyświetlanie karuzeli aktywnych promocji
- Podgląd danych przypisanego konsultanta (telefon, email)
- Szybkie akcje nawigacyjne (dodaj klienta, lista klientów, faktury)
- Podgląd bonusów z aktywnych promocji (drawer z mnożnikami i rabatami)

### Zarządzanie Klientami
- Wyświetlanie listy klientów w formie kart
- Wyszukiwanie klientów po imieniu, nazwisku, telefonie, emailu
- Filtrowanie klientów wg statusu (wszyscy/aktywni/nieaktywni)
- Sortowanie klientów (najnowsi, alfabetycznie, wg punktów)
- Wyświetlanie statystyk zbiorczych klientów
- Podgląd szczegółów klienta (punkty, data rejestracji, ostatnie zakupy)

### Rejestracja Klientów
- Rejestracja klienta przez formularz (imię, telefon, email)
- Wybór metody wysyłki linku aktywacyjnego (SMS/Email)
- Generowanie kodu QR do samodzielnej rejestracji klienta
- Wyświetlanie unikalnego linku rejestracyjnego powiązanego z dystrybutorem
- Potwierdzenie wysłania linku aktywacyjnego

### Faktury
- Wyświetlanie listy faktur w formie galerii kart
- Wyszukiwanie faktur po numerze, dacie, kwocie
- Podgląd szczegółów faktury (numer, data, kwota, status)
- Pobieranie faktury w formacie PDF
- Wyświetlanie statusu płatności (opłacona/oczekująca/przeterminowana)

### Katalog Produktów
- Wyświetlanie listy produktów w formie kart
- Wyszukiwanie produktów po nazwie
- Filtrowanie produktów wg kategorii
- Podgląd szczegółów produktu (opis, skład, cena, waga)
- Wyświetlanie cech produktu (badge'e)

### Promocje
- Przeglądanie aktywnych promocji na karuzeli
- Podgląd szczegółów promocji (opis, grafika, bonus)
- Przystąpienie do promocji (CTA "Weź udział")
- Wyświetlanie bonusów z promocji (mnożniki punktów, rabaty)
- Zapisywanie uczestnictwa w promocjach

### Nawigacja i Menu
- Dolny pasek nawigacji (Dashboard, Klienci, Faktury, Produkty, Więcej)
- Menu rozwijane "Więcej" (Profil, Ranking, Pomoc, Panel Admin)
- Nawigacja między ekranami aplikacji

---

## Panel Administracyjny (Desktop)

### Nawigacja Panelu
- Menu boczne z zakładkami (Produkty, Dystrybutorzy, Klienci, Promocje, Sprzedaż, Ustawienia)
- Przełączanie między sekcjami panelu
- Powrót do aplikacji dystrybutora

### Zarządzanie Produktami
- Wyświetlanie listy produktów w tabeli
- Wyszukiwanie produktów po nazwie
- Podgląd szczegółów produktu w drawer'ze (nazwa, opis, kategoria, cena, waga, białko)
- Edycja danych produktu
- Usuwanie produktu
- Dodawanie nowego produktu
- Wyświetlanie grafiki produktu

### Zarządzanie Dystrybutorami
- Wyświetlanie listy dystrybutorów w tabeli
- Wyszukiwanie dystrybutorów po nazwie, NIP, lokalizacji
- Podgląd szczegółów dystrybutora w drawer'ze
- Wyświetlanie danych kontaktowych (adres, telefon, email, NIP)
- Wyświetlanie poziomu rabatu (podstawowy + z programu)
- Wyświetlanie liczby przypisanych klientów
- Wyświetlanie przypisanego opiekuna klienta
- Edycja danych dystrybutora
- Usuwanie dystrybutora

### Zarządzanie Klientami (Admin)
- Wyświetlanie listy klientów końcowych
- Podgląd szczegółów klienta
- Placeholder do rozbudowy

### Zarządzanie Promocjami
- Wyświetlanie listy promocji w tabeli
- Wyszukiwanie promocji po nazwie
- Podgląd szczegółów promocji w drawer'ze
- Wyświetlanie typu promocji (produktowa/punktowa/informacyjna)
- Wyświetlanie przypisanych produktów (badge'e)
- Wyświetlanie rabatu/bonusu (% lub mnożnik punktów)
- Wyświetlanie okresu trwania promocji
- Wyświetlanie statusu promocji (aktywna/nieaktywna)
- Edycja promocji
- Usuwanie promocji
- Dodawanie nowej promocji

### Sprzedaż (Raporty)
- Placeholder do rozbudowy - dashboard sprzedaży

### Ustawienia
- Placeholder do rozbudowy - konfiguracja systemu

---

## Funkcjonalności Techniczne

### Persystencja Danych
- Zapisywanie danych w localStorage
- Inicjalizacja danymi mockowymi przy pierwszym uruchomieniu
- Automatyczny zapis stanu przy zmianach
- Odczyt danych między sesjami

### Interfejs Użytkownika
- Responsywny design mobile-first
- Komponenty shadcn/ui
- Drawer'y (Sheet) do podglądu szczegółów
- Karuzele i galerie kart
- Tabele z sortowaniem i wyszukiwaniem
- Formularze z walidacją
- Komunikaty potwierdzające akcje
- Statusy z badge'ami kolorowymi
- Progress bar do wizualizacji postępu

---

## Podsumowanie Ilościowe

| Kategoria | Liczba funkcjonalności |
|-----------|------------------------|
| Logowanie i Autoryzacja | 3 |
| Dashboard | 7 |
| Zarządzanie Klientami | 6 |
| Rejestracja Klientów | 5 |
| Faktury | 5 |
| Katalog Produktów | 5 |
| Promocje | 5 |
| Nawigacja i Menu | 3 |
| Panel Admin - Produkty | 7 |
| Panel Admin - Dystrybutorzy | 9 |
| Panel Admin - Klienci | 3 |
| Panel Admin - Promocje | 11 |
| Panel Admin - Sprzedaż | 1 |
| Panel Admin - Ustawienia | 1 |
| Funkcjonalności Techniczne | 11 |
| **RAZEM** | **82** |
