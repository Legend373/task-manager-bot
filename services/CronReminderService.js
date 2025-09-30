const cron = require("node-cron");

class CronReminderService {
    constructor(bot) {
        this.bot = bot;
    }

    scheduleReminder(userId, task) {
        const { hour, minute } = task.reminderTime;
        cron.schedule(
            `${minute} ${hour} * * *`,
            () => this.bot.telegram.sendMessage(userId, `🔔 Reminder: ${task.text}`),
            { timezone: "UTC" }
        );
    }
}

module.exports = CronReminderService;
