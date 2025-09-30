class ViewTasksHandler {
    constructor(taskManager) {
        this.taskManager = taskManager;
    }

    canHandle(ctx) {
        return ctx.message.text === "📋 View Tasks";
    }

    handle(ctx) {
        const tasks = this.taskManager.viewTasks(ctx.from.id);
        if (tasks.length === 0) return ctx.reply("📭 You have no tasks.");
        let taskList = "📋 Your tasks:\n" + tasks.map((t, i) => `${i + 1}. ${t.text}`).join("\n");
        return ctx.reply(taskList);
    }
}

module.exports = ViewTasksHandler;
