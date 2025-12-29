# Project Structure (Standard Feature-First)

Mô hình thư mục đề xuất cho Next.js 15 App Router:

```
/
├── app/
│   ├── (auth)/                 # Auth routes group (Clerk)
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (marketing)/            # Public pages
│   │   └── page.tsx            # Landing Page
│   ├── (main)/                 # Main App (Protected)
│   │   ├── layout.tsx          # Auth Check & Global Providers
│   │   ├── dashboard/          # Project list
│   │   │   └── page.tsx
│   │   └── project/[projectId]/
│   │       ├── layout.tsx      # Project Layout (Sidebar + Context)
│   │       ├── page.tsx        # Project Overview (Graph View ?)
│   │       └── [nodeId]/
│   │           └── page.tsx    # Editor Interface (Chapter/Character)
│   ├── api/                    # Route Handlers (Webhook etc.)
│   ├── globals.css
│   └── layout.tsx              # Root Layout
├── components/
│   ├── editor/                 # BlockNote wrappers & custom blocks
│   ├── graph/                  # React Flow components
│   ├── layout/                 # Sidebar, Navbar, Panels
│   ├── ui/                     # Shadcn UI primitives (Button, Dialog...)
│   └── providers/              # ThemeProvider, QueryProvider
├── db/
│   ├── schema.ts               # Drizzle Schema
│   └── index.ts                # DB Connection setup
├── lib/                        # Utilities
│   ├── utils.ts                # cn() helper
│   ├── actions/                # Server Actions
│   └── hooks/                  # Custom React Hooks
├── types/                      # TypeScript definitions
│   └── index.ts
├── public/                     # Static assets
├── drizzle.config.ts           # Drizzle Config
├── next.config.ts              # Next.js Config
└── package.json
```
