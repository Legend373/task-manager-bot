class ClearAllHandler {
    constructor(taskManager) {
        this.taskManager = taskManager;
    }

    canHandle(ctx) {
        return ctx.message.text === "❌ Clear All";
    }

    handle(ctx) {
        this.taskManager.clearAll(ctx.from.id);
        return ctx.reply("🗑️ All tasks cleared!");
    }
}

module.exports = ClearAllHandler;
