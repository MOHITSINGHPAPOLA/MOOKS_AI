# MOOKS_AI       

**A lightweight React + TypeScript app for generating personalized book & movie recommendations.**


## Overview

MOOKS_AI is a single-page application built with **Vite**, **React**, and **TypeScript**. The app collects user preferences (content type, genres, additional notes) and requests structured recommendations (title, creator, year, genres, description, reasoning, rating) from a serverless endpoint. The frontend is feature-complete in this repository; the Supabase Edge Function intended to generate recommendations is present as a folder but currently contains a stub and needs to be implemented or connected to an external recommendation service.

## Features

* Interactive search form for `movie` or `book` recommendations
* Genre selection and free-text notes input
* Clean, componentized UI built with Tailwind CSS and shadcn-style primitives
* Client-side data fetching via `fetch()` and state management via `@tanstack/react-query`
* Toast notifications and accessible UI components

## Tech stack

* Vite (dev server & build)
* React (function components, hooks)
* TypeScript
* Tailwind CSS
* shadcn-style UI primitives (components in `src/components/ui/`)
* react-query (`@tanstack/react-query`) for async state
* react-hook-form + zod (form handling & validation)
* Sonner for toasts
* Lucide icons

## Quick start (Development)

**Prerequisites**

* Node 18+ (recommended)
* npm, pnpm, or yarn

**Install and run locally**

```bash
# install dependencies
npm install

# start dev server
npm run dev

# build for production
npm run build

# preview production build locally
npm run preview

# run linter
npm run lint
```

> The app expects certain environment variables (see below) for calling the Supabase function. If you do not have a backend ready, you can mock the endpoint or skip the recommendation call while developing UI.

## Environment variables

Create a `.env` file (or set env vars in your environment) with the following variables used by the frontend:

```
VITE_SUPABASE_URL=https://<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-publishable-key>
```

> These are only needed if you want the frontend to call the Supabase function. If the backend is not available, the UI will either show an error toast or you can implement a mock endpoint for local testing.

## API contract (expected)

The frontend posts to the Supabase Edge Function endpoint: `${VITE_SUPABASE_URL}/functions/v1/recommend` with a JSON body containing the form values. The frontend expects a JSON response shaped like:

```json
{
  "recommendations": [
    {
      "title": "string",
      "creator": "string",
      "year": 2024,
      "genres": ["string"],
      "description": "string",
      "reasoning": "string",
      "rating": 4.5
    }
  ]
}
```

## Project structure (important files)

```
MOOKS_AI/      
├─ src/
│  ├─ App.tsx           # App entry, routing, react-query provider
│  ├─ main.tsx          # Vite entry
│  ├─ pages/Index.tsx   # Main page with SearchForm + Results
│  ├─ components/       # UI components (Header, Footer, SearchForm, Results...)
│  └─ components/ui/    # UI primitives  
├─ supabase/
│  └─ functions/recommend/  # Supabase function (stub) — implement here
├─ package.json
├─ tailwind.config.ts
└─ vite.config.ts
```

## Notes about the backend

* The repository contains `supabase/functions/recommend/` with configuration files, but the function implementation (`index.ts`) is currently empty because we point the frontend at an external API that returns the expected JSON shape.
* Recommended responsibilities of the function:

  * validate the incoming payload
  * call an LLM or a recommendation engine, or query a dataset
  * return a stable, structured JSON response matching the contract above
  * secure any API keys via Supabase secrets (do not hardcode them)

## Development tips

* Use `npm run dev` for fast local iteration with Vite’s HMR.
* When adding new UI components, follow the patterns in `src/components/ui/` to keep styling and accessibility consistent.
* Use `react-query` for server state and caching of recommendation responses.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Run tests / lint locally
4. Submit a PR with a clear description of changes

