interface Props {
  reminderTime: string
  permission: NotificationPermission
  onSetTime: (time: string) => void
  onClose: () => void
}

export function NotificationSettings({ reminderTime, permission, onSetTime, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-warm/30 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative paper-texture w-full max-w-md bg-card dark:bg-dusk-card rounded-3xl shadow-paper-lg border border-warm-faint/50 dark:border-dusk-border p-6">
        <h2 className="text-xl font-black text-warm dark:text-[#e8dcc8] mb-1">🔔 Daily Reminder</h2>
        <p className="text-sm text-warm-muted dark:text-[#9c9080] mb-4">
          Get notified if you haven't logged all habits by a set time.
          {permission === 'denied' && (
            <span className="block mt-1 text-terra font-semibold">
              Notifications are blocked — enable them in browser settings.
            </span>
          )}
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="time"
              defaultValue={reminderTime}
              onChange={e => onSetTime(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-2xl border-2 border-warm-faint/60 dark:border-dusk-border bg-white/50 dark:bg-dusk/60 text-warm dark:text-[#e8dcc8] focus:outline-none focus:border-teal transition"
            />
            {reminderTime && (
              <button type="button" onClick={() => onSetTime('')}
                className="text-sm text-terra hover:text-terra-dark font-bold">
                Remove
              </button>
            )}
          </div>
          <p className="text-xs text-warm-muted dark:text-[#9c9080]">
            {reminderTime
              ? `You'll be reminded at ${reminderTime} for any incomplete habits.`
              : 'Pick a time above to enable reminders.'}
          </p>
        </div>

        <button type="button" onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-2xl bg-warm-faint/50 dark:bg-dusk-border text-warm dark:text-[#c0b8a8] font-bold">
          Done
        </button>
      </div>
    </div>
  )
}
