# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.1 application using the App Router architecture, TypeScript, Tailwind CSS, and the Geist font family. The application appears to be a lifting diary course application, bootstrapped with create-next-app. Authentication is handled with Clerk.

## Architecture

- **Framework**: Next.js 16.1.1 with App Router (`src/app/` directory)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **Authentication**: Clerk for user authentication and management
- **Fonts**: Geist and Geist Mono fonts from Google Fonts
- **Directory Structure**:
  - `src/app/` - Contains the main application pages and layout using the App Router
  - `src/app/page.tsx` - Main home page component
  - `src/app/layout.tsx` - Root layout with metadata and ClerkProvider
  - `src/app/globals.css` - Global styles and theme configuration
  - `proxy.ts` - Clerk middleware configuration

## Development Commands

```bash
# Run the development server
npm run dev

# Build the application for production
npm run build

# Start the production server
npm run start

# Run ESLint for linting
npm run lint
```

## Authentication with Clerk

- **Middleware**: `clerkMiddleware()` in `proxy.ts` handles authentication
- **Provider**: `<ClerkProvider>` wraps the application in `app/layout.tsx`
- **Components**: `<SignInButton>`, `<SignUpButton>`, `<UserButton>`, `<SignedIn>`, `<SignedOut>` are used for authentication UI
- **Environment Variables**: Store Clerk keys in `.env.local`:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`

## Key Features

- Dark mode support with CSS variables for theme switching
- Responsive design using Tailwind CSS
- Authentication with Clerk (sign in, sign up, user management)
- Optimized fonts with next/font
- TypeScript path aliases configured (`@/*` maps to `./src/*`)
- Automatic image optimization with Next.js Image component

## File Structure

- Pages are located in `src/app/` following the App Router convention
- Components can be added in `src/app/` or in a dedicated `src/components/` directory
- Global styles are in `src/app/globals.css`
- Layout is defined in `src/app/layout.tsx` with ClerkProvider
- Middleware configuration in `proxy.ts`
- Environment variables in `.env.local`
- TypeScript configuration is in `tsconfig.json` with Next.js plugin

## Testing

No specific test framework is configured in the current setup. Jest or React Testing Library would need to be added if testing is required.

## Environment

- Node.js environment with ES2017 target
- Strict TypeScript configuration
- Next.js-specific compiler options and path aliases