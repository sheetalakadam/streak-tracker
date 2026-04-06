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
    const end = Date.now() + 2500
    const colors = ['#5b8fa8', '#a8c8da', '#c1624a', '#e8956d', '#f5f0e8']
    const frame = () => {
      confetti({ particleCount: 3, angle: 60,  spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative paper-texture text-center bg-card dark:bg-dusk-card rounded-3xl shadow-paper-lg border border-warm-faint/50 dark:border-dusk-border p-8 max-w-xs w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-7xl mb-3">{milestone.icon}</div>
        <h2 className="text-2xl font-black text-warm dark:text-[#e8dcc8] mb-1">{milestone.label}</h2>
        <p className="text-warm-muted dark:text-[#9c9080] mb-1">
          <span className="font-bold text-teal">{habitName}</span>
        </p>
        <p className="text-warm-muted dark:text-[#9c9080] text-sm mb-6">
          You've reached a <span className="font-bold text-warm dark:text-[#e8dcc8]">{milestone.days}-day streak</span>. Keep it up!
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-teal hover:bg-teal-dark text-white font-black text-lg transition-colors shadow-paper"
        >
          Let's go! 🌿
        </button>
      </div>
    </div>
  )
}
