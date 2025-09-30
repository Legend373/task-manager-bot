# Task Manager Bot

A Telegram bot to help users manage their daily tasks and reminders. With an intuitive interface and real-time notifications, it simplifies personal productivity by allowing users to create, track, and receive reminders for their to-do lists.

---

## Features

- ➕ **Add Tasks**: Users can add tasks, optionally specifying a reminder time in `HH:MM` format.
- 📋 **View Tasks**: Display all current tasks in an organized list.
- ⏰ **View Reminders**: View tasks with scheduled reminders.
- ✅ **Mark Tasks as Done**: Remove completed tasks from the list.
- ❌ **Clear All Tasks**: Remove all tasks at once.
- Real-time notifications for scheduled reminders.
- Persistent session using local storage.

---

## Tech Stack

- **Node.js** – JavaScript runtime.
- **Telegraf** – Telegram Bot API framework.
- **node-cron** – Task scheduling for reminders.
- **telegraf-session-local** – Local session management.

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd task-manager-bot
2. Install dependencies:
    npm install
3. reate a .env file in the root folder with your bot token:
     BOT_TOKEN=your_telegram_bot_token
4.Run the bot:
     node index.js

Usage

Use /start to begin and see the main menu.

Tap buttons on the keyboard to navigate:

Add Task – Enter a task and optional reminder time.

View Tasks – List all tasks with "Done" buttons.

View Reminders – See tasks with upcoming reminders.

Clear All – Delete all tasks.

Notes

Tasks are currently stored in memory. Restarting the bot will reset tasks.

Session data is saved locally in session_db.json.

Reminder time is interpreted in UTC by default. Adjust the cron timezone if needed.
