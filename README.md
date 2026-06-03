# LYNK

LYNK er en React/Vite webapp, hvor man kan oprette events, udforske events og
tilmelde sig events. Data gemmes i Supabase.

## Kom I Gang

Installer dependencies:

```bash
npm install
```

Start udviklingsserveren:

```bash
npm run dev
```

Appen kører typisk på:

```text
http://localhost:5173
```

Hvis porten er optaget, vælger Vite automatisk en anden port.

## Supabase

Projektet kræver en `.env` fil i roden af projektet.

Brug disse værdier:

```env
VITE_SUPABASE_URL=https://rlidpblwwymcusbfgbmr.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_luRac4nRnaCYyY0GXo48bQ__X54G094
VITE_DEMO_USER_ID=11111111-1111-4111-8111-111111111111
```

`VITE_DEMO_USER_ID` bruges som fast demo-bruger, fordi projektet ikke har login.

## Scripts

```bash
npm run dev      # start udviklingsserver
npm run build    # lav production build
npm run preview  # preview production build lokalt
npm run lint     # kør eslint
```

## Funktioner

- Opret, rediger og slet events
- Udforsk events
- Tilmeld events
- Se events du har oprettet
- Se events du deltager i
- Tilføj tags til events
- Gem events og tilmeldinger i Supabase
