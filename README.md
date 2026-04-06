# 🔥 Streak Tracker

A mobile-first PWA for tracking daily habit streaks. Installable on iPhone via Safari — no App Store needed.

## Features

- Add/delete habits with custom emoji and color
- Mark habits done each day — streaks auto-calculate
- 30-day heatmap calendar per habit
- Milestone celebrations at 7 / 14 / 30 / 60 / 100 days (confetti)
- Streak freeze tokens (2 per habit) — protect a streak if you miss a day
- Completion rate % over 30 days
- Dark mode (respects system preference, toggleable)
- All data stored locally in `localStorage` — no account needed
- Offline-capable via service worker (PWA)

## Running locally

```bash
npm install
npm run dev
# open http://localhost:5173
```

## Build for production

```bash
npm run build
# output goes to dist/
```

## Install on iPhone

1. Build and deploy (or run locally on your network)
2. Open in Safari on iPhone
3. Tap Share → "Add to Home Screen"
4. App opens in fullscreen standalone mode

## Tech stack

- React 18 + TypeScript
- Vite 8
- Tailwind CSS v3
- vite-plugin-pwa (Workbox)
- canvas-confetti
- localStorage (no backend)

## Codebase overview

```
src/
├── types.ts              # Habit interface, MILESTONES, HABIT_COLORS constants
├── utils/streaks.ts      # getCurrentStreak, getLongestStreak, getCompletionRate, getLast30Days
├── hooks/useHabits.ts    # All state + localStorage persistence + milestone detection
├── components/
│   ├── Header.tsx        # Top bar with dark mode toggle and Add button
│   ├── HabitCard.tsx     # Per-habit card: streak, mark done, expand for heatmap
│   ├── HeatmapGrid.tsx   # 30-day dot grid
│   ├── AddHabitModal.tsx # Modal to create a new habit (emoji, name, color)
│   └── MilestoneModal.tsx# Celebration modal + confetti on milestone hit
└── App.tsx               # Root: summary bar, habit list, modal orchestration
```

## Want to add new features or instructions?

Edit [`INSTRUCTIONS.md`](./INSTRUCTIONS.md) and share it with Claude Code.
