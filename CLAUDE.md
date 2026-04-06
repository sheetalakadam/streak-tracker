# Claude Code — Project Context

## What this is
A React + TypeScript PWA streak tracker. Single-page app, no backend, no routing. All state lives in `localStorage` via `useHabits` hook.

## Commands

```bash
npm run dev      # start dev server at localhost:5173
npm run build    # type-check + production build → dist/
npm run lint     # ESLint
```

**Always use `--legacy-peer-deps` and `--cache /tmp/npm-cache` when installing packages:**
```bash
npm install --legacy-peer-deps --cache /tmp/npm-cache <package>
```
Reason: vite-plugin-pwa has a peer dep conflict with Vite 8 and the system npm cache has root-owned files.

## Architecture

### Data model (`src/types.ts`)
```ts
interface Habit {
  id: string
  name: string
  emoji: string
  color: string          // matches a name in HABIT_COLORS array
  createdAt: string      // "YYYY-MM-DD"
  completedDates: string[] // ["YYYY-MM-DD", ...]
  freezesRemaining: number
  frozenDates: string[]  // dates where freeze was used
}
```

### State management (`src/hooks/useHabits.ts`)
Single hook owns all habits state. Reads from localStorage on mount, writes on every mutation. Exposes: `habits`, `addHabit`, `deleteHabit`, `toggleToday`, `useFreeze`, `milestone`, `dismissMilestone`.

### Streak logic (`src/utils/streaks.ts`)
- `getCurrentStreak(habit)` — counts consecutive days backward from today; frozen dates count as completed
- `getLongestStreak(habit)` — scans full history for max consecutive run
- `getCompletionRate(habit, days?)` — % of last N days completed or frozen
- `getLast30Days()` — array of date strings for heatmap
- `checkNewMilestone(prevStreak, newStreak)` — returns MilestoneInfo if a threshold was just crossed

### Milestones
Defined in `MILESTONES` array in `src/types.ts`. Thresholds: 7, 14, 30, 60, 100 days. Milestone detection happens inside `toggleToday` in the hook. The modal + confetti fires in `MilestoneModal.tsx`.

### Colors
`HABIT_COLORS` in `src/types.ts` is the single source of truth for the 6 available colors. Each entry has `name`, `bg`, `ring`, `text`, `light` Tailwind classes. Always use this array — don't hardcode color classes.

### Dark mode
Toggled by adding/removing `dark` class on `<html>`. Persisted in `localStorage` key `dark-mode`. Initialized in `useDarkMode()` in `App.tsx`, respects `prefers-color-scheme` on first load.

## Patterns to follow
- New habit fields → add to `Habit` interface in `types.ts`, update `addHabit` default in `useHabits.ts`
- New streak calculations → add to `utils/streaks.ts`, keep functions pure
- New color options → add to `HABIT_COLORS` in `types.ts` only
- New milestone thresholds → add to `MILESTONES` array in `types.ts` only
- Styling: Tailwind only, no inline styles, no CSS modules. Use `dark:` variants for dark mode.

## What NOT to do
- Don't add a backend or database — localStorage is intentional
- Don't add a router — single page is intentional
- Don't install heavy UI libraries — Tailwind + custom components is the pattern
