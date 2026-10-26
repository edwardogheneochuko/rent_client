# RentRight Naija — Client (frontend)

React 19 + Vite + Tailwind CSS v4 + React Router + Axios + React Hook Form.
The backend API lives separately in `../server`.

## Run it

You need the API running first (see `../server/README.md`):

```bash
# terminal 1: the API
cd server
npm run seed      # sample data (first time only)
npm run dev       # http://localhost:5000

# terminal 2: the frontend
cd client
npm install
npm run dev       # http://localhost:5173
```

In development, Vite forwards every `/api/...` request to `http://localhost:5000`
(see `vite.config.js`), so you don't need a `.env` file. For production, copy `.env.example` to `.env`
and set `VITE_API_URL` to your Render URL (Phase 6).

```bash
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

## Folder structure

| Path | What lives there |
| ---- | ---------------- |
| `src/main.jsx` | Entry point: router + auth provider |
| `src/App.jsx` | Every route (page URL); pages are lazy-loaded |
| `src/index.css` | Tailwind import, green theme colours, reusable classes (`btn`, `input`, `card`) |
| `src/api/` | One file per API area; `client.js` holds the shared Axios instance and error helpers |
| `src/context/AuthContext.jsx` | Who's signed in: `useAuth()` gives `user`, `login`, `register`, `logout` |
| `src/hooks/` | `useAsync` (load data, cancel stale requests) and `useAreas` (cached area list) |
| `src/components/layout/` | Header (with mobile menu), footer, page frame |
| `src/components/ui/` | Small building blocks: form field, alert, spinner, pagination, rating, lazy image |
| `src/components/listings/`, `home/` | Listing card, filters, home search bar, scam check box |
| `src/pages/` | One file per page |
| `src/utils/` | Naira/phone formatting, option lists, Cloudinary image resizing |

## Built so far (Phase 3)

- Home: search (area, type, budget), 6 newest listings, inline scam check
- Listings: filters kept in the URL (shareable, back button works), sort, pagination, skeleton loading
- Sign in / sign up, with server validation errors shown under the right field
- Protected routes: `/dashboard` and `/scams/report` send guests to sign in, `/admin` is admin-only
- Pages for Phases 4–5 show a "coming soon" placeholder

## Keeping it light on mobile data

- System fonts (no font downloads) and inline SVG icons (no icon library)
- Each page's code is downloaded only when visited (`React.lazy`)
- Images load only when scrolled into view and are resized by Cloudinary
- Lists are paginated (12 per page); filters apply on "Show results", not on every keystroke
