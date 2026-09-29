# Green Leaf Cafe — React + Fetch API + CRUD

This is the React conversion of the Green Leaf Cafe frontend. It talks to a
real REST API using the `fetch` API for every Create/Read/Update/Delete
operation, and uses **react-router-dom** for page navigation (`useNavigate`,
`NavLink`, nested routes).

Since there's still no Spring Boot backend, a mock REST API is provided via
**json-server**, driven by `db.json`. It serves exactly the endpoints the
project's REST API spec describes (`GET/POST/PUT/DELETE /menu`,
`/orders`, `/reservations`, `/employees`, `/reviews`, `/contacts`).
Swapping in the real backend later just means changing one URL
(`src/api/client.js` → `BASE_URL`, or a `VITE_API_URL` env var) — no
component code needs to change.

## Project structure

```
src/
├── api/
│   ├── client.js        fetch() wrapper (base URL, headers, error handling)
│   └── resources.js      CRUD client factory (menuApi, ordersApi, ...)
├── hooks/
│   └── useResource.js    hook: fetches a resource + exposes create/update/remove
├── config/
│   └── entityConfig.jsx  table columns + form fields per resource (drives Admin CRUD)
├── components/
│   ├── Navbar.jsx         NavLink-based nav bar
│   ├── PublicLayout.jsx   Navbar + <Outlet/> + Footer
│   ├── CrudPanel.jsx      generic admin table + modal, wired to useResource
│   ├── ResourceModal.jsx  generic add/edit form
│   └── ToastContext.jsx   toast notifications
├── pages/
│   ├── Home.jsx           uses useNavigate() for the hero buttons
│   ├── Menu.jsx / Order.jsx / Reserve.jsx / Contact.jsx / Review.jsx
│   └── admin/
│       ├── AdminLayout.jsx  login gate + sidebar (NavLink) + <Outlet/>
│       └── Dashboard.jsx
└── App.jsx               route table (react-router-dom v6)
```

## Run it

```bash
npm install

# Terminal 1 — mock REST API on http://localhost:5000
npm run server

# Terminal 2 — React app on http://localhost:5173
npm run dev
```

Open http://localhost:5173. The admin area is at `/admin`
(password: `admin123`, checked client-side only — this is still a demo,
not real auth).

## Notes

- All data now lives in `db.json` and is served over HTTP — open the
  Network tab in devtools and you'll see real GET/POST/PUT/DELETE calls.
- `npm run build` produces a static production bundle in `dist/`.
- To point at a real backend later, set `VITE_API_URL=http://your-api-host`
  (e.g. in a `.env` file) — every page keeps working unchanged.
