# xinfras-web

Documentation website for the xinfras infrastructure frameworks: **ai-infra**, **svc-infra**, and **fin-infra**.

## Overview

xinfras-web is a modern documentation site built with Next.js, featuring:

- **Interactive Background** - Canvas-based particle system with mouse tracking
- **Dark/Light Mode** - Automatic theme switching with charcoal blue brand color
- **Responsive Design** - Mobile-first, works on all screen sizes
- **shadcn/ui Components** - Consistent, accessible UI components

## Frameworks Documented

| Framework | Description |
|-----------|-------------|
| **ai-infra** | LLM orchestration, agent frameworks, MCP servers, and tool execution |
| **svc-infra** | Backend infrastructure with APIs, auth, database, caching, and job queues |
| **fin-infra** | Financial infrastructure for payments, subscriptions, and billing |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Development

```bash
# Install dependencies
make install

# Run development server
make dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Create production build
make build

# Start production server
make start
```

## Project Structure

```
src/
├── app/
│   ├── docs/           # Documentation pages
│   │   ├── ai-infra/   # AI Infra docs
│   │   ├── svc-infra/  # Svc Infra docs
│   │   └── fin-infra/  # Fin Infra docs
│   ├── globals.css     # Theme and global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/
│   ├── docs/           # Documentation components
│   ├── layout/         # Header, footer
│   └── ui/             # shadcn/ui components
└── lib/
    └── utils.ts        # Utility functions
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript

## License

MIT

