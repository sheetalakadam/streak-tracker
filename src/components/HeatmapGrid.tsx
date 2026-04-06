import { getLast30Days } from '../utils/streaks'
import type { Habit } from '../types'
import { HABIT_COLORS } from '../types'

interface Props {
  habit: Habit
}

export function HeatmapGrid({ habit }: Props) {
  const days = getLast30Days()
  const color = HABIT_COLORS.find(c => c.name === habit.color) ?? HABIT_COLORS[0]
  const today = days[days.length - 1]

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-1">
        {days.map(d => {
          const done = habit.completedDates.includes(d)
          const frozen = habit.frozenDates.includes(d)
          const isToday = d === today

          return (
            <div
              key={d}
              title={d}
              className={[
                'w-5 h-5 rounded-md transition-all',
                isToday ? 'ring-2 ring-offset-1 ring-warm-muted dark:ring-[#9c9080]' : '',
                done
                  ? `${color.bg} opacity-85`
                  : frozen
                  ? 'bg-teal-light/70 dark:bg-teal-dark/50'
                  : 'bg-warm-faint/50 dark:bg-dusk-border/70',
              ].join(' ')}
            />
          )
        })}
      </div>
      <div className="flex gap-3 mt-2 text-xs text-warm-muted dark:text-[#9c9080]">
        <span className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded-sm ${color.bg}`} /> Done
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-teal-light/70" /> Freeze used
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-warm-faint/50" /> Missed
        </span>
      </div>
    </div>
  )
}
