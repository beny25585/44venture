# Full-Stack TypeScript Starter

A production-ready boilerplate for hackathons and rapid prototyping with React frontend and Express/MongoDB backend.

## What This Project Is

This is a **full-stack TypeScript monorepo** that gives you a solid foundation to build web applications quickly. It comes with:
- Complete user authentication patterns
- Database models and relationships
- State management setup
- UI component library
- API integration patterns
- Validation and error handling

Instead of spending hours setting up tools, you can start building features immediately.

---

## Tech Stack

### Frontend (`frontend/`)
| Technology | Purpose |
|------------|---------|
| React 19 | UI library |
| Vite | Build tool and dev server |
| TypeScript | Type-safe JavaScript |
| Redux Toolkit | State management |
| RTK Query | API calls and caching |
| Tailwind CSS v4 | Styling |
| shadcn/ui | UI components |
| React Hook Form + Zod | Forms and validation |
| React Router v7 | Navigation |
| Socket.io Client | Real-time features |

### Backend (`backend/`)
| Technology | Purpose |
|------------|---------|
| Express 5 | Web framework |
| MongoDB + Mongoose | Database |
| TypeScript | Type-safe JavaScript |
| Helmet | Security headers |
| CORS | Cross-origin requests |

---

## Project Structure

```
full-stack-starter-code/
├── backend/                    # Express + MongoDB API
│   └── src/
│       ├── index.ts            # Server setup and middleware
│       ├── controllers/        # Business logic
│       │   ├── users.controller.ts
│       │   └── posts.controller.ts
│       ├── models/             # Database schemas
│       │   ├── User.model.ts
│       │   └── Post.model.ts
│       ├── routes/             # API endpoints
│       │   ├── users.routes.ts
│       │   └── posts.routes.ts
│       ├── types/              # TypeScript types
│       │   ├── user.types.ts
│       │   ├── posts.types.ts
│       │   └── common.types.ts
│       └── validators/         # Input validation
│           ├── users.validator.ts
│           └── posts.validator.ts
│
└── frontend/                   # React application
    └── src/
        ├── main.tsx            # App entry point
        ├── App.tsx             # Root component
        ├── router/             # Route definitions
        ├── ui/                 # Pages and layouts
        │   ├── Root.tsx
        │   └── pages/
        │       ├── Home.tsx
        │       └── NotFound.tsx
        ├── store/              # State management
        │   ├── index.ts        # Store configuration
        │   ├── hooks/          # Typed Redux hooks
        │   ├── slices/         # Local state
        │   │   ├── user.slice.ts
        │   │   └── counter.slice.ts
        │   └── apis/           # API endpoints
        │       └── pokemon.api.ts
        ├── shadcn/             # UI components
        │   ├── components/
        │   │   └── ui/
        │   │       ├── button.tsx
        │   │       ├── card.tsx
        │   │       ├── input.tsx
        │   │       └── ...
        │   └── lib/
        │       └── utils.ts
        ├── types/              # TypeScript types
        ├── consts/             # Constants
        └── styles/             # Global styles
```

---

## Quick Start

### 1. Install Dependencies

You need to install dependencies in **both** directories:

```bash
# Terminal 1 - Backend
cd backend
npm install

# Terminal 2 - Frontend
cd frontend
npm install
```

### 2. Set Up Environment Variables

Create `.env` files from the examples:

**Backend** (`backend/.env`):
```bash
cp .env.example .env
```

Then edit `.env` and add your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/database-name
FRONTEND_URL=http://localhost:5173
PORT=3000
```

**Frontend** (`frontend/.env.development`):
```bash
cp .env.example .env.development
```

Content:
```
VITE_API_URL=http://localhost:3000
```

### 3. Start the Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The frontend will be at `http://localhost:5173` and the backend at `http://localhost:3000`.

---

## How the Backend Works

The backend follows the **MVC (Model-View-Controller)** pattern. This means code is organized into three layers:

### 1. Models (`models/`)
**What**: Define the shape of your data and database schema.

**Example** - `models/User.model.ts`:
```typescript
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

export const UserModel = mongoose.model('User', UserSchema);
```

Think of models as blueprints for your database collections.

### 2. Controllers (`controllers/`)
**What**: Handle the business logic - what happens when someone hits your API.

**Example** - Getting a user:
```typescript
export async function getUserById(req: Request, res: Response) {
  try {
    // 1. Get the ID from the URL
    const { id } = req.params;
    
    // 2. Ask the database for the user
    const user = await UserModel.findById(id);
    
    // 3. If not found, return 404
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    
    // 4. Return the user
    return res.status(200).json(user);
  } catch (error) {
    // 5. If something goes wrong, log it and return 500
    console.error(error);
    return res.status(500).json({ message: 'server error' });
  }
}
```

Controllers always:
- Wrap code in `try/catch` blocks
- Return appropriate HTTP status codes (200=OK, 201=Created, 400=Bad Request, 404=Not Found, 500=Server Error)
- Use `console.error()` to log errors

### 3. Routes (`routes/`)
**What**: Define the API endpoints and connect them to controllers.

