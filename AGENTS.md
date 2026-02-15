# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Project Overview

Full-stack TypeScript monorepo designed for hackathons and rapid prototyping:
- **Frontend**: React 19 + Vite + Redux Toolkit + Tailwind CSS v4 + shadcn/ui
- **Backend**: Express 5 + MongoDB/Mongoose + Node.js ESM

Both use TypeScript with strict mode, ESLint (type-aware), and Prettier.

## Quick Start

```bash
# Backend
cd backend && npm install
cp .env.example .env  # Add your MongoDB URI
npm run dev

# Frontend (new terminal)
cd frontend && npm install
cp .env.example .env.development  # Add backend URL
npm run dev
```

## Build / Lint / Dev Commands

Run all commands from the respective directory (`frontend/` or `backend/`):

### Frontend
```bash
npm run dev           # Start Vite dev server
npm run build         # TypeScript compile + Vite build
npm run typecheck     # TypeScript check only (tsc --noEmit)
npm run lint          # ESLint check
npm run lint:fix      # ESLint with auto-fix
npm run format        # Prettier format write
npm run format:check  # Prettier format check
npm run check         # Run typecheck + lint + format:check
```

### Backend
```bash
npm run dev           # Start with hot reload (tsx watch)
npm run start         # Run once (tsx)
npm run build         # Compile TypeScript (tsc)
npm run typecheck     # TypeScript check only (tsc --noEmit)
npm run lint          # ESLint check
npm run lint:fix      # ESLint with auto-fix
```

**Note**: No test framework is configured. To add tests, suggest Jest or Vitest with appropriate configuration.

## Code Style Guidelines

### Formatting (Prettier)
- **Print width**: 100 characters
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Trailing commas**: 
  - Backend: `all`
  - Frontend: `none`
- **Tab width**: 2 spaces (no tabs)
- **Arrow parens**: Always use parentheses
- **End of line**: LF

### TypeScript
- **Strict mode**: Enabled
- **Module**: ESM (`"type": "module"` in package.json)
- **Verbatim module syntax**: Required (use `import type` for type-only imports)
- Path alias: `@/` maps to `src/` (frontend only)
- Unused variables must be prefixed with `_`

### Naming Conventions
- **Files**:
  - Backend: `camelCase.ts` (e.g., `users.controller.ts`, `User.model.ts`)
  - Frontend components: `PascalCase.tsx` (e.g., `Button.tsx`)
  - Frontend types: `*.type.ts` or `*.types.ts`
- **Functions/Variables**: `camelCase`
- **Types/Interfaces**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE` or `camelCase` for module-level

### Imports
- Use explicit `.js` extensions for relative imports in backend (Node ESM requirement)
- Group imports: external packages first, then internal modules
- Use `import type { Foo }` for type-only imports
- Frontend: Use `@/` alias for src-relative imports

### Error Handling
- Backend: Use try/catch in controllers, return appropriate HTTP status codes
- Always log errors with `console.error()` before returning 500 responses
- Frontend: Handle errors in RTK Query or component level with proper UI feedback

## Architecture Patterns

### Backend Patterns (MVC)

```
backend/src/
├── controllers/    # Route handlers (business logic)
├── models/         # Mongoose schemas/models
├── routes/         # Express router definitions
├── types/          # TypeScript interfaces (params/bodies/responses)
├── validators/     # Request validation middleware
└── index.ts        # App bootstrap
```

**Creating a new route:**
1. Define types in `types/` (e.g., `CreateXBody`, `UpdateXBody`)
2. Create validator in `validators/` (validate body/params)
3. Create controller in `controllers/` (business logic)
4. Add route in `routes/` (wire validator + controller)

**Example flow:**
```typescript
// types/example.types.ts
export type CreateExampleBody = { title: string; content: string };

