const { Markup } = require("telegraf");

class MenuUI {
    static showMainMenu(ctx) {
        return ctx.reply(
            "📌 Main Menu — What would you like to do?",
            Markup.keyboard([
                ["➕ Add Task", "📋 View Tasks"],
                ["⏰ View Reminders", "❌ Clear All"]
            ])
                .resize()
                .oneTime(false)
        );
    }
}

module.exports = MenuUI;
