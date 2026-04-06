import { useState } from 'react'
import { HABIT_COLORS } from '../types'

const EMOJI_PRESETS = ['🏋️', '📚', '🧘', '🏃', '💧', '🎯', '✍️', '🎸', '🥗', '😴', '💊', '🌿']

interface Props {
  onAdd: (name: string, emoji: string, color: string, frequency: 'daily' | 'weekly', targetDaysPerWeek: number) => void
  onClose: () => void
}

export function AddHabitModal({ onAdd, onClose }: Props) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🎯')
  const [color, setColor] = useState('orange')
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily')
  const [targetDays, setTargetDays] = useState(3)

  const handleAdd = () => {
    if (!name.trim()) return
    onAdd(name.trim(), emoji, color, frequency, frequency === 'daily' ? 7 : targetDays)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[85svh]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">New Habit</h2>

        <div className="space-y-4">
          {/* Emoji picker */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 block">Icon</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_PRESETS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                    emoji === e
                      ? 'ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/30 scale-110'
                      : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 block">
              Habit Name
            </label>
            <input
              type="text"
              placeholder="e.g. Morning Run"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={40}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 block">Frequency</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFrequency('daily')}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  frequency === 'daily'
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setFrequency('weekly')}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  frequency === 'weekly'
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Weekly
              </button>
            </div>

            {frequency === 'weekly' && (
              <div className="mt-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Times per week</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setTargetDays(n)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                        targetDays === n
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Color picker */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 block">Color</label>
            <div className="flex gap-2">
              {HABIT_COLORS.map(c => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  className={`w-8 h-8 rounded-full ${c.bg} transition-all ${
                    color === c.name ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : 'opacity-70'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 py-3 rounded-xl text-white font-semibold transition-colors ${
                name.trim()
                  ? 'bg-orange-500 active:bg-orange-600'
                  : 'bg-orange-300 dark:bg-orange-800 cursor-not-allowed'
              }`}
            >
              Add Habit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
