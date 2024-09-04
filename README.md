## Getting Started

Config your environment variables:

```bash
cp .env.example .env.local
```

```bash
DATABASE_URL="postgresql://[user:password]@localhost:5432/database"
OPENAI_API_KEY="sk-..."
NEXTAUTH_SECRET="secret"
NEXTAUTH_URL="http://localhost:3000"
```

Run the development server:

```bash
pnpm install
    &&
pnpm dev
```
