interface Props {
  onAdd: () => void
  onNotifications: () => void
  reminderTime: string
  darkMode: boolean
  toggleDark: () => void
}

export function Header({ onAdd, onNotifications, reminderTime, darkMode, toggleDark }: Props) {
  return (
    <header className="sticky top-0 z-10 bg-[#dceef7]/80 dark:bg-[#1a1f35]/85 backdrop-blur border-b border-[#b8d4e4]/60 dark:border-dusk-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌿</span>
        <h1 className="text-xl font-black text-warm dark:text-[#e8dcc8] tracking-tight">Streak Tracker</h1>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={onNotifications}
          className="p-2 rounded-xl text-warm-muted hover:bg-[#c8dff0]/60 dark:hover:bg-dusk-card transition-colors relative"
          title="Reminder settings"
        >
          🔔
          {reminderTime && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-terra rounded-full" />}
        </button>
        <button
          onClick={toggleDark}
          className="p-2 rounded-xl text-warm-muted hover:bg-[#c8dff0]/60 dark:hover:bg-dusk-card transition-colors"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 bg-teal hover:bg-teal-dark text-white font-bold px-3 py-1.5 rounded-xl text-sm transition-colors shadow-paper"
        >
          <span className="text-base leading-none">+</span> Add Habit
        </button>
      </div>
    </header>
  )
}
