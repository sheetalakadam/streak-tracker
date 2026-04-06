import type { Habit, MilestoneInfo } from '../types'
import { MILESTONES } from '../types'

export function toDateStr(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function today(): string {
  return toDateStr(new Date())
}

export function yesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return toDateStr(d)
}

export function isCompletedToday(habit: Habit): boolean {
  return habit.completedDates.includes(today())
}

// Returns Monday of the week containing the given date
function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay() // 0 = Sun, 1 = Mon ...
  const diff = (day === 0 ? -6 : 1 - day)
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function countDatesInWeek(dates: string[], weekStart: Date): number {
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 7)
  return dates.filter(d => {
    const dd = new Date(d)
    return dd >= weekStart && dd < weekEnd
  }).length
}

// ── Daily streak ──────────────────────────────────────────────────────────────

export function getCurrentDailyStreak(habit: Habit): number {
  const allDone = new Set([...habit.completedDates, ...habit.frozenDates])
  let streak = 0
  const d = new Date()
  if (!allDone.has(toDateStr(d))) d.setDate(d.getDate() - 1)
  while (allDone.has(toDateStr(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

export function getLongestDailyStreak(habit: Habit): number {
  if (habit.completedDates.length === 0) return 0
  const allDone = new Set([...habit.completedDates, ...habit.frozenDates])
  const sorted = [...allDone].sort()
  let max = 1, current = 1
  for (let i = 1; i < sorted.length; i++) {
    const diff = (new Date(sorted[i]).getTime() - new Date(sorted[i - 1]).getTime()) / 86400000
    if (diff === 1) { current++; max = Math.max(max, current) }
    else current = 1
  }
  return max
}

// ── Weekly streak ─────────────────────────────────────────────────────────────

export function getCurrentWeeklyStreak(habit: Habit): number {
  const target = habit.targetDaysPerWeek
  let streak = 0
  const now = new Date()
  let weekStart = getWeekStart(now)

  // Current week: only break streak if it's impossible to still hit target
  const doneThisWeek = countDatesInWeek(habit.completedDates, weekStart)
  const todayDow = now.getDay() === 0 ? 7 : now.getDay() // Mon=1..Sun=7
  const daysLeftInWeek = 8 - todayDow // including today
  if (doneThisWeek + daysLeftInWeek < target) return 0 // can't recover

  // Step back week by week
  weekStart.setDate(weekStart.getDate() - 7)
  while (true) {
    const done = countDatesInWeek(habit.completedDates, weekStart)
    if (done >= target) {
      streak++
      weekStart.setDate(weekStart.getDate() - 7)
    } else {
      break
    }
  }
  return streak
}

export function getLongestWeeklyStreak(habit: Habit): number {
  if (habit.completedDates.length === 0) return 0
  const target = habit.targetDaysPerWeek
  const earliest = new Date(habit.completedDates.slice().sort()[0])
  let weekStart = getWeekStart(earliest)
  const now = getWeekStart(new Date())
  let max = 0, current = 0

  while (weekStart <= now) {
    const done = countDatesInWeek(habit.completedDates, weekStart)
    if (done >= target) { current++; max = Math.max(max, current) }
    else current = 0
    weekStart.setDate(weekStart.getDate() + 7)
  }
  return max
}

export function getThisWeekProgress(habit: Habit): { done: number; target: number } {
  const weekStart = getWeekStart(new Date())
  const done = countDatesInWeek(habit.completedDates, weekStart)
  return { done, target: habit.targetDaysPerWeek }
}

// ── Unified helpers (picks daily or weekly based on habit.frequency) ──────────

export function getCurrentStreak(habit: Habit): number {
  return habit.frequency === 'weekly'
    ? getCurrentWeeklyStreak(habit)
    : getCurrentDailyStreak(habit)
}

export function getLongestStreak(habit: Habit): number {
  return habit.frequency === 'weekly'
    ? getLongestWeeklyStreak(habit)
    : getLongestDailyStreak(habit)
}

// ── Misc ──────────────────────────────────────────────────────────────────────

export function getCompletionRate(habit: Habit, days = 30): number {
  let done = 0
  const d = new Date()
  for (let i = 0; i < days; i++) {
    const ds = toDateStr(d)
    if (habit.completedDates.includes(ds) || habit.frozenDates.includes(ds)) done++
    d.setDate(d.getDate() - 1)
  }
  return Math.round((done / days) * 100)
}

export function getLast30Days(): string[] {
  const days: string[] = []
  const d = new Date()
  for (let i = 29; i >= 0; i--) {
    const copy = new Date(d)
    copy.setDate(d.getDate() - i)
    days.push(toDateStr(copy))
  }
  return days
}

export function checkNewMilestone(
  prevStreak: number,
  newStreak: number
): MilestoneInfo | null {
  for (const m of MILESTONES) {
    if (prevStreak < m.days && newStreak >= m.days) return m
  }
  return null
}
