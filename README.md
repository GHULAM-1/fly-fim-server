# Fly-FIM Server

A Node.js Express server with TypeScript, ConvexDB, and Nodemon for development, following MVC architecture.

## Features

- Express.js web framework with MVC architecture
- TypeScript support with type safety
- ConvexDB integration for real-time database
- Nodemon for automatic server restart during development
- JSON body parsing middleware
- RESTful API routes with proper controllers
- Input validation middleware
- Error handling middleware
- Health check endpoint

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up ConvexDB:
```bash
# Login to ConvexDB (first time only)
npx convex dev --configure

# Start ConvexDB development server
npm run convex:dev

# Generate TypeScript types
npm run convex:codegen
```

## Usage

### Development (with auto-restart)
```bash
npm run dev
```

### Production
```bash
npm start
```

### Build TypeScript
```bash
npm run build
```

### ConvexDB Commands
```bash
npm run convex:dev      # Start ConvexDB development server
npm run convex:deploy    # Deploy to production
npm run convex:codegen   # Generate TypeScript types
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### System
- `GET /` - Welcome message
- `GET /api/health` - Health check with timestamp

## Configuration

- Server runs on port 3000 by default
- Set `PORT` environment variable to change port
- Set `CONVEX_URL` for your ConvexDB deployment
- Nodemon watches for changes in `.ts`, `.js`, and `.json` files
- TypeScript compilation with source maps

## Project Structure

```
fly-fim-server/
├── server.ts              # Main server file (TypeScript)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── nodemon.json           # Nodemon configuration
├── routes/                # Express routes
│   ├── index.ts           # Main routes index
│   └── userRoutes.ts      # User-specific routes
├── controllers/           # Business logic controllers
│   └── userController.ts  # User operations controller
├── middleware/            # Express middleware
│   ├── errorHandler.ts    # Error handling middleware
│   └── validation.ts      # Input validation middleware
├── convex/                # ConvexDB functions
│   ├── schema.ts          # Database schema
│   ├── query.ts           # Database queries
│   ├── mutation.ts        # Database mutations
│   ├── action.ts          # Server actions
│   └── convex.json        # ConvexDB configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Architecture

This project follows the **MVC (Model-View-Controller)** pattern:

- **Models**: ConvexDB schema and functions
- **Views**: JSON API responses
- **Controllers**: Business logic in `controllers/` directory
- **Routes**: HTTP endpoint definitions in `routes/` directory
- **Middleware**: Request processing and validation

## Development

The server will automatically restart when you make changes to:
- `server.ts`
- Files in `routes/`, `middleware/`, `controllers/`, `convex/` directories
- Any `.ts`, `.js`, or `.json` files

## ConvexDB Setup

1. **Install ConvexDB CLI**: `npm install -g convex`
2. **Login**: `npx convex dev --configure`
3. **Start Dev Server**: `npm run convex:dev`
4. **Generate Types**: `npm run convex:codegen`
5. **Deploy**: `npm run convex:deploy`

## Environment Variables

Copy `env.example` to `.env` and configure:
- `CONVEX_URL`: Your ConvexDB deployment URL
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## TypeScript

This project uses TypeScript for better type safety and developer experience. The server runs directly with `ts-node` in development mode and integrates with ConvexDB for real-time database operations.

## Adding New Features

### 1. Create a new controller:
```typescript
// controllers/postController.ts
export const createPost = async (req: Request, res: Response) => {
  // Your business logic here
};
```

### 2. Create routes:
```typescript
// routes/postRoutes.ts
router.post('/', validatePostData, createPost);
```

### 3. Add to main routes:
```typescript
// routes/index.ts
router.use('/api/posts', postRoutes);
```

### 4. Add ConvexDB functions:
```typescript
// convex/schema.ts - Add table
// convex/mutation.ts - Add mutations
// convex/query.ts - Add queries
```
