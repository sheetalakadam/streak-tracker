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

// Floating Totoro-like spirit for empty state
function SootSprite() {
  return (
    <svg width="70" height="80" viewBox="0 0 70 80" fill="none">
      <ellipse cx="35" cy="48" rx="26" ry="30" fill="#3d2e1e" opacity="0.15" className="dark:opacity-30 dark:fill-[#c8bfb0]"/>
      <ellipse cx="35" cy="46" rx="22" ry="26" fill="#3d2e1e" opacity="0.12" className="dark:opacity-25"/>
      {/* body */}
      <ellipse cx="35" cy="48" rx="20" ry="24" fill="#5a4535" className="dark:fill-[#b0a090]"/>
      {/* eyes */}
      <circle cx="27" cy="42" r="5" fill="white"/>
      <circle cx="43" cy="42" r="5" fill="white"/>
      <circle cx="28" cy="43" r="3" fill="#1a1008"/>
      <circle cx="44" cy="43" r="3" fill="#1a1008"/>
      <circle cx="29" cy="41" r="1.2" fill="white"/>
      <circle cx="45" cy="41" r="1.2" fill="white"/>
      {/* smile */}
      <path d="M28 52 Q35 57 42 52" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      {/* little arms */}
      <ellipse cx="14" cy="50" rx="5" ry="3" fill="#5a4535" className="dark:fill-[#b0a090]" transform="rotate(-20 14 50)"/>
      <ellipse cx="56" cy="50" rx="5" ry="3" fill="#5a4535" className="dark:fill-[#b0a090]" transform="rotate(20 56 50)"/>
      {/* ears */}
      <ellipse cx="20" cy="26" rx="4" ry="7" fill="#5a4535" className="dark:fill-[#b0a090]" transform="rotate(-15 20 26)"/>
      <ellipse cx="50" cy="26" rx="4" ry="7" fill="#5a4535" className="dark:fill-[#b0a090]" transform="rotate(15 50 26)"/>
    </svg>
  )
}

export default function App() {
  const { habits, addHabit, editHabit, deleteHabit, toggleToday, useFreeze, milestone, dismissMilestone } = useHabits()
  const { reminderTime, setReminderTime, permission } = useNotifications(habits)
  const [showAdd, setShowAdd] = useState(false)
  const [editingHabit, setEditingHabit] = useState<string | null>(null)
  const [showNotifSettings, setShowNotifSettings] = useState(false)
  const [darkMode, toggleDark] = useDarkMode()

  const habitBeingEdited = editingHabit ? habits.find(h => h.id === editingHabit) : null

  const milestoneHabit = milestone
    ? habits.find(h => getCurrentStreak(h) >= milestone.days) ?? habits[habits.length - 1]
    : null

  const todayStr = new Date().toISOString().slice(0, 10)
  const totalStreakDays = habits.reduce((sum, h) => sum + getCurrentStreak(h), 0)
  const doneToday = habits.filter(h => h.completedDates.includes(todayStr)).length

  return (
    <div className="min-h-screen transition-colors">
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
              { value: doneToday,       label: 'Done today',    color: 'text-teal-dark dark:text-teal-light',   icon: '✅' },
              { value: habits.length,   label: 'Total habits',  color: 'text-warm dark:text-[#e8dcc8]',         icon: '🌿' },
              { value: totalStreakDays, label: 'Combined days', color: 'text-terra dark:text-terra-light',       icon: '🔥' },
            ].map(({ value, label, color, icon }) => (
              <div key={label} className="relative paper-texture bg-card/80 dark:bg-dusk-card/80 rounded-2xl p-3 text-center shadow-paper border border-warm-faint/60 dark:border-dusk-border">
                <div className="text-base mb-0.5">{icon}</div>
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-warm-muted dark:text-[#9c9080] mt-0.5 font-semibold">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Habits list */}
        {habits.length === 0 ? (
          <div className="text-center py-10">
            <div className="mb-3 flex justify-center">
              <SootSprite />
            </div>
            <h2 className="text-2xl font-black text-warm dark:text-[#e8dcc8] mb-1">No habits yet</h2>
            <p className="text-warm-muted dark:text-[#9c9080] text-sm mb-6">Start your journey — add your first habit!</p>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-teal hover:bg-teal-dark text-white font-bold px-6 py-3 rounded-2xl transition-colors shadow-paper"
            >
              + Add your first habit
            </button>
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
                onEdit={() => setEditingHabit(habit.id)}
              />
            ))}
          </div>
        )}
      </main>

      {showAdd && <AddHabitModal onSave={addHabit} onClose={() => setShowAdd(false)} />}
      {habitBeingEdited && (
        <AddHabitModal
          initialValues={{
            name: habitBeingEdited.name,
            emoji: habitBeingEdited.emoji,
            color: habitBeingEdited.color,
            frequency: habitBeingEdited.frequency,
            targetDaysPerWeek: habitBeingEdited.targetDaysPerWeek,
          }}
          onSave={(name, emoji, color, frequency, targetDaysPerWeek) => {
            editHabit(habitBeingEdited.id, name, emoji, color, frequency, targetDaysPerWeek)
            setEditingHabit(null)
          }}
          onClose={() => setEditingHabit(null)}
        />
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
        <MilestoneModal milestone={milestone} habitName={milestoneHabit.name} onClose={dismissMilestone} />
      )}
    </div>
  )
}
