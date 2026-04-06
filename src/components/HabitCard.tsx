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
  const weekDone = isWeekly && weekProgress ? weekProgress.done >= weekProgress.target : false
  const cardDone = isWeekly ? weekDone : done

  return (
    <div className={[
      'rounded-3xl transition-all paper-texture',
      'bg-white/80 dark:bg-night-card/80',
      cardDone
        ? 'shadow-ghibli-lg ring-2 ' + color.ring
        : 'shadow-ghibli border border-parchment dark:border-night-border',
    ].join(' ')}>
      <div className="p-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${color.light}`}>
              {habit.emoji}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-ink dark:text-[#e8dcc8] truncate">{habit.name}</p>
                {isWeekly && (
                  <span className="text-xs bg-parchment dark:bg-night-border text-ink-muted dark:text-[#b0a898] px-1.5 py-0.5 rounded-lg flex-shrink-0">
                    {habit.targetDaysPerWeek}×/wk
                  </span>
                )}
              </div>
              <p className={`text-sm font-semibold ${color.text}`}>
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

          <button
            onClick={onToggle}
            className={[
              'flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-bold transition-all',
              done
                ? `${color.bg} text-white shadow-sm scale-95`
                : 'bg-parchment dark:bg-night-border text-ink-light dark:text-[#c0b8a8] hover:bg-[#e8dcc8] dark:hover:bg-[#4a4770]',
            ].join(' ')}
          >
            {done ? '✓ Done' : 'Mark Done'}
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-3 flex items-center gap-3 text-xs text-ink-muted dark:text-[#9c9080]">
          {isWeekly
            ? <span>🔥 {streak} wk{streak !== 1 ? 's' : ''}</span>
            : <span>🔥 {streak}d</span>
          }
          <span>🏆 {longest} best</span>
          <span>📊 {rate}%</span>
          {habit.freezesRemaining > 0 && <span>🧊 {habit.freezesRemaining}</span>}
          <button
            onClick={() => setExpanded(e => !e)}
            className="ml-auto text-ink-muted dark:text-[#9c9080] hover:text-ink dark:hover:text-[#e8dcc8] transition-colors text-xs"
          >
            {expanded ? '▲ Hide' : '▼ History'}
          </button>
        </div>

        {expanded && (
          <div className="mt-2">
            <HeatmapGrid habit={habit} />
            <div className="mt-3 flex gap-2">
              {habit.freezesRemaining > 0 && !isWeekly && (
                <button
                  onClick={onFreeze}
                  className="text-xs bg-sky/20 text-sky-600 dark:text-sky px-2.5 py-1 rounded-lg hover:bg-sky/30 transition-colors"
                >
                  🧊 Use Freeze
                </button>
              )}
              <button
                onClick={onDelete}
                className="text-xs bg-red-50 dark:bg-red-900/20 text-red-400 px-2.5 py-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors ml-auto"
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
