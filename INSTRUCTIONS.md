# Instructions for Claude

Edit this file to give me new feature requests, bug reports, or changes. Then open a new Claude Code session and say: "read INSTRUCTIONS.md and implement everything listed under TODO."

---

## How to use this file

- Add items under **TODO** when you want something built
- Move items to **Done** once Claude has implemented them
- Use **Notes** for preferences, constraints, or context I should know

---

## TODO

- [x] Fix: iPhone modal buttons — resolved once deployed to Vercel (HTTPS). Was a Safari/HTTP local dev issue, not a code bug.
- [ ] Edit habit — allow renaming, changing emoji or color after creation
- [ ] Export / backup data — download habits as JSON, re-import to restore
- [ ] Auto-deploy — connect GitHub repo to Vercel dashboard so every `git push` deploys automatically (currently needs manual `vercel --prod`)

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
- [x] Weekly habits — frequency toggle (daily/weekly) with X times/week target
- [x] Push notifications — daily reminder via browser Notifications API (bell icon in header)
- [x] Delete habit — trash icon always visible on card with inline confirm step
- [x] Ghibli-inspired UI — Nunito font, sky-to-meadow gradient background, warm teal/terracotta palette, paper texture, soot sprite empty state
- [x] Deployed to Vercel — https://streak-tracker-chi-two.vercel.app

---

## Notes

- Keep it a single-page app, no login, no backend
- Data stored in localStorage only — no sync across devices
- Mobile-first design — must work well on iPhone
- Nunito font (NOT Caveat or any italic/cursive — user doesn't like it)
- Tailwind CSS only, no CSS modules or inline styles
- Use `dark:` variants for dark mode (class-based, toggled on `<html>`)
- The app should feel fast and lightweight
- Always run `npm run build` before committing
