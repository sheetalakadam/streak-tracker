import { useState } from 'react'
import { HABIT_COLORS } from '../types'

const EMOJI_PRESETS = ['🏋️', '📚', '🧘', '🏃', '💧', '🎯', '✍️', '🎸', '🥗', '😴', '💊', '🌿']

interface InitialValues {
  name: string
  emoji: string
  color: string
  frequency: 'daily' | 'weekly'
  targetDaysPerWeek: number
}

interface Props {
  onSave: (name: string, emoji: string, color: string, frequency: 'daily' | 'weekly', targetDaysPerWeek: number) => void
  onClose: () => void
  initialValues?: InitialValues
}

export function AddHabitModal({ onSave, onClose, initialValues }: Props) {
  const isEditing = !!initialValues
  const [name, setName] = useState(initialValues?.name ?? '')
  const [emoji, setEmoji] = useState(initialValues?.emoji ?? '🎯')
  const [color, setColor] = useState(initialValues?.color ?? 'teal')
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>(initialValues?.frequency ?? 'daily')
  const [targetDays, setTargetDays] = useState(initialValues?.targetDaysPerWeek ?? 3)

  const handleAdd = () => {
    if (!name.trim()) return
    onSave(name.trim(), emoji, color, frequency, frequency === 'daily' ? 7 : targetDays)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-warm/30 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-card dark:bg-dusk-card rounded-3xl shadow-paper-lg border border-warm-faint/50 dark:border-dusk-border p-6 overflow-y-auto max-h-[85svh] paper-texture">
        <h2 className="text-2xl font-black text-warm dark:text-[#e8dcc8] mb-4">{isEditing ? 'Edit Habit' : 'New Habit'}</h2>

        <div className="space-y-4">
          {/* Emoji */}
          <div>
            <label className="text-xs font-bold text-warm-muted dark:text-[#9c9080] uppercase tracking-wider mb-2 block">Icon</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_PRESETS.map(e => (
                <button key={e} type="button" onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-2xl text-xl flex items-center justify-center transition-all ${
                    emoji === e
                      ? 'ring-2 ring-teal bg-teal/10 scale-110'
                      : 'bg-warm-faint/40 dark:bg-dusk-border hover:bg-warm-faint dark:hover:bg-[#4a4f65]'
                  }`}>{e}</button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-bold text-warm-muted dark:text-[#9c9080] uppercase tracking-wider mb-2 block">Habit Name</label>
            <input
              type="text"
              placeholder="e.g. Morning Run"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={40}
              className="w-full px-3 py-2.5 rounded-2xl border-2 border-warm-faint/60 dark:border-dusk-border bg-white/50 dark:bg-dusk/60 text-warm dark:text-[#e8dcc8] placeholder-warm-muted/60 focus:outline-none focus:border-teal dark:focus:border-teal transition"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="text-xs font-bold text-warm-muted dark:text-[#9c9080] uppercase tracking-wider mb-2 block">Frequency</label>
            <div className="flex gap-2">
              {(['daily', 'weekly'] as const).map(f => (
                <button key={f} type="button" onClick={() => setFrequency(f)}
                  className={`flex-1 py-2 rounded-2xl text-sm font-bold transition-colors capitalize ${
                    frequency === f
                      ? 'bg-teal text-white shadow-paper'
                      : 'bg-warm-faint/40 dark:bg-dusk-border text-warm-muted dark:text-[#c0b8a8]'
                  }`}>{f}</button>
              ))}
            </div>
            {frequency === 'weekly' && (
              <div className="mt-3">
                <p className="text-xs text-warm-muted dark:text-[#9c9080] mb-2">Times per week</p>
                <div className="flex gap-2">
                  {[1,2,3,4,5,6,7].map(n => (
                    <button key={n} type="button" onClick={() => setTargetDays(n)}
                      className={`w-9 h-9 rounded-xl text-sm font-bold transition-colors ${
                        targetDays === n
                          ? 'bg-teal text-white'
                          : 'bg-warm-faint/40 dark:bg-dusk-border text-warm-muted dark:text-[#c0b8a8]'
                      }`}>{n}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Color */}
          <div>
            <label className="text-xs font-bold text-warm-muted dark:text-[#9c9080] uppercase tracking-wider mb-2 block">Color</label>
            <div className="flex gap-2">
              {HABIT_COLORS.map(c => (
                <button key={c.name} type="button" onClick={() => setColor(c.name)}
                  className={`w-8 h-8 rounded-full ${c.bg} transition-all ${
                    color === c.name ? 'ring-2 ring-offset-2 ring-warm-muted scale-110' : 'opacity-60 hover:opacity-90'
                  }`} />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-2xl border-2 border-warm-faint/60 dark:border-dusk-border text-warm-muted dark:text-[#c0b8a8] font-bold">
              Cancel
            </button>
            <button type="button" onClick={handleAdd}
              className={`flex-1 py-3 rounded-2xl font-black text-white transition-colors ${
                name.trim() ? 'bg-teal hover:bg-teal-dark shadow-paper' : 'bg-teal/40 cursor-not-allowed'
              }`}>
              {isEditing ? 'Save Changes' : 'Add Habit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
