# @augmented/cloud

A Hono server with tRPC v11 integration and BetterAuth middleware.

## Features

- Hono server with Node.js adapter
- tRPC v11 API with strong typing
- BetterAuth middleware for authentication and authorization
- Role-based access control
- Example routers for user management and health checks

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## API Routes

### Public Routes

- `GET /trpc/health.ping` - Health check endpoint
- `GET /trpc/health.echo?input={"message":"hello"}` - Echo endpoint
- `GET /trpc/health.info` - System information

### Protected Routes (Requires Authentication)

- `GET /trpc/user.me` - Get current user info
- `POST /trpc/user.updateProfile` - Update user profile

### Admin Routes (Requires Admin Role)

- `GET /trpc/user.listAll` - List all users (paginated)

## Authentication

This server uses BetterAuth for authentication. Send a Bearer token in the Authorization header:

```
Authorization: Bearer <your-token>
```