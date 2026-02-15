# Full-Stack TypeScript Hackathon Starter

Expert in working with the full-stack TypeScript monorepo designed for hackathons and rapid prototyping.

## Project Context

This is a full-stack TypeScript boilerplate with React frontend and Express/MongoDB backend, optimized for AI-assisted development.

### Stack Overview
- **Frontend**: React 19 + Vite + Redux Toolkit + RTK Query + Tailwind CSS v4 + shadcn/ui
- **Backend**: Express 5 + MongoDB/Mongoose + Node.js ESM
- **Both**: TypeScript strict mode, ESLint (type-aware), Prettier

### Project Structure
```
full-stack-starter-code/
├── backend/
│   └── src/
│       ├── controllers/    # Route handlers (MVC)
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express routers
│       ├── types/          # TypeScript interfaces
│       ├── validators/     # Request validation
│       └── index.ts        # App bootstrap
└── frontend/
    └── src/
        ├── store/          # Redux + RTK Query
        ├── ui/             # Pages and layouts
        ├── shadcn/         # UI components
        ├── types/          # Shared types
        └── consts/         # Constants
```

## Backend Development

### Creating New Routes (MVC Pattern)

When implementing backend features, follow this 4-step pattern:

**1. Define Types** (`types/[feature].types.ts`)
```typescript
export type CreateFeatureBody = {
  field1: string;
  field2: number;
};

export type UpdateFeatureBody = {
  field1?: string;
};
```

**2. Create Validator** (`validators/[feature].validator.ts`)
```typescript
export function validateCreateFeature(req: Request, res: Response, next: NextFunction) {
  const { field1, field2 } = req.body as Partial<CreateFeatureBody>;
  if (!field1 || !field2) {
    return res.status(400).json({ message: 'field1 and field2 are required' });
  }
  return next();
}
```

**3. Implement Controller** (`controllers/[feature].controller.ts`)
```typescript
export async function createFeature(req: Request, res: Response) {
  try {
    const { field1, field2 } = req.body as CreateFeatureBody;
    const created = await FeatureModel.create({ field1, field2 });
    return res.status(201).json(created);
  } catch (_err) {
    console.error(_err);
    return res.status(500).json({ message: 'server error' });
  }
}
```

**4. Wire Route** (`routes/[feature].routes.ts`)
```typescript
featuresRouter.post('/', validateCreateFeature, createFeature);
featuresRouter.get('/', listFeatures);
featuresRouter.get('/:id', validateFeatureId, getFeatureById);
```

### Backend Code Style
- Use `.js` extensions for all relative imports (Node ESM requirement)
- Always use `import type` for type-only imports
- Prefix unused variables with `_`
- Use `try/catch` in all controller functions
- Return appropriate HTTP status codes (200, 201, 400, 404, 500)
- Types for params/body use the `ObjectIdParams` pattern

### Backend Validation Rules
- Check if body exists: `if (!req.body) return res.status(400)...`
- Check required fields
- Check types (string, number, etc.)
- Check non-empty for strings: `if (!field.trim())`
- Validate ObjectIds using `mongoose.isValidObjectId()`

## Frontend Development

### Creating RTK Query APIs

When adding API endpoints to the frontend:

```typescript
// store/apis/feature.api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL;

export const featureApi = createApi({
  reducerPath: 'featureApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Feature'],
  endpoints: (builder) => ({
    // Query (GET)
    getFeatures: builder.query<Feature[], void>({
      query: () => '/features',
      providesTags: ['Feature'],
    }),
    
    // Mutation (POST)
    createFeature: builder.mutation<Feature, CreateFeatureBody>({
      query: (body) => ({
        url: '/features',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Feature'],
    }),
    
    // Mutation (PATCH)
    updateFeature: builder.mutation<Feature, { id: string; body: UpdateFeatureBody }>({
      query: ({ id, body }) => ({
        url: `/features/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Feature'],
    }),
  }),
});

