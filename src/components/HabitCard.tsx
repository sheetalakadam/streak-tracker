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
  onEdit: () => void
}

export function HabitCard({ habit, onToggle, onDelete, onFreeze, onEdit }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
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
      'relative paper-texture rounded-2xl transition-all overflow-hidden',
      cardDone
        ? 'shadow-paper-lg ring-2 bg-[#eef6ec]/90 dark:bg-[#1e2e1e]/80 ' + color.ring
        : 'shadow-paper border border-warm-faint/50 dark:border-dusk-border bg-card/85 dark:bg-dusk-card/85',
    ].join(' ')}>
      <div className="p-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${color.light}`}>
              {habit.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-warm dark:text-[#e8dcc8] truncate">{habit.name}</p>
                {isWeekly && (
                  <span className="text-xs bg-warm-faint/70 dark:bg-dusk-border text-warm-muted dark:text-[#b0a898] px-1.5 py-0.5 rounded-lg flex-shrink-0">
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

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Edit button */}
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg text-warm-faint hover:text-teal hover:bg-teal/10 transition-colors"
              title="Edit habit"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Delete button — always visible */}
            {confirmDelete ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onDelete()}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg font-bold"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs bg-warm-faint dark:bg-dusk-border text-warm-muted dark:text-[#b0a898] px-2 py-1 rounded-lg font-bold"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="p-1.5 rounded-lg text-warm-faint hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Delete habit"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 3h12M5 3V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M11 3l-.9 8.1A1 1 0 0 1 9.1 12H4.9a1 1 0 0 1-1-.9L3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {/* Mark done button */}
            <button
              onClick={onToggle}
              className={[
                'px-3 py-1.5 rounded-xl text-sm font-bold transition-all',
                done
                  ? `${color.bg} text-white shadow-sm scale-95`
                  : 'bg-warm-faint/60 dark:bg-dusk-border text-warm dark:text-[#c0b8a8] hover:bg-warm-faint dark:hover:bg-[#4a4f65] active:scale-90',
              ].join(' ')}
            >
              {done ? '✓ Done' : 'Mark Done'}
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-3 flex items-center gap-3 text-xs text-warm-muted dark:text-[#9c9080]">
          <span>{isWeekly ? `🔥 ${streak} wk${streak !== 1 ? 's' : ''}` : `🔥 ${streak}d`}</span>
          <span>🏆 {longest} best</span>
          <span>📊 {rate}%</span>
          {habit.freezesRemaining > 0 && <span>🧊 {habit.freezesRemaining}</span>}
          <button
            onClick={() => setExpanded(e => !e)}
            className="ml-auto text-warm-muted hover:text-warm dark:hover:text-[#e8dcc8] transition-colors"
          >
            {expanded ? '▲ Hide' : '▼ History'}
          </button>
        </div>

        {expanded && (
          <div className="mt-2">
            <HeatmapGrid habit={habit} />
            {habit.freezesRemaining > 0 && !isWeekly && (
              <button
                onClick={onFreeze}
                className="mt-3 text-xs bg-[#a8c8da]/30 text-teal-dark dark:text-teal-light px-2.5 py-1 rounded-lg hover:bg-[#a8c8da]/50 transition-colors"
              >
                🧊 Use Freeze
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