**Example** - `routes/users.routes.ts`:
```typescript
import { Router } from 'express';
import { getUserById, createUser } from '../controllers/users.controller.js';
import { validateUserId, validateCreateUser } from '../validators/users.validator.js';

export const usersRouter = Router();

// GET /users - List all users
usersRouter.get('/', listUsers);

// GET /users/:id - Get one user (with validation)
usersRouter.get('/:id', validateUserId, getUserById);

// POST /users - Create a user (with validation)
usersRouter.post('/', validateCreateUser, createUser);
```

Routes wire URLs to controller functions. They can also include **validators** that run first.

### 4. Validators (`validators/`)
**What**: Check that incoming data is valid before processing.

**Example**:
```typescript
export function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  // 1. Check body exists
  if (!req.body) {
    return res.status(400).json({ message: 'body is required' });
  }
  
  // 2. Extract fields
  const { email, name } = req.body;
  
  // 3. Check required fields
  if (!email || !name) {
    return res.status(400).json({ message: 'email and name are required' });
  }
  
  // 4. Check types
  if (typeof email !== 'string' || typeof name !== 'string') {
    return res.status(400).json({ message: 'email and name must be strings' });
  }
  
  // 5. Check not empty
  if (!email.trim() || !name.trim()) {
    return res.status(400).json({ message: 'email and name cannot be empty' });
  }
  
  // 6. If all checks pass, continue to controller
  return next();
}
```

Validators return early with 400 status if something is wrong. If everything is valid, they call `next()` to proceed.

### 5. Types (`types/`)
**What**: Define TypeScript types for request bodies and parameters.

**Example**:
```typescript
// What we expect when creating a user
export type CreateUserBody = {
  email: string;
  name: string;
};

// What we expect in URL parameters
export type ObjectIdParams = {
  id: string;
};
```

These help TypeScript catch errors and provide autocomplete.

### Backend Summary Flow

```
HTTP Request → Route → Validator → Controller → Model → Database
     ↑                                                      |
     └────────────── JSON Response ─────────────────────────┘
```

---

## How the Frontend Works

The frontend uses **Redux Toolkit** for state management with two main concepts:

### 1. Slices (`store/slices/`)
**What**: Manage local UI state (form inputs, user preferences, etc.)

**Example** - Counter slice:
```typescript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

Use slices for:
- Form data
- UI toggles (dark mode, sidebar open/closed)
- User preferences
- Local app state

### 2. RTK Query (`store/apis/`)
**What**: Handle API calls, caching, and server state.

**Example** - Pokemon API:
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  
  endpoints: (builder) => ({
    // Query = GET request
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `/pokemon/${name}`,
    }),
    
    // Mutation = POST/PUT/PATCH/DELETE
    createPokemon: builder.mutation<Pokemon, CreatePokemonBody>({
      query: (body) => ({
        url: '/pokemon',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetPokemonByNameQuery,
  useCreatePokemonMutation,
} = pokemonApi;
```

Use RTK Query for:
- Fetching data from your backend
- POST/PUT/DELETE operations
- Caching API responses
- Managing loading/error states

### Using in Components

```typescript
import { useGetPokemonByNameQuery } from '@/store/apis/pokemon.api';

function PokemonCard({ name }: { name: string }) {
  // This hook automatically:
  // - Makes the API call
  // - Handles loading state
  // - Caches the result
  // - Returns data, error, and loading status
  const { data: pokemon, isLoading, error } = useGetPokemonByNameQuery(name);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!pokemon) return <div>No pokemon found</div>;
  
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}
```

### Frontend Summary

```
User Action → Dispatch → Store → Slice/RTK Query → Backend API
                                          ↓
                                Update Component ← State Change
```

---

## Existing Features

### Users API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PATCH | `/users/:id/name` | Update user name |

### Posts API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | List all posts (newest first) |
| GET | `/posts/:id` | Get post by ID |
| POST | `/posts` | Create new post |
| PATCH | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |

**Relationships**:
- A User has many Posts
- A Post belongs to one User
- When creating a post, it's automatically added to the user's `posts` array

---

## Example: Adding a New Feature

Let's say you want to add a "Comments" feature to posts.

### Step 1: Backend - Create the Model

**`backend/src/models/Comment.model.ts`**:
```typescript
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  authorName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const CommentModel = mongoose.model('Comment', CommentSchema);
```

### Step 2: Backend - Create Types

**`backend/src/types/comment.types.ts`**:
```typescript
export type CreateCommentBody = {
  content: string;
  authorName: string;
};
```

### Step 3: Backend - Create Validator

**`backend/src/validators/comments.validator.ts`**:
```typescript
import type { NextFunction, Request, Response } from 'express';
import type { CreateCommentBody } from '../types/comment.types.js';

export function validateCreateComment(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    return res.status(400).json({ message: 'body is required' });
  }
  
  const { content, authorName } = req.body as Partial<CreateCommentBody>;
  
  if (!content || !authorName) {
    return res.status(400).json({ message: 'content and authorName are required' });
  }
  
  if (typeof content !== 'string' || typeof authorName !== 'string') {
    return res.status(400).json({ message: 'content and authorName must be strings' });
  }
  
  if (!content.trim() || !authorName.trim()) {
    return res.status(400).json({ message: 'content and authorName cannot be empty' });
  }
  
  return next();
}
```

