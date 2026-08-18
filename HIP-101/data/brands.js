/* HIP-101 — branding data (generated from Google Sheet `branding` tab).
   Loaded as window.BRANDS. Each key = ?id= value.
   Colors, fonts, hero and message drive the whole prototype dynamically. */
window.BRANDS = {
  generic: {
    name: "Twoja Kawiarnia", short: "Twoja Sieć", locations: 30,
    colors: { main: "#1F2A44", accent: "#E0A458", dark: "#141821", neutral: "#F4F1EA", palette: ["#1F2A44", "#E0A458", "#6B7280", "#141821", "#F4F1EA"] },
    font: { heading: "Playfair Display", body: "Inter" },
    cta: { text: "Zamów i odbierz", bg: "#1F2A44", color: "#FFFFFF" },
    hero: "Zamów naprzód. Odbierz bez kolejki.", message: "Kawa i wypieki gotowe na Twoją godzinę — płatność z telefonu, lojalność w środku.",
    focus: "coffee", signature: { name: "Kawa dnia + rogalik", price: 18 },
    pains: [
      { screen: "menu", quote: "W godzinach szczytu kolejka zniechęca gości.", solve: "Zamówienie z wyprzedzeniem = brak kolejki." },
      { screen: "loyalty", quote: "Dane o gościu zostają u operatora aplikacji.", solve: "First-party profil należy do sieci." }
    ]
  },
  sowa: {
    name: "Cukiernia Sowa", short: "Sowa", locations: 170,
    colors: { main: "#5B3A29", accent: "#C9A15A", dark: "#2A1810", neutral: "#F4EEE6", palette: ["#5B3A29", "#C9A15A", "#8A6D3B", "#2A1810", "#F4EEE6"] },
    font: { heading: "Playfair Display", body: "Lato" },
    cta: { text: "Zamów z odbiorem", bg: "#5B3A29", color: "#FFFFFF" },
    hero: "Z tradycją od 1946 roku", message: "Ulubione wypieki zamówione z wyprzedzeniem — odbiór bez kolejki.",
    focus: "bakery", signature: { name: "Sernik Sowy", price: 15 },
    pains: [
      { screen: "cart", quote: "„...po niemal pół godzinie kelnerka poinformowała, że ciast nie ma”", solve: "Rezerwacja z wyprzedzeniem gwarantuje dostępność." },
      { screen: "confirm", quote: "„obsługa jakby zaspana, myliła się przy zamówieniu”", solve: "Cyfrowy paragon pozycyjny = zero pomyłek na wydaniu." }
    ]
  },
  putka: {
    name: "Putka", short: "Putka", locations: 100,
    colors: { main: "#A20F2B", accent: "#5D921E", dark: "#232323", neutral: "#ECE6DA", palette: ["#A20F2B", "#5D921E", "#ECCABE", "#ECE6DA", "#232323"] },
    font: { heading: "Poppins", body: "Nunito Sans" },
    cta: { text: "Zamów i odbierz", bg: "#A20F2B", color: "#FFFFFF" },
    hero: "Lekka chwila przyjemności!", message: "Świeże pieczywo zarezerwowane na Twoją godzinę — bez czekania.",
    focus: "bakery", signature: { name: "Chleb na zakwasie", price: 9 },
    pains: [
      { screen: "menu", quote: "Poranny ruch = kolejka po pieczywo.", solve: "Zamów w aplikacji, odbierz z półki „na już”." },
      { screen: "pickup", quote: "„Nie mrozimy ciasta” — świeżość ma okno czasowe.", solve: "Wybór godziny odbioru dopasowuje wypiek do popytu." }
    ]
  },
  wedel: {
    name: "Pijalnie Czekolady E.Wedel", short: "E.Wedel", locations: 33,
    colors: { main: "#C8102E", accent: "#C9A24B", dark: "#3A0D12", neutral: "#F5EFE7", palette: ["#C8102E", "#C9A24B", "#6A1B1A", "#3A0D12", "#F5EFE7"] },
    font: { heading: "Montserrat", body: "Lora" },
    cta: { text: "Zamów w Pijalni", bg: "#C8102E", color: "#FFFFFF" },
    hero: "Poczuj magię słodkości", message: "Twoja czekolada gotowa na czas — bez kolejki w Pijalni.",
    focus: "chocolate", signature: { name: "Czekolada do picia", price: 22 },
    pains: [
      { screen: "confirm", quote: "„na croissanta czekałam ponad 40 minut... inni klienci wchodzili i wychodzili”", solve: "Odbiór na czas — gość nie rezygnuje w kolejce." },
      { screen: "cart", quote: "„przyniesiono nie te pralinki”", solve: "Zamówienie pozycyjne eliminuje pomyłki." }
    ]
  },
  etno: {
    name: "Etno Cafe", short: "Etno", locations: 30,
    colors: { main: "#2B2422", accent: "#C0603A", dark: "#171311", neutral: "#EFE7DD", palette: ["#2B2422", "#C0603A", "#93BEB6", "#F2C1B6", "#EFE7DD"] },
    font: { heading: "Inter", body: "Inter" },
    cta: { text: "Zamów kawę", bg: "#C0603A", color: "#FFFFFF" },
    hero: "Po prostu dobra kawa", message: "Ulubiona kawa specialty zamówiona z aplikacji — odbiór od ręki.",
    focus: "coffee", signature: { name: "Wroasters Flat White", price: 16 },
    pains: [
      { screen: "menu", quote: "„czekaliśmy bardzo długo — trzy kelnerki rozmawiały za ladą”", solve: "Zamówienie w aplikacji omija wąskie gardło na kasie." },
      { screen: "loyalty", quote: "Obecna appka lojalnościowa: ocena 2,2 w sklepach.", solve: "Własny, dopracowany produkt + dane gościa." }
    ]
  },
  oskroba: {
    name: "Piekarnia Oskroba", short: "Oskroba", locations: 200,
    colors: { main: "#0B2E13", accent: "#D29E7A", dark: "#10240F", neutral: "#F2ECE1", palette: ["#0B2E13", "#D29E7A", "#5D921E", "#10240F", "#F2ECE1"] },
    font: { heading: "Oswald", body: "Alegreya" },
    cta: { text: "Zamów pieczywo", bg: "#0B2E13", color: "#FFFFFF" },
    hero: "Od ziarenka do bochenka", message: "Zarezerwuj świeży chleb na popołudnie — będzie czekał na Ciebie.",
    focus: "bakery", signature: { name: "Chleb razowy bez drożdży", price: 11 },
    pains: [
      { screen: "pickup", quote: "„po południu są już pustki, a wracający z pracy chcieliby kupić pieczywo”", solve: "Rezerwacja na wieczór = niesprzedany popyt odzyskany." },
      { screen: "menu", quote: "Ulubiony bochenek bywa wyprzedany.", solve: "Zamów rano, odbierz gdy Ci pasuje." }
    ]
  },
  blikle: {
    name: "A.Blikle", short: "Blikle", locations: 25,
    colors: { main: "#0D2340", accent: "#8C734C", dark: "#11151C", neutral: "#FFFEF9", palette: ["#0D2340", "#8C734C", "#B79A5B", "#11151C", "#FFFEF9"] },
    font: { heading: "Cormorant Garamond", body: "Nunito Sans" },
    cta: { text: "Zamów online", bg: "#0D2340", color: "#FFFFFF" },
    hero: "Ręcznie zdobione dzieło sztuki", message: "Pączki i torty zamówione z wyprzedzeniem — odbiór bez kolejki.",
    focus: "bakery", signature: { name: "Pączek Blikle", price: 8 },
    pains: [
      { screen: "confirm", quote: "„zamówienie przez uber eats... ciastka niezdatne do spożycia”", solve: "Własny kanał zamówień zamiast obcej platformy." },
      { screen: "cart", quote: "„dostać je tak upchnięte... połowa lukru na papierku”", solve: "Odbiór własny z dedykowanej półki chroni jakość." }
    ]
  },
  lubaszka: {
    name: "Piekarnie Lubaszka", short: "Lubaszka", locations: 30,
    colors: { main: "#062B5A", accent: "#DCC59F", dark: "#241C10", neutral: "#F9F7F7", palette: ["#062B5A", "#DCC59F", "#E25454", "#A5D576", "#241C10"] },
    font: { heading: "Cormorant", body: "Heebo" },
    cta: { text: "Zamów wypieki", bg: "#062B5A", color: "#FFFFFF" },
    hero: "MIŁOŚĆ DO CHLEBA", message: "Chleb na zakwasie i śniadania zamówione naprzód — bez kolejki w porannym szczycie.",
    focus: "bakery", signature: { name: "Chleb na zakwasie", price: 10 },
    pains: [
      { screen: "menu", quote: "„przy dużym ruchu trzeba chwilkę poczekać”", solve: "Zamówienie z wyprzedzeniem zdejmuje szczyt z kasy." },
      { screen: "pickup", quote: "Śniadania mają godziny szczytu.", solve: "Wybór okna odbioru wygładza ruch." }
    ]
  },
  gcn: {
    name: "Green Caffè Nero", short: "GCN", locations: 40,
    colors: { main: "#14513F", accent: "#B99653", dark: "#1C150F", neutral: "#F3EFE6", palette: ["#14513F", "#B99653", "#3B200C", "#1C150F", "#F3EFE6"] },
    font: { heading: "Playfair Display", body: "Work Sans" },
    cta: { text: "Zamów i odbierz", bg: "#14513F", color: "#FFFFFF" },
    hero: "Twoja Kawa Zawsze Z Tobą", message: "Zamów kawę z wyprzedzeniem i odbierz bez kolejki — z Twoimi danymi, nie operatora.",
    focus: "coffee", signature: { name: "Single Origin Flat White", price: 17 },
    pains: [
      { screen: "loyalty", quote: "Obecna appka (yoyowallet) trzyma dane gościa u operatora.", solve: "Własny asset = first-party dane i pełna kontrola." },
      { screen: "confirm", quote: "„...tracicie stałych klientów”", solve: "Płynny odbiór buduje lojalność, nie frustrację." }
    ]
  },
  grycan: {
    name: "Grycan", short: "Grycan", locations: 150,
    colors: { main: "#7A1F0C", accent: "#C48A6A", dark: "#2A120A", neutral: "#F6EDE2", palette: ["#7A1F0C", "#C48A6A", "#A68966", "#2A120A", "#F6EDE2"] },
    font: { heading: "Poppins", body: "Nunito Sans" },
    cta: { text: "Zamów lody", bg: "#7A1F0C", color: "#FFFFFF" },
    hero: "Lody to nasza życiowa pasja", message: "Ulubione lody i desery zarezerwowane na Twoją godzinę — bez stania w kolejce.",
    focus: "icecream", signature: { name: "Deser lodowy rodzinny", price: 24 },
    pains: [
      { screen: "menu", quote: "Sezonowy szczyt = długie kolejki po lody.", solve: "Zamów naprzód i odbierz bez czekania." },
      { screen: "loyalty", quote: "„Mój Grycan” to dziś tylko punkty.", solve: "Order-ahead + dane w jednym własnym produkcie." }
    ]
  },
  goraco: {
    name: "Gorąco Polecam", short: "Gorąco", locations: 100,
    colors: { main: "#C0392B", accent: "#F0A92B", dark: "#30261C", neutral: "#F4ECE0", palette: ["#C0392B", "#F0A92B", "#6DAC97", "#30261C", "#F4ECE0"] },
    font: { heading: "Poppins", body: "Poppins" },
    cta: { text: "Zamów na wynos", bg: "#C0392B", color: "#FFFFFF" },
    hero: "Smaki z piekarni", message: "Kawa i kanapka zamówione z telefonu — odbiór w biegu, bez kolejki w lunchu.",
    focus: "bakery", signature: { name: "Kanapka + kawa 100% arabica", price: 21 },
    pains: [
      { screen: "cart", quote: "„w kanapce z jajkiem znajdziesz słownie trzy plasterki jajka”", solve: "Zamówienie pozycyjne = jasny, powtarzalny skład." },
      { screen: "confirm", quote: "Format biurowy — lunch w 15 minut.", solve: "Odbiór na czas, płatność z telefonu, zero kolejki." }
    ]
  }
};
