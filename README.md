# Pregled: Modernizirani Generator Opće Uplatnice

**Ova aplikacija je "vibe coded" uz pomoć AI asistenata.**

Aplikaciju možete isprobati ovdje: [https://sdzakic.github.io/generator-opce-uplatnice-v2/](https://sdzakic.github.io/generator-opce-uplatnice-v2/)

Ovaj projekt je forkan s [github.com/knee-cola/generator-opce-uplatnice](https://github.com/knee-cola/generator-opce-uplatnice/).

Ta je aplikacija nadogradnja web aplikacije [github.com/Bikonja/generator-barkoda-uplatnica](https://github.com/Bikonja/generator-barkoda-uplatnica), čiji je autor [Igor Loborec](https://github.com/Bikonja).

2D bar kod je generiran uz pomoć [biblioteke PDF417-js](https://github.com/bkuzmic/pdf417-js), čiji je autor [Boris Kuzmic](https://github.com/bkuzmic).

Ovaj dokument opisuje promjene napravljene radi modernizacije React aplikacije i pruža upute za pokretanje i održavanje.

## Pregled promjena

- **Build sustav**: Migrirano s naslijeđenog Babel-a u pregledniku na **Vite** za brži razvoj i optimizirane produkcijske verzije.
- **Upravljanje stanjem**: Zamijenjen naslijeđeni Redux s **Redux Toolkit-om**.
    - `src/redux/nalogSlice.js`: Sadrži svu logiku za ažuriranje stanja obrasca, čišćenje i učitavanje.
    - `src/redux/store.js`: Konfigurira store.
- **Komponente**: Sve Class komponente pretvorene u **Functional Components** koristeći **Hooks**.
    - `src/hooks/useNalogField.js`: Prilagođeni hook koji upravlja povezivanjem ulaznih polja s Reduxom i logikom validacije.
    - `src/components/form/*`: Modularizirane UI komponente (`TextInput`, `SelectBase`, `Barcode`, itd.).
    - `src/components/LoadDialog.jsx` & `SaveDialog.jsx`: Integrirana logika za lokalnu pohranu i rukovanje datotekama izravno u ovim komponentama.
- **Naslijeđene biblioteke**:
    - `src/lib/BarcodePayment.js`: Refaktorirano u ES modul (uklonjen IIFE, jQuery zamijenjen izvornim JS-om).
    - `src/lib/bcmath-min.js` & `src/lib/pdf417-min.js`: Refaktorirano u ES module s ispravnim exportima/importima.
    - `src/lib/Blob.js`: Uklonjeno (nije potrebno u modernim preglednicima/buildovima).
    - `src/main.jsx`: Očišćeno od globalnih importova s nuspojavama.

## Struktura projekta

```
src/
├── assets/          # Statička imovina (slike)
├── components/      # React komponente
│   ├── form/        # Komponente specifične za obrazac (TextInput, Barcode, itd.)
│   └── ...          # Dijalozi i glavna Forma
├── hooks/           # Prilagođeni React hookovi (useNalogField)
├── lib/             # Biblioteke logike (BarcodePayment, facade, itd.)
├── redux/           # Redux postavke (store, slices)
├── App.jsx          # Glavni izgled aplikacije
├── main.jsx         # Ulazna točka (Provideri, globalni importi)
└── index.css        # Stilovi
```

## Kako pokrenuti

1.  **Instalirajte ovisnosti** (ako niste):
    ```bash
    npm install
    ```
2.  **Pokrenite razvojni poslužitelj**:
    ```bash
    npm run dev
    ```
3.  **Build za produkciju** (izlaz u `dist/` za GitHub Pages):
    ```bash
    npm run build
    ```

## Provjera

- **Unos u obrazac**: Tipkanje u polja treba ažurirati stanje i pokrenuti validaciju (crveni obrubi za neispravan unos).
- **Barkod**: Barkod bi se trebao regenerirati dok tipkate ispravne podatke.
- **Dijalozi**:
    - "Spremi u web preglednik": Treba spremiti u lokalnu pohranu.
    - "Spremi u datoteku": Treba preuzeti JSON datoteku.
    - "Učitaj odabrani nalog": Treba popuniti obrazac iz pohrane.
    - "Učitaj nalog iz datoteke": Treba popuniti obrazac iz učitanog JSON-a.
- **Višestruke uplatnice**:
    - "DODAJ UPLATNICU": Treba dodati novi prazni obrazac ispod postojećeg.
    - "NOVI NALOG (RESET)": Treba resetirati prikaz na jedan prazni obrazac.
    - Uređivanje jednog obrasca ne bi smjelo utjecati na druge (neovisno generiranje barkoda).

---

# Walkthrough: Modernized Generator Opće Uplatnice

**This application was "vibe coded" with the help of AI assistants.**

You can try the live application here: [https://sdzakic.github.io/generator-opce-uplatnice-v2/](https://sdzakic.github.io/generator-opce-uplatnice-v2/)

This project was forked from [github.com/knee-cola/generator-opce-uplatnice](https://github.com/knee-cola/generator-opce-uplatnice/).

That application is an upgrade of the web application [github.com/Bikonja/generator-barkoda-uplatnica](https://github.com/Bikonja/generator-barkoda-uplatnica), authored by [Igor Loborec](https://github.com/Bikonja).

The 2D barcode is generated using the [PDF417-js library](https://github.com/bkuzmic/pdf417-js), authored by [Boris Kuzmic](https://github.com/bkuzmic).

This document outlines the changes made to modernize the React application and provides instructions for running and maintaining it.

## Changes Overview

- **Build System**: Migrated from legacy in-browser Babel to **Vite** for faster development and optimized production builds.
- **State Management**: Replaced legacy Redux with **Redux Toolkit**.
    - `src/redux/nalogSlice.js`: Contains all logic for form state updates, clearing, and loading.
    - `src/redux/store.js`: Configures the store.
- **Components**: Converted all Class components to **Functional Components** with **Hooks**.
    - `src/hooks/useNalogField.js`: Custom hook that handles connecting inputs to Redux and running validation logic.
    - `src/components/form/*`: Modularized UI components (`TextInput`, `SelectBase`, `Barcode`, etc.).
    - `src/components/LoadDialog.jsx` & `SaveDialog.jsx`: Integrated logic for local storage and file handling directly into these components.
- **Legacy Libraries**:
    - `src/lib/BarcodePayment.js`: Refactored to an ES Module (removed IIFE, replaced jQuery with native JS).
    - `src/lib/bcmath-min.js` & `src/lib/pdf417-min.js`: Refactored to ES Modules with proper exports/imports.
    - `src/lib/Blob.js`: Removed (not needed in modern browsers/builds).
    - `src/main.jsx`: Cleaned up to remove global side-effect imports.

## Project Structure

```
src/
├── assets/          # Static assets (images)
├── components/      # React components
│   ├── form/        # Form-specific components (TextInput, Barcode, etc.)
│   └── ...          # Dialogs and main Forma
├── hooks/           # Custom React hooks (useNalogField)
├── lib/             # Logic libraries (BarcodePayment, facade, etc.)
├── redux/           # Redux setup (store, slices)
├── App.jsx          # Main application layout
├── main.jsx         # Entry point (Providers, global imports)
└── index.css        # Styles
```

## How to Run

1.  **Install dependencies** (if not done):
    ```bash
    npm install
    ```
2.  **Start development server**:
    ```bash
    npm run dev
    ```
3.  **Build for production** (outputs to `dist/` for GitHub Pages):
    ```bash
    npm run build
    ```

## Verification

- **Form Input**: Typing in fields should update state and run validation (red borders for invalid input).
- **Barcode**: The barcode should regenerate as you type valid data.
- **Dialogs**:
    - "Spremi u web preglednik": Should save to local storage.
    - "Spremi u datoteku": Should download a JSON file.
    - "Učitaj odabrani nalog": Should populate the form from storage.
    - "Učitaj nalog iz datoteke": Should populate form from uploaded JSON.
- **Multiple Slips**:
    - "DODAJ UPLATNICU": Should add a new empty form below the existing one.
    - "NOVI NALOG (RESET)": Should reset the view to a single empty form.
    - Editing one form should not affect others (independent barcode generation).
