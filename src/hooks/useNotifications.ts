import { useState, useEffect, useCallback } from 'react'
import type { Habit } from '../types'
import { isCompletedToday } from '../utils/streaks'

const REMINDER_KEY = 'streak-reminder-time' // stored as "HH:MM" or ""

export function useNotifications(habits: Habit[]) {
  const [reminderTime, setReminderTimeState] = useState<string>(
    () => localStorage.getItem(REMINDER_KEY) ?? ''
  )
  const [permission, setPermission] = useState<NotificationPermission>(
    () => (typeof Notification !== 'undefined' ? Notification.permission : 'denied')
  )

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return
    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  const setReminderTime = useCallback(async (time: string) => {
    if (time && permission !== 'granted') {
      const result = await requestPermission()
      if (result !== 'granted') return
    }
    localStorage.setItem(REMINDER_KEY, time)
    setReminderTimeState(time)
  }, [permission, requestPermission])

  // Check every minute whether it's time to notify
  useEffect(() => {
    if (!reminderTime || permission !== 'granted') return

    const check = () => {
      const now = new Date()
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      if (hhmm !== reminderTime) return

      const incomplete = habits.filter(h => !isCompletedToday(h))
      if (incomplete.length === 0) return

      const names = incomplete.map(h => `${h.emoji} ${h.name}`).join(', ')
      new Notification('🔥 Keep your streak alive!', {
        body: `Still to do today: ${names}`,
        icon: '/icon-192.png',
        tag: 'streak-reminder', // prevents duplicate notifications
      })
    }

    check() // run immediately in case we just enabled at the exact minute
    const interval = setInterval(check, 60_000)
    return () => clearInterval(interval)
  }, [reminderTime, permission, habits])

  return { reminderTime, setReminderTime, permission, requestPermission }
}
