import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import type { MilestoneInfo } from '../types'

interface Props {
  milestone: MilestoneInfo
  habitName: string
  onClose: () => void
}

export function MilestoneModal({ milestone, habitName, onClose }: Props) {
  useEffect(() => {
    // Burst of confetti on mount
    const end = Date.now() + 2000
    const colors = ['#f97316', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="text-center bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 max-w-xs w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-7xl mb-3">{milestone.icon}</div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
          {milestone.label}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-1">
          <span className="font-semibold text-orange-500">{habitName}</span>
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          You've reached a <span className="font-semibold">{milestone.days}-day streak</span>. Keep it up!
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition-colors"
        >
          Let's go! 🔥
        </button>
      </div>
    </div>
  )
}
