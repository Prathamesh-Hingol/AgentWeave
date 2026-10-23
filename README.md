# AgentWeave

A node-based workflow automation platform for chaining together AI models, webhooks, and third-party APIs. Built with Next.js, React Flow, and Inngest for durable background execution.

---

## Overview

AgentWeave lets you visually build multi-step automation pipelines. Workflows can be kicked off manually or via inbound webhooks (Stripe, Google Forms), route data through LLMs (OpenAI, Anthropic, Gemini), make HTTP calls, and send notifications to Discord or Slack.

Execution states are tracked in real time using Inngest durable functions and streamed back to the UI.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Canvas / UI**: React Flow (`@xyflow/react`), Tailwind CSS, Radix UI (shadcn/ui)
- **API & State**: tRPC v11, TanStack React Query
- **Orchestration**: Inngest (durable workflows, step-level retries, and realtime channels)
- **Database**: PostgreSQL (Neon serverless) with Prisma ORM
- **Auth**: Better Auth (Email/Password, GitHub, Google OAuth)
- **Billing**: Polar.sh (Subscriptions and checkout portal)
- **Security**: AES-256 credential encryption for stored API keys

---

## Supported Nodes

### Triggers
- **Manual Trigger**: Run workflows on-demand from the editor.
- **Stripe Webhook**: Trigger runs on Stripe events (e.g., `payment_intent.succeeded`, `checkout.session.completed`).
- **Google Form Trigger**: Receive responses from Google Forms via Google Apps Script.

### AI Models
- **OpenAI**: GPT-4o / GPT-4o-mini completions with system & user prompt templates.
- **Anthropic**: Claude 3.5 Sonnet / Haiku integration.
- **Google Gemini**: Gemini 1.5 Pro / Flash models.

### Integrations & Utilities
- **HTTP Request**: Custom REST calls (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) with templated headers and JSON payloads.
- **Discord**: Post formatted messages via Discord incoming webhooks.
- **Slack**: Send alerts to Slack channels via incoming webhooks.

### Variable Templating
Any node can reference outputs from previous nodes using template tags:
- Simple property: `{{myAnthropic.text}}`
- Nested property: `{{httpResponse.data.user.id}}`
- Stringify object: `{{json stripe}}` or `{{json httpResponse.data}}`

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A PostgreSQL database (e.g. Neon, Supabase, or local Postgres)
- Inngest CLI (`npx inngest-cli` or installed globally)

### 1. Clone & Install

```bash
git clone https://github.com/Prathamesh-Hingol/AgentWeave.git
cd AgentWeave
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Better Auth
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Credential Encryption (32-character key for encrypting stored user API keys)
ENCRYPTION_KEY="your-32-char-secret-encryption-key"

# Inngest (optional for local dev, Inngest CLI connects automatically)
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"

# Polar (Billing)
POLAR_ACCESS_TOKEN="polar_oat_..."
POLAR_SUCCESS_URL="http://localhost:3000"

# OAuth Providers (Optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 3. Database Migration

Push the Prisma schema to your database:

```bash
npx prisma db push
# or
npx prisma migrate dev
```

### 4. Running Locally

The app requires both the Next.js development server and the Inngest local dev server to run workflows.

**Option A: Run both with mprocs (recommended)**

```bash
npm run dev:all
```

**Option B: Run in separate terminals**

Terminal 1 (Next.js):
```bash
npm run dev
```

Terminal 2 (Inngest Dev Server):
```bash
npm run inngest:dev
```

- Web App: [http://localhost:3000](http://localhost:3000)
- Inngest Dashboard: [http://localhost:8288](http://localhost:8288)

---

## Webhook Testing (Stripe & Google Forms)

For external webhooks to hit your local machine, expose port 3000 via a tunnel:

```bash
npm run ngrok:dev
# or
ngrok http 3000
```

Use the generated forwarding URL in the webhook trigger dialogs inside AgentWeave.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router (dashboard, auth, trpc route handlers)
├── components/           # Shared UI primitives, sidebar, dialogs, React Flow custom nodes
├── features/
│   ├── credentials/      # Encrypted user API key vault
│   ├── editor/           # React Flow workflow canvas and toolbars
│   ├── executions/       # Action nodes (LLMs, HTTP, Slack, Discord) & execution viewer
│   ├── subscriptions/    # Polar billing hooks, procedures & status checks
│   ├── triggers/         # Inbound trigger nodes (Manual, Stripe, Google Forms)
│   └── workflow/         # Workflow CRUD and management
├── inngest/              # Background functions, event handlers, and step pipelines
├── lib/                  # Auth setup, DB client, encryption utilities, Polar client
└── trpc/                 # tRPC procedures, context, and client/server callers
```

---

## Scripts

- `npm run dev` - Start Next.js dev server with Turbopack
- `npm run inngest:dev` - Start local Inngest development server
- `npm run dev:all` - Start Next.js and Inngest together using `mprocs`
- `npm run build` - Create production build
- `npm run lint` - Run Biome linter
- `npm run format` - Format code using Biome

