class ViewRemindersHandler {
    constructor(taskManager) {
        this.taskManager = taskManager;
    }

    canHandle(ctx) {
        return ctx.message.text === "⏰ View Reminders";
    }

    handle(ctx) {
        const reminders = this.taskManager.viewReminders(ctx.from.id);
        if (reminders.length === 0) return ctx.reply("⏰ No reminders set.");
        let list = reminders.map((t, i) => `${i + 1}. ${t.text} at ${t.reminderTime.hour}:${t.reminderTime.minute}`);
        return ctx.reply("⏰ Upcoming Reminders:\n" + list.join("\n"));
    }
}

module.exports = ViewRemindersHandler;
