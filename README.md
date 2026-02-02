# Full Stack Starter Code (React + Express + MongoDB)

A minimal full-stack boilerplate with:

- **Frontend**: React + Vite + TypeScript + Tailwind (v4) + shadcn/ui, React Router v7, Redux Toolkit (RTK + RTK Query), optional `socket.io-client` wiring.
- **Backend**: Node.js + TypeScript (ESM) + Express + MongoDB (Mongoose).

This README documents what’s actually implemented in this repo today (scripts, env vars, routes, and project structure).

---

## Prerequisites

- **Node.js >= 22** (required by `backend/package.json`).
- **MongoDB** (local instance or MongoDB Atlas cluster).

---

## Repo structure

```
full-stack-starter-code/
  backend/   # Express + Mongoose API
  frontend/  # React + Vite app
```

---

## Environment variables

### Backend (`backend/.env`)

Used in `backend/src/index.ts`:

- **`MONGODB_URI`**: Mongo connection string (required).
- **`FRONTEND_URL`**: Allowed CORS origin (example: `http://localhost:5173`).
- **`PORT`**: Backend port (default: `3000`).

The repo includes a `backend/.env` file with placeholder values. Update it locally before running.

### Frontend (`frontend/.env.development`, `frontend/.env.production`)

Used in `frontend/src/consts/consts.ts`:

- **`VITE_API_URL`**: Base URL for your backend API (example: `http://localhost:3000`).

---

## Quick start (local development)

### 1) Start the backend

```bash
cd backend
npm install
# edit backend/.env (set MONGODB_URI, FRONTEND_URL, PORT)
npm run dev
```

Backend runs on `http://localhost:3000` by default.

Health check:

```bash
curl http://localhost:3000/health
```

### 2) Start the frontend

```bash
cd frontend
npm install
# edit frontend/.env.development (VITE_API_URL)
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

---

## Backend API

Base URL (local): `http://localhost:3000`

### Health

- **GET `/health`** → `{ "ok": true }`

### Users (`/users`)

Implemented in `backend/src/routes/users.ts`.

- **GET `/users`**: list all users
- **GET `/users/:id`**: get user by id
- **POST `/users`**: create a user
  - Body: `{ "email": string, "name": string }`
  - Notes: `email` is unique; duplicates return **409**

Create user example:

```bash
curl -X POST "http://localhost:3000/users" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","name":"Demo User"}'
```

PowerShell example:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/users" -ContentType "application/json" -Body (@{
  email = "demo@example.com"
  name  = "Demo User"
} | ConvertTo-Json)
```

### Posts (`/posts`)

Implemented in `backend/src/routes/posts.ts`.

- **GET `/posts`**: list posts (sorted newest first), with `createdBy` populated (email + name)
- **GET `/posts/:id`**: get post by id (with `createdBy` populated)
- **POST `/posts`**: create a post and link it into the owning user’s `posts[]`
  - Body: `{ "createdBy": string, "title": string, "content": string }`
- **PATCH `/posts/:id`**: update title/content
  - Body: `{ "title"?: string, "content"?: string }`
- **DELETE `/posts/:id`**: delete post and remove it from the owning user’s `posts[]`

Create post example (replace `USER_ID`):

```bash
curl -X POST "http://localhost:3000/posts" \
  -H "Content-Type: application/json" \
  -d '{"createdBy":"USER_ID","title":"Hello","content":"First post"}'
```

PowerShell example:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/posts" -ContentType "application/json" -Body (@{
  createdBy = "USER_ID"
  title     = "Hello"
  content   = "First post"
} | ConvertTo-Json)
```

List posts example:

```bash
curl http://localhost:3000/posts
```

PowerShell example:

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3000/posts"
```

### Data model notes

Defined in:

- `backend/src/models/User.ts`
- `backend/src/models/Post.ts`

Relationship:

- `User.posts[]` holds an array of Post ObjectIds
- `Post.createdBy` references the owning User

Deleting a post also pulls it out of `User.posts[]` (see `DELETE /posts/:id`).

---

## Frontend

### Routing

Routes live in `frontend/src/router/index.ts`:

- `/` → `Home`
- `*` → `NotFound`

The root layout component is `frontend/src/ui/Root.tsx`.

### State management (Redux Toolkit + RTK Query)

Store setup: `frontend/src/store/index.ts`

- Slices:
  - `frontend/src/store/slices/user.slice.ts`
  - `frontend/src/store/slices/counter.slice.ts`
- RTK Query example:
  - `frontend/src/store/apis/pokemon.api.ts` (hits `https://pokeapi.co/api/v2`)
- Typed hooks:
  - `frontend/src/store/hooks/index.ts`

### UI components

- Tailwind CSS (v4) is configured in the frontend.
- shadcn/ui components live under `frontend/src/shadcn/components/ui/`.

### Path aliases

`@/` resolves to `frontend/src` (see `frontend/vite.config.ts` and `frontend/tsconfig*.json`).

---

## Sockets (client-only starter)

There is a Socket.IO **client** provider in `frontend/src/sockets/SocketProvider.tsx`.

To enable connections, add one or more socket server URLs in `frontend/src/ui/Root.tsx`:

- `const socketUrls = useMemo(() => ["https://your-socket-server"], []);`

Then access sockets/statuses via:

- `frontend/src/sockets/useSockets.ts`
- `frontend/src/sockets/useSocketStatuses.ts`

Note: this repo does **not** currently include a Socket.IO server on the backend.

---

## Scripts

### Backend (`backend/package.json`)

```bash
npm run dev        # tsx watch src/index.ts
npm run start      # tsx src/index.ts
npm run build      # tsc (outputs to dist/)
npm run typecheck  # tsc --noEmit
```

### Frontend (`frontend/package.json`)

```bash
npm run dev
npm run build
npm run preview
npm run typecheck
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run check
```

---

## Troubleshooting

- **Mongo connection fails**: ensure `MONGODB_URI` is set and reachable (if using Atlas, your IP/network access must allow the connection).
- **CORS errors**: set `FRONTEND_URL` in `backend/.env` to match the frontend origin (default: `http://localhost:5173`). The backend enables CORS with `credentials: true`.
- **Frontend calling wrong API**: ensure `frontend/.env.development` has `VITE_API_URL=http://localhost:3000` (or your deployed backend URL).
