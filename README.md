# watchlist-app

## Backend Setup

1. Use the project Node version:

```bash
nvm install
nvm use
```

2. Install backend dependencies:

```bash
cd server
npm install
```

3. Create your local environment file:

```bash
cp .env.example .env
```

4. Fill in your own values in `.env`:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`

5. Run the backend:

```bash
npm run dev
```