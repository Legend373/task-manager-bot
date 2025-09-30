require("dotenv").config();

const TaskBot = require("./bot/TaskBot");
const TaskManager = require("./core/TaskManager");
const InMemoryTaskStorage = require("./services/InMemoryTaskStorage");
const CronReminderService = require("./services/CronReminderService");

const storage = new InMemoryTaskStorage();
const taskBot = new TaskBot(process.env.BOT_TOKEN, new TaskManager(storage, new CronReminderService(null)));

// Inject the actual bot into CronReminderService for reminders
taskBot.handlers.forEach(handler => {
    if (handler.taskManager?.reminderService?.bot === null) {
        handler.taskManager.reminderService.bot = taskBot.bot;
    }
});

taskBot.launch();
