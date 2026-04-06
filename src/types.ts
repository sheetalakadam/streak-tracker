export interface Habit {
  id: string
  name: string
  emoji: string
  color: string // tailwind color class e.g. 'orange', 'blue'
  createdAt: string // ISO date string YYYY-MM-DD
  completedDates: string[] // ["2026-04-01", ...]
  freezesRemaining: number // streak freeze tokens
  frozenDates: string[] // dates where freeze was used
}

export interface MilestoneInfo {
  days: number
  label: string
  icon: string
}

export const MILESTONES: MilestoneInfo[] = [
  { days: 7,   label: '1 Week!',    icon: '🥉' },
  { days: 14,  label: '2 Weeks!',   icon: '🥈' },
  { days: 30,  label: '1 Month!',   icon: '🥇' },
  { days: 60,  label: '2 Months!',  icon: '🏆' },
  { days: 100, label: '100 Days!',  icon: '🔥' },
]

export const HABIT_COLORS = [
  { name: 'orange', bg: 'bg-orange-500', ring: 'ring-orange-400', text: 'text-orange-500', light: 'bg-orange-100 dark:bg-orange-900/30' },
  { name: 'blue',   bg: 'bg-blue-500',   ring: 'ring-blue-400',   text: 'text-blue-500',   light: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'green',  bg: 'bg-green-500',  ring: 'ring-green-400',  text: 'text-green-500',  light: 'bg-green-100 dark:bg-green-900/30' },
  { name: 'purple', bg: 'bg-purple-500', ring: 'ring-purple-400', text: 'text-purple-500', light: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'rose',   bg: 'bg-rose-500',   ring: 'ring-rose-400',   text: 'text-rose-500',   light: 'bg-rose-100 dark:bg-rose-900/30' },
  { name: 'teal',   bg: 'bg-teal-500',   ring: 'ring-teal-400',   text: 'text-teal-500',   light: 'bg-teal-100 dark:bg-teal-900/30' },
]
