import { useState } from 'react'
import type { Habit } from '../types'
import { HABIT_COLORS } from '../types'
import { getCurrentStreak, getLongestStreak, getCompletionRate, isCompletedToday, getThisWeekProgress } from '../utils/streaks'
import { HeatmapGrid } from './HeatmapGrid'

interface Props {
  habit: Habit
  onToggle: () => void
  onDelete: () => void
  onFreeze: () => void
}

export function HabitCard({ habit, onToggle, onDelete, onFreeze }: Props) {
  const [expanded, setExpanded] = useState(false)
  const color = HABIT_COLORS.find(c => c.name === habit.color) ?? HABIT_COLORS[0]
  const streak = getCurrentStreak(habit)
  const longest = getLongestStreak(habit)
  const rate = getCompletionRate(habit)
  const done = isCompletedToday(habit)
  const isWeekly = habit.frequency === 'weekly'
  const weekProgress = isWeekly ? getThisWeekProgress(habit) : null

  // For weekly habits, card highlights green when week target is met
  const weekDone = isWeekly && weekProgress ? weekProgress.done >= weekProgress.target : false
  const cardDone = isWeekly ? weekDone : done

  return (
    <div className={`rounded-2xl border transition-all shadow-sm ${
      cardDone
        ? 'border-transparent bg-white dark:bg-slate-800 ring-2 ' + color.ring
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
    }`}>
      <div className="p-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${color.light}`}>
              {habit.emoji}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-slate-900 dark:text-white truncate">{habit.name}</p>
                {isWeekly && (
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-md flex-shrink-0">
                    {habit.targetDaysPerWeek}×/wk
                  </span>
                )}
              </div>
              <p className={`text-sm font-medium ${color.text}`}>
                {isWeekly
                  ? weekProgress
                    ? weekProgress.done >= weekProgress.target
                      ? `✅ Week done! ${weekProgress.done}/${weekProgress.target}`
                      : `${weekProgress.done}/${weekProgress.target} this week`
                    : ''
                  : streak > 0
                    ? `🔥 ${streak} day${streak !== 1 ? 's' : ''}`
                    : '💔 Start today!'
                }
              </p>
            </div>
          </div>

          {/* Mark done button */}
          <button
            onClick={onToggle}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              done
                ? `${color.bg} text-white shadow-sm scale-95`
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {done ? '✓ Done' : 'Mark Done'}
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          {isWeekly ? (
            <span title="Weekly streak">🔥 {streak} wk{streak !== 1 ? 's' : ''}</span>
          ) : (
            <span title="Current streak">🔥 {streak}d</span>
          )}
          <span title="Longest streak">🏆 {longest} best</span>
          <span title="30-day completion rate">📊 {rate}%</span>
          {habit.freezesRemaining > 0 && (
            <span title="Streak freezes remaining">🧊 {habit.freezesRemaining}</span>
          )}
          <button
            onClick={() => setExpanded(e => !e)}
            className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            {expanded ? '▲ Hide' : '▼ History'}
          </button>
        </div>

        {/* Heatmap */}
        {expanded && (
          <div className="mt-1">
            <HeatmapGrid habit={habit} />
            <div className="mt-3 flex gap-2">
              {habit.freezesRemaining > 0 && !isWeekly && (
                <button
                  onClick={onFreeze}
                  className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  title="Freeze yesterday to protect your streak"
                >
                  🧊 Use Freeze
                </button>
              )}
              <button
                onClick={onDelete}
                className="text-xs bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 px-2 py-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors ml-auto"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
