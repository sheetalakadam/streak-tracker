import { useState, useEffect } from 'react'
import { useHabits } from './hooks/useHabits'
import { useNotifications } from './hooks/useNotifications'
import { Header } from './components/Header'
import { HabitCard } from './components/HabitCard'
import { AddHabitModal } from './components/AddHabitModal'
import { MilestoneModal } from './components/MilestoneModal'
import { NotificationSettings } from './components/NotificationSettings'
import { getCurrentStreak } from './utils/streaks'

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('dark-mode')
    if (stored !== null) return stored === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark-mode', String(dark))
  }, [dark])
  return [dark, () => setDark(d => !d)] as const
}

// Small decorative Ghibli cloud SVG
function CloudDeco({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 50" fill="none" className={className} aria-hidden>
      <ellipse cx="60" cy="35" rx="50" ry="18" fill="currentColor" opacity="0.5"/>
      <ellipse cx="45" cy="28" rx="28" ry="20" fill="currentColor" opacity="0.7"/>
      <ellipse cx="72" cy="25" rx="24" ry="18" fill="currentColor" opacity="0.7"/>
      <ellipse cx="60" cy="22" rx="20" ry="16" fill="currentColor"/>
    </svg>
  )
}

export default function App() {
  const { habits, addHabit, deleteHabit, toggleToday, useFreeze, milestone, dismissMilestone } = useHabits()
  const { reminderTime, setReminderTime, permission } = useNotifications(habits)
  const [showAdd, setShowAdd] = useState(false)
  const [showNotifSettings, setShowNotifSettings] = useState(false)
  const [darkMode, toggleDark] = useDarkMode()

  const milestoneHabit = milestone
    ? habits.find(h => getCurrentStreak(h) >= milestone.days) ?? habits[habits.length - 1]
    : null

  const todayStr = new Date().toISOString().slice(0, 10)
  const totalStreakDays = habits.reduce((sum, h) => sum + getCurrentStreak(h), 0)
  const doneToday = habits.filter(h => h.completedDates.includes(todayStr)).length

  return (
    <div className="min-h-screen bg-cream dark:bg-night transition-colors paper-texture">
      <Header
        onAdd={() => setShowAdd(true)}
        onNotifications={() => setShowNotifSettings(true)}
        reminderTime={reminderTime}
        darkMode={darkMode}
        toggleDark={toggleDark}
      />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Summary bar */}
        {habits.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { value: doneToday, label: 'Done today', color: 'text-sage' },
              { value: habits.length, label: 'Total habits', color: 'text-ink dark:text-[#e8dcc8]' },
              { value: totalStreakDays, label: 'Combined days', color: 'text-dust' },
            ].map(({ value, label, color }) => (
              <div key={label} className="bg-white/70 dark:bg-night-card/70 rounded-3xl p-3 text-center shadow-ghibli border border-parchment dark:border-night-border">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-ink-muted dark:text-[#9c9080] mt-0.5 font-semibold">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Habits list */}
        {habits.length === 0 ? (
          <div className="text-center py-12">
            {/* Decorative clouds */}
            <div className="flex justify-center gap-4 mb-4 text-parchment dark:text-night-border">
              <CloudDeco className="w-20 h-8 -rotate-6" />
              <CloudDeco className="w-16 h-7 rotate-3 mt-2" />
            </div>
            {/* Spirit face */}
            <div className="relative inline-block mb-4">
              <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
                <ellipse cx="40" cy="50" rx="32" ry="38" fill="#e8e0d0" className="dark:fill-[#3d3a60]"/>
                <ellipse cx="40" cy="48" rx="28" ry="32" fill="#f5edd6" className="dark:fill-[#4a4770]"/>
                <circle cx="28" cy="44" r="5" fill="#2d2416" className="dark:fill-[#e8dcc8]"/>
                <circle cx="52" cy="44" r="5" fill="#2d2416" className="dark:fill-[#e8dcc8]"/>
                <circle cx="30" cy="42" r="2" fill="white" className="dark:fill-night"/>
                <circle cx="54" cy="42" r="2" fill="white" className="dark:fill-night"/>
                <path d="M32 56 Q40 62 48 56" stroke="#2d2416" strokeWidth="2" strokeLinecap="round" fill="none" className="dark:stroke-[#e8dcc8]"/>
                {/* Ears / cat ears */}
                <polygon points="12,28 20,10 28,28" fill="#e8e0d0" className="dark:fill-[#3d3a60]"/>
                <polygon points="52,28 60,10 68,28" fill="#e8e0d0" className="dark:fill-[#3d3a60]"/>
                <polygon points="15,26 20,14 25,26" fill="#d4a0a0"/>
                <polygon points="55,26 60,14 65,26" fill="#d4a0a0"/>
              </svg>
            </div>
            <h2 className="text-xl font-black text-ink dark:text-[#e8dcc8] mb-2">No habits yet</h2>
            <p className="text-ink-muted dark:text-[#9c9080] font-semibold mb-6">Add your first habit to start your journey</p>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-sage hover:bg-sage-dark text-white font-black px-6 py-3 rounded-2xl transition-colors shadow-ghibli"
            >
              + Add your first habit
            </button>
            {/* Decorative bottom clouds */}
            <div className="flex justify-center gap-6 mt-8 text-parchment dark:text-night-border opacity-60">
              <CloudDeco className="w-14 h-6 rotate-2" />
              <CloudDeco className="w-20 h-8 -rotate-3 mt-1" />
              <CloudDeco className="w-12 h-5 rotate-6" />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={() => toggleToday(habit.id)}
                onDelete={() => deleteHabit(habit.id)}
                onFreeze={() => useFreeze(habit.id)}
              />
            ))}
          </div>
        )}
      </main>

      {showAdd && (
        <AddHabitModal onAdd={addHabit} onClose={() => setShowAdd(false)} />
      )}
      {showNotifSettings && (
        <NotificationSettings
          reminderTime={reminderTime}
          permission={permission}
          onSetTime={setReminderTime}
          onClose={() => setShowNotifSettings(false)}
        />
      )}
      {milestone && milestoneHabit && (
        <MilestoneModal
          milestone={milestone}
          habitName={milestoneHabit.name}
          onClose={dismissMilestone}
        />
      )}
    </div>
  )
}