### Step 4: Backend - Create Controller

**`backend/src/controllers/comments.controller.ts`**:
```typescript
import type { Request, Response } from 'express';
import { CommentModel } from '../models/Comment.model.js';
import type { ObjectIdParams } from '../types/common.types.js';
import type { CreateCommentBody } from '../types/comment.types.js';

export async function getCommentsByPostId(req: Request, res: Response) {
  try {
    const { id } = req.params as ObjectIdParams;
    const comments = await CommentModel.find({ postId: id }).sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (_err) {
    console.error(_err);
    return res.status(500).json({ message: 'server error' });
  }
}

export async function createComment(req: Request, res: Response) {
  try {
    const { id } = req.params as ObjectIdParams;
    const { content, authorName } = req.body as CreateCommentBody;
    
    const comment = await CommentModel.create({
      postId: id,
      content,
      authorName,
    });
    
    return res.status(201).json(comment);
  } catch (_err) {
    console.error(_err);
    return res.status(500).json({ message: 'server error' });
  }
}
```

### Step 5: Backend - Create Routes

**`backend/src/routes/comments.routes.ts`**:
```typescript
import { Router } from 'express';
import { createComment, getCommentsByPostId } from '../controllers/comments.controller.js';
import { validatePostId } from '../validators/posts.validator.js';
import { validateCreateComment } from '../validators/comments.validator.js';

export const commentsRouter = Router({ mergeParams: true });

// GET /posts/:id/comments
commentsRouter.get('/', validatePostId, getCommentsByPostId);

// POST /posts/:id/comments
commentsRouter.post('/', validatePostId, validateCreateComment, createComment);
```

Then register in `backend/src/index.ts`:
```typescript
import { commentsRouter } from './routes/comments.routes.js';

// Add this line with other routers
app.use('/posts/:id/comments', commentsRouter);
```

### Step 6: Frontend - Create RTK Query API

**`frontend/src/store/apis/comments.api.ts`**:
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL;

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<Comment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (result, error, postId) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Comment' as const, id })), { type: 'Comment', id: postId }]
          : [{ type: 'Comment', id: postId }],
    }),
    
    createComment: builder.mutation<Comment, { postId: string; body: CreateCommentBody }>({
      query: ({ postId, body }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Comment', id: postId }],
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
} = commentsApi;
```

### Step 7: Frontend - Add API to Store

**`frontend/src/store/index.ts`**:
```typescript
import { commentsApi } from './apis/comments.api';

export const store = configureStore({
  reducer: {
    // ... other reducers
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // ... other middleware
      .concat(commentsApi.middleware),
});
```

### Step 8: Frontend - Create Component

**`frontend/src/ui/pages/PostDetail.tsx`**:
```typescript
import { useParams } from 'react-router';
import { useGetPostByIdQuery } from '@/store/apis/posts.api';
import { useGetCommentsByPostIdQuery, useCreateCommentMutation } from '@/store/apis/comments.api';
import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { useState } from 'react';

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  
  const { data: post, isLoading: postLoading } = useGetPostByIdQuery(id!);
  const { data: comments, isLoading: commentsLoading } = useGetCommentsByPostIdQuery(id!);
  const [createComment, { isLoading: isSubmitting }] = useCreateCommentMutation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;
    
    await createComment({
      postId: id!,
      body: { content: newComment, authorName },
    });
    
    setNewComment('');
  };
  
  if (postLoading || commentsLoading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="mb-8">{post.content}</p>
      
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <Input
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <Input
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>
      
      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="border p-3 rounded">
            <p className="font-semibold">{comment.authorName}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Useful Commands

### Development
```bash
# Start both servers (run in separate terminals)
cd backend && npm run dev
cd frontend && npm run dev
```

### Code Quality
```bash
# Check TypeScript (run in both directories)
npm run typecheck

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Frontend only - run all checks
npm run check
```

---

## Tips for Learning

1. **Start with the backend** - Understand the MVC pattern first
2. **Read the existing code** - Users and posts are fully implemented
3. **Follow the patterns** - Use the same structure for new features
4. **Run typecheck often** - TypeScript will catch errors early
5. **Use the AI agent** - Give it specific tasks following the patterns in `AGENTS.md`

---

## Common Issues

### "Cannot find module"
- Backend: Make sure you're using `.js` extensions for relative imports
- Frontend: Use `@/` alias for imports from `src/`

### CORS errors
- Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default frontend URL is `http://localhost:5173`

### MongoDB connection fails
- Verify your connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure network access is enabled

### TypeScript errors
- Run `npm run typecheck` to see all errors
- Make sure you're using `import type` for type-only imports

---

## Resources

- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Redux Toolkit Tutorial](https://redux-toolkit.js.org/tutorials/quick-start)
- [RTK Query Overview](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components/accordion)

---

## Next Steps

1. ✅ Read through this README
2. ✅ Set up the project locally
3. ✅ Explore the existing code
4. ✅ Try making a small change
5. ✅ Build your first feature!

Happy coding! 🚀
