interface Props {
  reminderTime: string
  permission: NotificationPermission
  onSetTime: (time: string) => void
  onClose: () => void
}

export function NotificationSettings({ reminderTime, permission, onSetTime, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Daily Reminder</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Get a notification if you haven't logged all habits by a certain time.
          {permission === 'denied' && (
            <span className="block mt-1 text-red-500">
              Notifications are blocked. Enable them in your browser settings.
            </span>
          )}
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="time"
              defaultValue={reminderTime}
              onChange={e => onSetTime(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
            {reminderTime && (
              <button
                type="button"
                onClick={() => onSetTime('')}
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Remove
              </button>
            )}
          </div>

          {!reminderTime && (
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Pick a time above to enable reminders.
            </p>
          )}

          {reminderTime && (
            <p className="text-xs text-slate-400 dark:text-slate-500">
              You'll be reminded at {reminderTime} if any habits aren't done. The app must be open or installed as a PWA.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  )
}
