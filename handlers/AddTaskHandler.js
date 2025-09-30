class AddTaskHandler {
    constructor(taskManager) {
        this.taskManager = taskManager;
    }

    canHandle(ctx) {
        return ctx.session.state === "adding_task" || ctx.message.text === "➕ Add Task";
    }

    handle(ctx) {
        if (ctx.message.text === "➕ Add Task") {
            ctx.session.state = "adding_task";
            return ctx.reply("✍️ Send me the task you want to add (optionally include 'at HH:MM' to set a reminder):");
        }

        // Adding task
        const task = this.taskManager.addTask(ctx.from.id, ctx.message.text);
        ctx.session.state = null;
        return ctx.reply(
            `✅ Task added: "${task.text}"` +
            (task.reminderTime ? ` (Reminder set at ${task.reminderTime.hour}:${task.reminderTime.minute})` : "")
        );
    }
}

module.exports = AddTaskHandler;
