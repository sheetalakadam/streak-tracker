# Instructions for Claude

Edit this file to give me new feature requests, bug reports, or changes. Then open a new Claude Code session and say: "read INSTRUCTIONS.md and implement everything listed under TODO."

---

## How to use this file

- Add items under **TODO** when you want something built
- Move items to **Done** once Claude has implemented them
- Use **Notes** for preferences, constraints, or context I should know

---

## TODO

<!-- Add new feature requests here. Example:
- [ ] Add weekly habit frequency (e.g. "Gym 3x per week")
- [ ] Push notifications — remind me at 9pm daily if I haven't marked a habit done
- [ ] Edit habit name/emoji/color after creation
-->

---

## Done

- [x] Initial app — add/delete habits with emoji + color
- [x] Mark done daily, streak counter (current + longest)
- [x] 30-day heatmap grid
- [x] Milestone celebrations at 7 / 14 / 30 / 60 / 100 days with confetti
- [x] Streak freeze (2 tokens per habit, protects one missed day)
- [x] Completion rate % over 30 days
- [x] Dark mode toggle (persisted, respects system preference)
- [x] Dashboard summary bar (done today, total habits, combined streak days)
- [x] PWA — installable on iPhone via Safari

---

## Notes

- Keep it a single-page app, no login, no backend
- Data stored in localStorage only
- Mobile-first design — must work well on iPhone
- Modern UI with Tailwind CSS, dark mode support
- The app should feel fast and lightweight
