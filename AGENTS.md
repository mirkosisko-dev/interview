# AGENTS.md

This guide helps agentic coding assistants work effectively in this codebase.

## Project Structure

Monorepo with frontend and backend:
- `frontend/` - React 19 + TypeScript + Vite + TailwindCSS
- `backend/` - Express.js + TypeScript

## Build Commands

### Frontend
```bash
cd frontend
npm run dev          # Start dev server (Vite)
npm run build        # Type check + build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
npm run dev          # Start dev server with tsx watch mode
npm run test         # Run unit tests (Vitest)
npm run test:ui      # Run tests with UI interface
```

## Code Style

### General Conventions
- Use double quotes for all strings
- 2-space indentation
- No trailing commas in imports/exports
- Default exports for components, services, controllers
- Named exports for types, utilities, constants

### Imports
Frontend (ES modules):
- Group external imports first, then internal imports
- Use `type` keyword for type-only imports when possible
```typescript
import { useQuery } from "@tanstack/react-query";
import type { Order } from "../api/orders/types";
import useGetOrders from "../api/orders/hooks/useGetOrders";
```

Backend (CommonJS):
```typescript
import { Request, Response } from "express";
import orderService from "../services/order-service";
```

### TypeScript
- Strict mode enabled
- Type definitions in separate `types.ts` files
- Use `type` keyword for type exports (not `interface`)
```typescript
export type Order = {
  id: number;
  customerName: string;
  // ...
};
```

### File Organization
Frontend:
- `src/api/[resource]/hooks/` - React Query hooks
- `src/api/[resource]/service.ts` - API client functions
- `src/api/[resource]/types.ts` - Type definitions
- `src/api/[resource]/query-keys.ts` - Query keys for React Query
- `src/components/` - React components (PascalCase filenames)
- `src/hooks/` - Custom hooks (camelCase filenames)

Backend:
- `controllers/[resource]-controller.ts` - Express route handlers
- `services/[resource]-service.ts` - Business logic
- `routers/[resource]-router.ts` - Express router configuration
- `types/[resource]-types.ts` - Type definitions

### React Components
- Functional components only
- Use TypeScript for props (if any)
- TailwindCSS classes for styling
- Handle loading/error states explicitly
```typescript
const OrdersTable = () => {
  const { data, isPending, isError, error } = useGetOrders();

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        // Render data
      )}
    </div>
  );
};

export default OrdersTable;
```

### Error Handling
Frontend:
- Handle errors in hooks (use error from React Query)
- Show error messages to user

Backend:
- Use try/catch in controllers
- Return proper status codes
- Send error messages in JSON format
```typescript
try {
  const orders = await orderService.getOrders(params);
  res.status(200).json({ orders });
} catch (error: any) {
  res.status(400).json({ error: error.message });
}
```

## Testing

Backend uses Vitest for unit testing:
- Test files: `*.test.ts` in `services/` directory
- Run tests: `npm run test` (in backend directory)
- Test UI: `npm run test:ui` (in backend directory)

Frontend tests are not configured yet. When adding tests, check for existing test frameworks (Jest, Vitest, etc.) before adding dependencies.

## Linting

Frontend uses ESLint with:
- TypeScript ESLint
- React Hooks plugin
- React Refresh plugin

Run `npm run lint` in frontend directory to check code.

Always run lint after making changes to ensure code quality.