export const {
  useGetFeaturesQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
} = featureApi;
```

### State Management Best Practices
- **Redux slices**: Use for local UI state (form data, user preferences, toggles)
- **RTK Query**: Use for all server state (API data, caching)
- Never fetch data manually in components - always use RTK Query hooks
- Use `providesTags` and `invalidatesTags` for automatic cache invalidation

### Frontend Component Patterns

**Page Component:**
```typescript
// ui/pages/FeaturePage.tsx
import { useGetFeaturesQuery } from '@/store/apis/feature.api';
import { Button } from '@/shadcn/components/ui/button';

export function FeaturePage() {
  const { data: features, isLoading, error } = useGetFeaturesQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading features</div>;
  
  return (
    <div className="container mx-auto p-4">
      {features?.map((feature) => (
        <div key={feature.id}>{feature.name}</div>
      ))}
    </div>
  );
}
```

**Using shadcn/ui Components:**
```typescript
import { Button } from '@/shadcn/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/components/ui/card';
import { Input } from '@/shadcn/components/ui/input';
```

### Frontend Code Style
- Use `@/` alias for all imports from `src/`
- Use single quotes
- No trailing commas (frontend only)
- Use `PascalCase` for component files
- Use `camelCase` for utility files

## Common Commands

### Backend
```bash
cd backend
npm run dev           # Hot reload dev server
npm run typecheck     # TypeScript check
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
```

### Frontend
```bash
cd frontend
npm run dev           # Vite dev server
npm run check         # typecheck + lint + format:check
npm run typecheck     # TypeScript only
npm run lint          # ESLint only
npm run format        # Prettier format
```

## Validation Checklist

Before completing any task:

### Backend
- [ ] Types defined in `types/` directory
- [ ] Validator created in `validators/` directory
- [ ] Controller uses try/catch
- [ ] Controller returns proper status codes
- [ ] Route wired in `routes/` directory
- [ ] Imports use `.js` extensions
- [ ] Type-only imports use `import type`
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes

### Frontend
- [ ] Types defined in `types/` directory
- [ ] RTK Query API created/updated in `store/apis/`
- [ ] Components use `@/` alias for imports
- [ ] shadcn/ui components used where appropriate
- [ ] Loading and error states handled
- [ ] `npm run check` passes (typecheck + lint + format)

### Full-Stack
- [ ] Backend route tested (if possible)
- [ ] Frontend API integration works
- [ ] End-to-end flow verified
- [ ] No secrets in code
- [ ] No `.env` files staged for commit

## Environment Setup

### Required Environment Variables

**Backend** (`backend/.env`):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
FRONTEND_URL=http://localhost:5173
PORT=3000
```

**Frontend** (`frontend/.env.development`):
```
VITE_API_URL=http://localhost:3000
```

## Useful Resources

- **Mongoose Docs**: https://mongoosejs.com/docs/
- **RTK Query Docs**: https://redux-toolkit.js.org/rtk-query/overview
- **shadcn/ui Docs**: https://ui.shadcn.com/docs
- **Tailwind CSS v4**: https://tailwindcss.com/docs/v4-beta
- **Express 5**: https://expressjs.com/en/5x/api.html

## Debugging Tips

### Backend
- Check MongoDB connection string is correct
- Verify CORS origin matches frontend URL
- Use `console.error()` for error logging
- Check `npm run typecheck` for TypeScript errors

### Frontend
- Check `VITE_API_URL` points to running backend
- Verify API is added to store configuration
- Check Redux DevTools for state issues
- Use React DevTools for component debugging

### Common Issues
1. **CORS errors**: Ensure `FRONTEND_URL` in backend matches actual frontend URL
2. **Type errors**: Run `npm run typecheck` in both directories
3. **Import errors**: Backend needs `.js` extensions, frontend uses `@/` alias
4. **MongoDB errors**: Verify connection string and network access
