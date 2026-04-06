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

export function getCurrentStreak(habit: Habit): number {
  const allDone = new Set([...habit.completedDates, ...habit.frozenDates])
  let streak = 0
  const d = new Date()

  // If not done today and not frozen today, start checking from yesterday
  if (!allDone.has(toDateStr(d))) {
    d.setDate(d.getDate() - 1)
  }

  while (allDone.has(toDateStr(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }

  return streak
}

export function getLongestStreak(habit: Habit): number {
  if (habit.completedDates.length === 0) return 0

  const allDone = new Set([...habit.completedDates, ...habit.frozenDates])
  const sorted = [...allDone].sort()

  let max = 1
  let current = 1

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const curr = new Date(sorted[i])
    const diffDays = (curr.getTime() - prev.getTime()) / 86400000

    if (diffDays === 1) {
      current++
      max = Math.max(max, current)
    } else {
      current = 1
    }
  }

  return max
}

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
