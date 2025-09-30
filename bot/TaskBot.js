const { Telegraf } = require("telegraf");
const LocalSession = require("telegraf-session-local");

const MenuUI = require("./MenuUI");
const AddTaskHandler = require("../handlers/AddTaskHandler");
const ViewTasksHandler = require("../handlers/ViewTasksHandler");
const ViewRemindersHandler = require("../handlers/ViewRemindersHandler");
const ClearAllHandler = require("../handlers/ClearAllHandler");
const UnknownCommandHandler = require("../handlers/UnknownCommandHandler");

class TaskBot {
    constructor(token, taskManager) {
        this.bot = new Telegraf(token);
        this.bot.use(new LocalSession({ database: "session_db.json" }).middleware());

        // Injected handlers
        this.handlers = [
            new AddTaskHandler(taskManager),
            new ViewTasksHandler(taskManager),
            new ViewRemindersHandler(taskManager),
            new ClearAllHandler(taskManager),
            new UnknownCommandHandler()
        ];

        this._registerHandlers();
    }

    _registerHandlers() {
        this.bot.start((ctx) => {
            ctx.session.state = null;
            ctx.reply("👋 Welcome! I’ll help you manage tasks & reminders.");
            MenuUI.showMainMenu(ctx);
        });

        this.bot.on("text", (ctx) => {
            for (const handler of this.handlers) {
                if (handler.canHandle(ctx)) {
                    return handler.handle(ctx);
                }
            }
        });
    }

    launch() {
        this.bot.launch();
        console.log("🚀 Task Manager Bot running...");
    }
}

module.exports = TaskBot;
