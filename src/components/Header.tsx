interface Props {
  onAdd: () => void
  onNotifications: () => void
  reminderTime: string
  darkMode: boolean
  toggleDark: () => void
}

export function Header({ onAdd, onNotifications, reminderTime, darkMode, toggleDark }: Props) {
  return (
    <header className="sticky top-0 z-10 bg-cream/90 dark:bg-night/90 backdrop-blur border-b-2 border-parchment dark:border-night-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Small inline Ghibli-ish leaf sprite */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="flex-shrink-0">
          <ellipse cx="14" cy="16" rx="9" ry="11" fill="#b5d4a8" />
          <ellipse cx="14" cy="15" rx="6" ry="8" fill="#7a9e6e" />
          <line x1="14" y1="6" x2="14" y2="26" stroke="#4e7244" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 12 Q18 10 20 13" stroke="#4e7244" strokeWidth="1" strokeLinecap="round" fill="none"/>
          <path d="M14 16 Q10 14 8 17" stroke="#4e7244" strokeWidth="1" strokeLinecap="round" fill="none"/>
          <circle cx="14" cy="5" r="2" fill="#e8956d" />
        </svg>
        <h1 className="text-lg font-black text-ink dark:text-[#e8dcc8] tracking-tight">Streak Tracker</h1>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onNotifications}
          className="p-2 rounded-xl text-ink-muted hover:bg-parchment dark:hover:bg-night-card transition-colors relative"
          title="Reminder settings"
        >
          🔔
          {reminderTime && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sage rounded-full" />
          )}
        </button>
        <button
          onClick={toggleDark}
          className="p-2 rounded-xl text-ink-muted hover:bg-parchment dark:hover:bg-night-card transition-colors"
          title="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 bg-sage hover:bg-sage-dark text-white font-bold px-3 py-1.5 rounded-xl text-sm transition-colors shadow-ghibli"
        >
          <span className="text-base leading-none">+</span> Add Habit
        </button>
      </div>
    </header>
  )
}
