

# Personal Task Dashboard

A clean, warm-toned personal dashboard with a Kanban board, calendar, quick notes, and an AI assistant — all backed by a database for persistent storage.

## Design & Layout
- **Clean & warm aesthetic** inspired by the Voostox reference — white/light backgrounds, soft rounded cards, warm orange accent colors, subtle shadows
- **Left sidebar navigation** with icons for: Dashboard (home), Calendar, Notes, Chat, and Settings
- **Collapsible sidebar** that shrinks to icon-only mode
- **Main content area** with the Kanban board as the centerpiece
- **Right sidebar panel** with a mini calendar widget and quick notes

## Kanban Board (Core Feature)
- Three columns: **To Do**, **In Progress**, **Done**
- **Drag-and-drop** cards between columns to change status
- Each task card shows: title, description, category/label (color-coded badges), due date, and priority
- **Add new task** button on each column with a form for title, description, category, priority, and due date
- **Edit and delete** tasks by clicking on cards
- Task count displayed next to each column header

## Calendar Widget
- Mini calendar showing the current month with navigation arrows
- Highlights dates that have tasks due
- Click a date to filter the Kanban board to tasks due on that day
- Below the calendar, show a list of upcoming tasks/events for the selected day

## Quick Notes
- A simple notes area on the right sidebar for jotting down quick thoughts
- Auto-saves as you type
- Supports multiple notes with timestamps

## AI Chatbot (Dual Access)
- **Floating chat bubble** in the bottom-right corner for quick questions anytime
- **Dedicated Chat page** accessible from the sidebar for longer conversations
- Powered by Lovable AI with streaming responses
- Can ask questions about anything — task advice, general questions, brainstorming
- Chat history preserved within the session

## Backend & Data Persistence
- **Lovable Cloud** (Supabase) backend for saving all data
- **User authentication** with email/password login so your data is private and accessible from any device
- Database tables for: tasks, notes, and chat history
- All changes sync to the database in real-time

## Pages
1. **Login / Sign Up** — Simple auth page
2. **Dashboard** — Main page with Kanban board, calendar, and notes
3. **Chat** — Full-page AI chat interface
4. **Settings** — Profile and preferences

