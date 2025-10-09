# React Template - Client Portal

A modern, production-ready React application template built with TypeScript, Vite, and Tailwind CSS. This template provides a solid foundation for building client portals with robust state management, routing, and UI components.

## 🚀 Tech Stack

### Core Technologies
- **React 19.1.1** - Latest React with concurrent features and improved performance
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for single-page applications

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework with custom theming
- **Radix UI** - Accessible, customizable component primitives
- **Lucide React** - Beautiful & consistent icon library
- **tw-animate-css** - Animation utilities for Tailwind
- **Custom Design System** - Consistent color tokens and theming with dark mode support

### State Management & Data Fetching
- **TanStack React Query** - Powerful data synchronization for React
- **Axios** - HTTP client for API requests
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code linting with TypeScript and React rules
- **TypeScript ESLint** - TypeScript-specific linting rules
- **React Refresh** - Fast refresh for React components during development

### Additional Features
- **Sonner** - Toast notifications
- **Environment Variables** - Type-safe environment configuration
- **Path Aliases** - Clean import paths with `@/` prefix

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd react-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .example.env .env
   ```

   Configure your environment variables in `.env`:
   ```env
   # Add your environment variables here
   VITE_API_URL=your_api_url
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Base UI components (buttons, inputs, etc.)
├── pages/              # Page components (route-level components)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
│   ├── apis/          # API client configurations
│   ├── env.ts         # Environment variable validation
│   ├── handle-server-error.ts  # Error handling utilities
│   └── utils.ts       # General utility functions
├── providers/          # React context providers
│   ├── index.tsx      # Main provider wrapper
│   └── client-query-provider.tsx  # React Query setup
├── routes/             # Route definitions
├── style/             # Global styles and Tailwind config
│   └── global.css     # Global CSS with custom theme
├── App.tsx           # Main app component
└── main.tsx          # Application entry point
```

## 🛠 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎯 Usage Guide

### Creating New Pages

1. Create a new component in `src/pages/`
   ```tsx
   // src/pages/dashboard.tsx
   export default function Dashboard() {
     return (
       <div className="p-6">
         <h1 className="text-2xl font-bold">Dashboard</h1>
         {/* Your page content */}
       </div>
     );
   }
   ```

2. Add the route in `src/routes/index.tsx`
   ```tsx
   import Dashboard from "@/pages/dashboard";

   const router = createBrowserRouter([
     {
       path: "/dashboard",
       element: <Dashboard />,
     },
     // ... existing routes
   ]);
   ```

### Using React Query for Data Fetching

```tsx
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apis";

export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => apiClient.get(`/users/${userId}`),
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

### Creating Reusable Components

```tsx
// src/components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### Using Environment Variables

```tsx
// src/lib/env.ts
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  client: {
    VITE_API_URL: z.string().url(),
  },
  runtimeEnv: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  },
});

// Usage
const apiUrl = env.VITE_API_URL;
```

## 📋 Best Practices & Coding Standards

### 1. **TypeScript Guidelines**
- Use strict TypeScript mode
- Define proper interfaces for API responses
- Use `as const` for literal types when appropriate
- Avoid `any` type; use `unknown` for uncertain types

### 2. **Component Architecture**
- Keep components small and focused (single responsibility)
- Use composition over inheritance
- Extract reusable logic into custom hooks
- Follow the `pages/` for routes, `components/` for reusables pattern

### 3. **State Management**
- Use React Query for server state management
- Use React's `useState` and `useReducer` for local component state
- Avoid prop drilling with context when necessary
- Keep state as close to where it's used as possible

### 4. **Styling with Tailwind CSS**
- Use semantic color tokens (e.g., `bg-primary` instead of `bg-blue-500`)
- Leverage the design system variables for consistency
- Use responsive utilities appropriately
- Prefer utility classes over custom CSS when possible

### 5. **Error Handling**
- Use the configured error handling in React Query
- Display user-friendly error messages
- Log errors appropriately for debugging
- Handle loading states gracefully

### 6. **Code Organization**
- Group related files in feature-based folders
- Use barrel exports (`index.ts`) for cleaner imports
- Keep files under 200 lines when possible
- Use meaningful file and folder names

### 7. **Performance Optimization**
- Use `React.memo` for expensive components
- Implement proper dependency arrays in `useEffect`
- Lazy load routes and heavy components
- Optimize bundle size by code splitting

### 8. **Testing Considerations**
- Write unit tests for utility functions
- Test components in isolation
- Mock external dependencies
- Test error scenarios

### 9. **Git & Version Control**
- Use conventional commit messages
- Write descriptive PR titles and descriptions
- Keep commits atomic and focused
- Use meaningful branch names

### 10. **Security Best Practices**
- Validate and sanitize user inputs
- Use HTTPS for API calls
- Implement proper authentication flows
- Handle sensitive data securely

## 🌟 Features Included

- ✅ **Modern React Setup** - Latest React with TypeScript
- ✅ **Fast Development** - Vite for instant hot reload
- ✅ **Beautiful UI** - Tailwind CSS with custom design system
- ✅ **Dark Mode Support** - Complete theme switching
- ✅ **State Management** - React Query for server state
- ✅ **Form Validation** - Zod schema validation
- ✅ **Error Handling** - Comprehensive error boundaries
- ✅ **Toast Notifications** - User feedback system
- ✅ **Code Quality** - ESLint configuration
- ✅ **Type Safety** - Full TypeScript coverage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Coding! 🎉**