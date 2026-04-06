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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-cream dark:bg-night-card rounded-3xl shadow-ghibli-lg border border-parchment dark:border-night-border p-6 overflow-y-auto max-h-[85svh] paper-texture">
        <h2 className="text-xl font-black text-ink dark:text-[#e8dcc8] mb-4">New Habit</h2>

        <div className="space-y-4">
          {/* Emoji picker */}
          <div>
            <label className="text-xs font-bold text-ink-muted dark:text-[#9c9080] uppercase tracking-wider mb-2 block">Icon</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_PRESETS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-2xl text-xl flex items-center justify-center transition-all ${
                    emoji === e
                      ? 'ring-2 ring-sage bg-sage/10 scale-110'
                      : 'bg-parchment dark:bg-night-border hover:bg-[#e8dcc8] dark:hover:bg-[#4a4770]'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="text-xs font-bold text-ink-muted dark:text-[#9c9080] uppercase tracking-wider mb-2 block">Habit Name</label>
            <input
              type="text"
              placeholder="e.g. Morning Run"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={40}
              className="w-full px-3 py-2.5 rounded-2xl border-2 border-parchment dark:border-night-border bg-white/60 dark:bg-night/60 text-ink dark:text-[#e8dcc8] placeholder-ink-muted dark:placeholder-[#6b6050] focus:outline-none focus:border-sage dark:focus:border-sage transition"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="text-xs font-bold text-ink-muted dark:text-[#9c9080] uppercase tracking-wider mb-2 block">Frequency</label>
            <div className="flex gap-2">
              {(['daily', 'weekly'] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`flex-1 py-2 rounded-2xl text-sm font-bold transition-colors capitalize ${
                    frequency === f
                      ? 'bg-sage text-white shadow-ghibli'
                      : 'bg-parchment dark:bg-night-border text-ink-light dark:text-[#c0b8a8]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {frequency === 'weekly' && (
              <div className="mt-3">
                <p className="text-xs text-ink-muted dark:text-[#9c9080] mb-2">Times per week</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setTargetDays(n)}
                      className={`w-9 h-9 rounded-xl text-sm font-bold transition-colors ${
                        targetDays === n
                          ? 'bg-sage text-white'
                          : 'bg-parchment dark:bg-night-border text-ink-light dark:text-[#c0b8a8]'
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
            <label className="text-xs font-bold text-ink-muted dark:text-[#9c9080] uppercase tracking-wider mb-2 block">Color</label>
            <div className="flex gap-2">
              {HABIT_COLORS.map(c => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  className={`w-8 h-8 rounded-full ${c.bg} transition-all ${
                    color === c.name ? 'ring-2 ring-offset-2 ring-ink-muted scale-110' : 'opacity-60 hover:opacity-90'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border-2 border-parchment dark:border-night-border text-ink-light dark:text-[#c0b8a8] font-bold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 py-3 rounded-2xl font-black text-white transition-colors ${
                name.trim()
                  ? 'bg-sage hover:bg-sage-dark shadow-ghibli'
                  : 'bg-sage/40 cursor-not-allowed'
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
