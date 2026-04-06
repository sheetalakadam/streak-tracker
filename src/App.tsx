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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
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
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 text-center shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-2xl font-black text-orange-500">{doneToday}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Done today</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 text-center shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-2xl font-black text-slate-900 dark:text-white">{habits.length}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Total habits</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 text-center shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-2xl font-black text-orange-500">{totalStreakDays}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Combined days</p>
            </div>
          </div>
        )}

        {/* Habits list */}
        {habits.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔥</div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No habits yet</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Add your first habit to start building streaks</p>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
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
              />
            ))}
          </div>
        )}
      </main>

      {showAdd && (
        <AddHabitModal
          onAdd={addHabit}
          onClose={() => setShowAdd(false)}
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
        <MilestoneModal
          milestone={milestone}
          habitName={milestoneHabit.name}
          onClose={dismissMilestone}
        />
      )}
    </div>
  )
}
