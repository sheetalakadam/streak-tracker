# Claude Code — Project Context

## What this is
A React + TypeScript PWA streak tracker. Single-page app, no backend, no routing. All state lives in `localStorage` via `useHabits` hook. Deployed on Vercel.

**Live URL:** https://streak-tracker-chi-two.vercel.app
**GitHub:** https://github.com/sheetalakadam/streak-tracker

## RULE: Always build before committing
**Always run `npm run build` and confirm it succeeds before every `git commit`.** The dev server and production build process CSS differently — bugs can slip through one but not the other.

## Commands

```bash
npm run dev      # start dev server at localhost:5173
npm run build    # type-check + production build → dist/
npm run lint     # ESLint
vercel --prod    # deploy to production
```

**Always use `--legacy-peer-deps` and `--cache /tmp/npm-cache` when installing packages:**
```bash
npm install --legacy-peer-deps --cache /tmp/npm-cache <package>
```
Reason: vite-plugin-pwa has a peer dep conflict with Vite 8. `.npmrc` already sets `legacy-peer-deps=true` so Vercel builds work, but local installs still need `--cache /tmp/npm-cache` due to root-owned npm cache files.

## Design system

### Font
**Nunito** only. Do NOT use Caveat or any cursive/italic font — user explicitly rejected it.

### Color palette (tailwind.config.js)
```
Light mode:
  paper    #f5f0e8   aged paper background
  card     #faf7f2   card surfaces
  teal     #5b8fa8   primary action (buttons, focus rings)
  terra    #c1624a   accent / fire color
  moss     #6e8f5b   secondary green
  warm     #6b5a3e   body text
  warm-muted #9c8a6e secondary text
  warm-faint #d4c8b4 borders, muted backgrounds

Dark mode:
  dusk         #1e2233  page background
  dusk-card    #272b3d  card background
  dusk-border  #3a3f55  borders

Background: CSS gradient (sky blue → warm cream in light, night indigo in dark)
```

### Shadows
- `shadow-paper` — default card shadow (warm tinted)
- `shadow-paper-lg` — elevated / active card shadow

### Texture
`.paper-texture` class — CSS pseudo-element with SVG noise grain. Apply to cards and modals. Children need no special treatment (z-index handled).

### HABIT_COLORS
Defined in `src/types.ts`. Each entry: `{ name, bg, ring, text, light }`. Always use this array, never hardcode color classes for habit colors.

## Architecture

### Data model (`src/types.ts`)
```ts
interface Habit {
  id: string
  name: string
  emoji: string
  color: string          // name from HABIT_COLORS
  createdAt: string      // "YYYY-MM-DD"
  completedDates: string[]
  freezesRemaining: number
  frozenDates: string[]
  frequency: 'daily' | 'weekly'
  targetDaysPerWeek: number  // 7 for daily, 1–7 for weekly
}
```
Old habits without `frequency`/`targetDaysPerWeek` are migrated in `load()` in `useHabits.ts`.

### State (`src/hooks/useHabits.ts`)
Single hook, owns all habits state. Reads localStorage on mount, writes on every mutation. Exposes: `habits`, `addHabit`, `deleteHabit`, `toggleToday`, `useFreeze`, `milestone`, `dismissMilestone`.

### Notifications (`src/hooks/useNotifications.ts`)
Stores reminder time in localStorage key `streak-reminder-time`. Uses `setInterval` (60s) to check if current time matches. Fires `new Notification(...)` for incomplete habits. Works only when app/PWA is open.

### Streak logic (`src/utils/streaks.ts`)
- `getCurrentStreak(habit)` — dispatches to daily or weekly based on `habit.frequency`
- `getCurrentDailyStreak` — consecutive days backward from today; frozen dates count
- `getCurrentWeeklyStreak` — consecutive successful weeks (week = Mon–Sun)
- `getLongestStreak(habit)` — same dispatch pattern
- `getThisWeekProgress(habit)` — `{ done, target }` for weekly habits
- `getCompletionRate(habit, days?)` — % of last N days done or frozen
- `getLast30Days()` — date string array for heatmap
- `checkNewMilestone(prev, new)` — returns MilestoneInfo if threshold crossed

### Milestones
`MILESTONES` in `src/types.ts`. Thresholds: 7, 14, 30, 60, 100. Detection in `toggleToday`.

## Patterns to follow
- New habit fields → `Habit` interface in `types.ts` + default in `migrate()` in `useHabits.ts`
- New streak logic → pure functions in `utils/streaks.ts`
- New colors → `HABIT_COLORS` in `types.ts` only
- New milestones → `MILESTONES` in `types.ts` only
- Styling → Tailwind only, `dark:` variants, no inline styles

## What NOT to do
- Don't add a backend or database — localStorage is intentional
- Don't add a router — single page is intentional
- Don't use Caveat or any cursive font — user rejected it
- Don't use `@apply` with custom Tailwind color names in CSS files — breaks dev server
- Don't install packages without `--legacy-peer-deps --cache /tmp/npm-cache`
