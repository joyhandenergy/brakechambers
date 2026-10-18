# Brake Chambers Next.js Project

This is a modern Next.js 16 project utilizing the App Router and Tailwind CSS v4, specialized for an extensive Brake Chamber e-commerce and information platform.

## 📂 Project Structure

This project follows a strict **Feature-Based Architecture**.

- `src/app`: Contains all Next.js page routes, layouts, and SEO configuration (`sitemap.ts`, `robots.ts`).
- `src/features`: Encapsulates business logic, domain-specific components, and page-clients. Organized by domains (e.g., `home`, `products`, `oem`, `manufacturing`).
- `src/components/ui`: Contains strictly domain-agnostic, highly reusable UI components (e.g., generic buttons, cards, section headers).
- `src/components/layout`: Wrappers and structural components like `Navbar`, `Footer`, and `PageHeader`.
- `src/data`: Static mock data and content arrays.
- `src/lib`: Utility functions, animation configurations, and helpers.
- `src/store`: Zustand state management (e.g., cart and market selection).

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Styling

We use **Tailwind CSS v4** (`@tailwindcss/postcss`).
- Global variables and theme overrides are managed in `src/app/globals.css`.
- Ensure all styling uses utility classes where possible rather than inline styles to maintain a consistent aesthetic.

## 📦 Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality.
