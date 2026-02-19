# Walkthrough: Modernized Generator Opće Uplatnice

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
3.  **Build for production** (outputs to `docs/` for GitHub Pages):
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
