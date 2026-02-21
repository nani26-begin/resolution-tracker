# LevelUp 2026 - Modern Resolution Tracker

A sleek, mobile-centric "Hydration App" style habit tracker with a fillable mascot that grows with you.

## Features
- **Fillable Mascot**: Silhouette that physically fills with XP as you level up.
- **Mobile-First UI**: Minimalist design optimized for centered interaction.
- **XP & Levels**: Gamified progress with real-time feedback.
- **Player Directory**: Browse other high-achievers.
- **Permanent Storage**: Integrated **PostgreSQL** via Railway for reliable data persistence.

## Deployment

### Frontend (GitHub Pages)
The frontend is configured to deploy via GitHub Actions.

### Backend (Recommended)
Since this app uses a Node.js/SQLite backend, we recommend deploying to **Render** or **Railway**.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/nani26-begin/resolution-tracker)

#### Steps for Render:
1. Click the button above.
2. Set the `Environment Variable` `DATABASE_URL` (Prisma will handle the rest).
3. Set the `JWT_SECRET`.
4. Once deployed, get your Render URL and update the `VITE_API_BASE_URL` in your GitHub Frontend deployment.

## Local Setup
1. `git clone https://github.com/nani26-begin/resolution-tracker.git`
2. `cd resolution-tracker`
3. Backend: `cd backend && npm install && npx prisma db push && npm run dev`
4. Frontend: `cd frontend && npm install && npm run dev`

Built with ❤️ by Kakumanu Ajit Babu
