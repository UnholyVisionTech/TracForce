# TracForce CRM v2.2 — Modular Edition

## Architecture

The monolithic app has been split into 5 files, each under 500 lines. The `index.html` loader fetches all files in order, concatenates them, and Babel-transforms the result.

```
tracforce/
├── index.html          ← Entry point — loads & concatenates all JSX files
├── data.jsx            ← Constants, seed data, icons, utilities, CalendarPicker
├── engagement.jsx      ← EngagementSection component
├── core.jsx            ← TracForce main: state, handlers, dial page, sidebar, dashboard
├── views.jsx           ← KPI dashboard, clients list, acquisition statistics
├── sections.jsx        ← Settings, audit logs, billing, modals (sale, acquisition, history)
├── constants.js        ← Standalone role/permission config (for unit testing)
├── utils.js            ← Standalone CSV/formatter helpers (for unit testing)
└── TracForce_preview.html  ← Self-contained single-file preview
```

## Module Map

| File | Lines | Contents |
|------|-------|----------|
| `data.jsx` | 215 | §1 Imports, §2 Constants & Permissions, §3 Seed Data, §4 Icons & Utilities, §5 CalendarPicker |
| `engagement.jsx` | 255 | §6 EngagementSection (activity charts, leaderboard, time range picker) |
| `core.jsx` | 475 | §7 State & Handlers, §8 Dial Page, §9 Sidebar, Dashboard, KPI calculations |
| `views.jsx` | 455 | KPI render (team + agent), Clients list/profile/import, Acquisition statistics |
| `sections.jsx` | 228 | Settings, Audit Logs, Billing, New List modal, Acquisition modals, Sale modal |

## How It Works

`index.html` fetches all 5 JSX files via `Promise.all`, concatenates them in order, then Babel-transforms the combined source. No bundler needed — works directly on GitHub Pages.

## Key Features (v2.2)

- 156-client database with procedural generation
- 7-tab navigation: Dashboard, Team, Clients, Engagement, KPI, Acquisition, Settings
- Role-based access (Master → Admin → Manager → Asst. Manager → Specialist → Client)
- Dial page with live call timer, notes, sales
- KPI dashboard with team/agent drill-down, pie charts, bar charts
- Acquisition statistics with CSV import, manual entry, import history
- Sales tracking with recurring billing subscriptions
- Multi-select list filters, custom date ranges with calendar pickers
- Engagement charts with time-filtered leaderboards
- Audit logs, appointments, team posts
- CSV export/import for clients and audit data
