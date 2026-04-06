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
    const colors = ['#7a9e6e', '#b5d4a8', '#e8956d', '#a8c8da', '#f5e6c8']
    const frame = () => {
      confetti({ particleCount: 3, angle: 60,  spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="text-center bg-cream dark:bg-night-card rounded-3xl shadow-ghibli-lg border border-parchment dark:border-night-border p-8 max-w-xs w-full paper-texture"
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative leaf wreath */}
        <div className="flex justify-center mb-2">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <ellipse cx="15" cy="25" rx="12" ry="7" fill="#b5d4a8" transform="rotate(-30 15 25)"/>
            <ellipse cx="65" cy="25" rx="12" ry="7" fill="#b5d4a8" transform="rotate(30 65 25)"/>
            <ellipse cx="28" cy="18" rx="10" ry="6" fill="#7a9e6e" transform="rotate(-15 28 18)"/>
            <ellipse cx="52" cy="18" rx="10" ry="6" fill="#7a9e6e" transform="rotate(15 52 18)"/>
            <text x="40" y="32" textAnchor="middle" fontSize="28">{milestone.icon}</text>
          </svg>
        </div>

        <h2 className="text-2xl font-black text-ink dark:text-[#e8dcc8] mb-1">{milestone.label}</h2>
        <p className="text-ink-muted dark:text-[#9c9080] mb-1">
          <span className="font-bold text-sage">{habitName}</span>
        </p>
        <p className="text-ink-muted dark:text-[#9c9080] text-sm mb-6">
          You've reached a <span className="font-bold text-ink dark:text-[#e8dcc8]">{milestone.days}-day streak</span>. Keep it up!
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-sage hover:bg-sage-dark text-white font-black text-lg transition-colors shadow-ghibli"
        >
          Let's go! 🌿
        </button>
      </div>
    </div>
  )
}
