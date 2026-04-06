# 🌿 Streak Tracker

A Ghibli-inspired mobile-first PWA for tracking daily and weekly habit streaks. Installable on iPhone — no App Store needed.

**Live:** https://streak-tracker-chi-two.vercel.app

## Features

- Add/delete habits with custom emoji and color
- **Daily or weekly** frequency — e.g. "Gym 3x per week"
- Mark habits done each day — streaks auto-calculate
- 30-day heatmap calendar per habit
- Milestone celebrations at 7 / 14 / 30 / 60 / 100 days (confetti)
- Streak freeze tokens (2 per habit) — protect a streak if you miss a day
- Completion rate % over 30 days
- Daily push notification reminder (browser Notifications API)
- Dark mode (respects system preference, toggleable)
- All data in `localStorage` — no account, no backend
- Offline-capable PWA (service worker)

## Install on iPhone

1. Open https://streak-tracker-chi-two.vercel.app in Safari
2. Tap Share → "Add to Home Screen"
3. App opens fullscreen, works offline

## Running locally

```bash
npm install
npm run dev
# open http://localhost:5173
```

## Deploy

```bash
npm run build   # verify build passes first
vercel --prod
```

## Tech stack

- React 18 + TypeScript
- Vite 8 + vite-plugin-pwa (Workbox)
- Tailwind CSS v3
- Nunito font (Google Fonts)
- canvas-confetti
- localStorage (no backend)
- Vercel (hosting)

## Codebase

```
src/
├── types.ts              # Habit interface, MILESTONES, HABIT_COLORS
├── utils/streaks.ts      # All streak calculation logic (pure functions)
├── hooks/
│   ├── useHabits.ts      # State + localStorage + milestone detection
│   └── useNotifications.ts # Browser notification reminder
├── components/
│   ├── Header.tsx
│   ├── HabitCard.tsx     # Card with delete confirm, heatmap expand
│   ├── HeatmapGrid.tsx   # 30-day dot grid
│   ├── AddHabitModal.tsx # Create habit (emoji, name, frequency, color)
│   ├── MilestoneModal.tsx# Celebration + confetti
│   └── NotificationSettings.tsx
└── App.tsx               # Root: summary bar, habit list, modal orchestration
```

## Want to add features?

Edit [`INSTRUCTIONS.md`](./INSTRUCTIONS.md) — add items under TODO, then tell Claude Code to implement them.