// validators/example.validator.ts
export function validateCreateExample(req: Request, res: Response, next: NextFunction) {
  const { title, content } = req.body as Partial<CreateExampleBody>;
  if (!title || !content) {
    return res.status(400).json({ message: 'title and content are required' });
  }
  return next();
}

// controllers/example.controller.ts
export async function createExample(req: Request, res: Response) {
  try {
    const { title, content } = req.body as CreateExampleBody;
    const created = await ExampleModel.create({ title, content });
    return res.status(201).json(created);
  } catch (_err) {
    console.error(_err);
    return res.status(500).json({ message: 'server error' });
  }
}

// routes/example.routes.ts
examplesRouter.post('/', validateCreateExample, createExample);
```

### Frontend Patterns

```
frontend/src/
├── store/
│   ├── slices/     # Redux Toolkit slices (local state)
│   ├── apis/       # RTK Query APIs (server state)
│   └── hooks/      # Typed Redux hooks
├── ui/
│   ├── pages/      # Route-level pages
│   └── Root.tsx    # Layout wrapper
├── shadcn/
│   └── components/ # UI components
├── types/          # Shared TypeScript types
└── consts/         # Constants
```

**State Management:**
- Use **Redux slices** for local UI state (user preferences, form state)
- Use **RTK Query** for server state (API calls, caching)
- Never mix - keep them separate

**Creating a new API endpoint:**
```typescript
// store/apis/example.api.ts
export const exampleApi = createApi({
  reducerPath: 'exampleApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getExamples: builder.query<Example[], void>({
      query: () => '/examples',
    }),
    createExample: builder.mutation<Example, CreateExampleBody>({
      query: (body) => ({
        url: '/examples',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetExamplesQuery, useCreateExampleMutation } = exampleApi;
```

## Environment Variables

### Backend (`backend/.env`)
```
MONGODB_URI=          # Required: MongoDB connection string
FRONTEND_URL=         # CORS origin (e.g., http://localhost:5173)
PORT=                 # Server port (default: 3000)
```

### Frontend (`frontend/.env.development` / `.env.production`)
```
VITE_API_URL=         # Backend base URL (e.g., http://localhost:3000)
```

## Common Workflows

### Adding a Backend Feature
1. Define request/response types in `types/`
2. Create validation middleware in `validators/`
3. Implement controller logic in `controllers/`
4. Wire route in `routes/`
5. Run `npm run typecheck` and `npm run lint`

### Adding a Frontend Feature
1. Add types to `types/`
2. Create/update RTK Query API in `store/apis/`
3. Build UI component using shadcn/ui primitives
4. Connect to store using typed hooks
5. Run `npm run check` (typecheck + lint + format)

## Git / Commits
- Do not commit unless explicitly asked
- Never commit `.env` files or secrets
- Follow existing commit message style if creating commits

## Quick Reference Checklist

Before submitting changes:
1. Run `npm run typecheck` in both directories
2. Run `npm run lint` (and `npm run format:check` for frontend)
3. Ensure no secrets are in the code
4. Follow existing file naming conventions
5. Verify imports use correct extensions (`.js` for backend relative imports)

## Useful Prompts for AI Agents

When asking an AI agent to implement features in this codebase, use these patterns:

**For backend features:**
> "Create a route for [action] according to project's best practices. Focus on the backend only. Follow the existing MVC pattern with types, validators, controllers, and routes."

**For frontend features:**
> "Create a component/page for [feature] following the project's patterns. Use RTK Query for data fetching if it involves API calls. Use shadcn/ui components for the UI."

**For full-stack features:**
> "Implement [feature] end-to-end. Start with the backend (types, validator, controller, route), then create the frontend (RTK Query API, component). Validate yourself before we continue."

**General guidelines:**
- Always mention: "Do it according to project's best practices"
- Specify scope: "Focus on X only" or "Minimal changes"
- Request validation: "Validate yourself before we continue"
- Be specific about patterns: "Follow the existing MVC pattern"
