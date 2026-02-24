# Wishlist App

Production-ready split app:
- `frontend`: Vite + React in `/`
- `backend`: Express + MongoDB in `/backend`

## 1) Environment variables

Frontend (`wishlist/.env`):
```env
VITE_BACKEND_URL=https://your-backend-domain.com
```

Backend (`wishlist/backend/.env`):
```env
ATLAS_URI=your-mongodb-connection-string
JWT_SECRET=your-strong-random-secret
PORT=3000
NODE_ENV=production
FRONTEND_URLS=https://your-frontend-domain.com
```

If you have multiple frontend origins, separate them with commas in `FRONTEND_URLS`.

## 2) Run locally

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd ..
npm install
npm run dev
```

## 3) Deployment

Recommended:
- Deploy backend to Render/Railway/Fly.io
- Deploy frontend to Vercel/Netlify

Backend start command:
```bash
npm start
```

Frontend build command:
```bash
npm run build
```

Frontend output directory:
```bash
dist
```

## 4) Health check

Backend exposes:
```text
GET /health
```

Use it for your platform health probe.
