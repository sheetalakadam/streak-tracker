interface Props {
  onAdd: () => void
  onNotifications: () => void
  reminderTime: string
  darkMode: boolean
  toggleDark: () => void
}

export function Header({ onAdd, onNotifications, reminderTime, darkMode, toggleDark }: Props) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔥</span>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Streak Tracker</h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onNotifications}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          title="Reminder settings"
        >
          🔔
          {reminderTime && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
          )}
        </button>
        <button
          onClick={toggleDark}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-1.5 rounded-lg text-sm transition-colors shadow-sm"
        >
          <span className="text-base leading-none">+</span> Add Habit
        </button>
      </div>
    </header>
  )
}
