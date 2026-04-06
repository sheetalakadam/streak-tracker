import { useState, useCallback } from 'react'
import type { Habit, MilestoneInfo } from '../types'
import { getCurrentStreak, checkNewMilestone, today } from '../utils/streaks'

const STORAGE_KEY = 'streak-tracker-habits'

// Migrate old habits that don't have the new fields
function migrate(habits: Habit[]): Habit[] {
  return habits.map(h => ({
    ...h,
    frequency: h.frequency ?? ('daily' as const),
    targetDaysPerWeek: h.targetDaysPerWeek ?? 7,
  }))
}

function load(): Habit[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return migrate(raw)
  } catch {
    return []
  }
}

function save(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(load)
  const [milestone, setMilestone] = useState<MilestoneInfo | null>(null)

  const update = useCallback((next: Habit[]) => {
    save(next)
    setHabits(next)
  }, [])

  const addHabit = useCallback((
    name: string,
    emoji: string,
    color: string,
    frequency: 'daily' | 'weekly' = 'daily',
    targetDaysPerWeek = 7,
  ) => {
    const habit: Habit = {
      id: crypto.randomUUID(),
      name,
      emoji,
      color,
      createdAt: today(),
      completedDates: [],
      freezesRemaining: 2,
      frozenDates: [],
      frequency,
      targetDaysPerWeek,
    }
    update([...habits, habit])
  }, [habits, update])

  const deleteHabit = useCallback((id: string) => {
    update(habits.filter(h => h.id !== id))
  }, [habits, update])

  const editHabit = useCallback((
    id: string,
    name: string,
    emoji: string,
    color: string,
    frequency: 'daily' | 'weekly',
    targetDaysPerWeek: number,
  ) => {
    update(habits.map(h => h.id !== id ? h : { ...h, name, emoji, color, frequency, targetDaysPerWeek }))
  }, [habits, update])

  const toggleToday = useCallback((id: string) => {
    const next = habits.map(h => {
      if (h.id !== id) return h
      const todayStr = today()
      const wasCompleted = h.completedDates.includes(todayStr)
      const prevStreak = getCurrentStreak(h)

      const updated: Habit = {
        ...h,
        completedDates: wasCompleted
          ? h.completedDates.filter(d => d !== todayStr)
          : [...h.completedDates, todayStr],
      }

      if (!wasCompleted) {
        const newStreak = getCurrentStreak(updated)
        const hit = checkNewMilestone(prevStreak, newStreak)
        if (hit) setMilestone(hit)
      }

      return updated
    })
    update(next)
  }, [habits, update])

  const useFreeze = useCallback((id: string) => {
    const next = habits.map(h => {
      if (h.id !== id || h.freezesRemaining === 0) return h
      const d = new Date()
      d.setDate(d.getDate() - 1)
      const yest = d.toISOString().slice(0, 10)
      if (h.frozenDates.includes(yest) || h.completedDates.includes(yest)) return h
      return {
        ...h,
        freezesRemaining: h.freezesRemaining - 1,
        frozenDates: [...h.frozenDates, yest],
      }
    })
    update(next)
  }, [habits, update])

  const dismissMilestone = useCallback(() => setMilestone(null), [])

  return { habits, addHabit, editHabit, deleteHabit, toggleToday, useFreeze, milestone, dismissMilestone }
}
