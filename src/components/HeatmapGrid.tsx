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
                'w-5 h-5 rounded-sm transition-all',
                isToday ? 'ring-2 ring-offset-1 ring-slate-400 dark:ring-slate-500' : '',
                done
                  ? `${color.bg} opacity-90`
                  : frozen
                  ? 'bg-blue-300 dark:bg-blue-700 opacity-70'
                  : 'bg-slate-200 dark:bg-slate-700',
              ].join(' ')}
            />
          )
        })}
      </div>
      <div className="flex gap-3 mt-1.5 text-xs text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded-sm ${color.bg}`} /> Done
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-blue-300 dark:bg-blue-700" /> Freeze used
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700" /> Missed
        </span>
      </div>
    </div>
  )
}
