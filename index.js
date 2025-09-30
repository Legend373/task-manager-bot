require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const cron = require("node-cron");
const LocalSession = require("telegraf-session-local");

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.use(new LocalSession({ database: "session_db.json" }).middleware());

const userTasks = {};


function showMenu(ctx) {
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


bot.start((ctx) => {
    const userId = ctx.from.id;
    if (!userTasks[userId]) userTasks[userId] = [];
    ctx.session.state = null;

    ctx.reply("👋 Welcome! I’ll help you manage tasks & reminders.");
    showMenu(ctx);
});


bot.on("text", (ctx) => {
    const userId = ctx.from.id;
    if (!userTasks[userId]) userTasks[userId] = [];

    const text = ctx.message.text;

    
    if (text === "➕ Add Task") {
        ctx.session.state = "adding_task";
        return ctx.reply("✍️ Send me the task you want to add (optionally include 'at HH:MM' to set a reminder):");
    }

    if (text === "📋 View Tasks") {
        const tasks = userTasks[userId] || [];
        if (tasks.length === 0) return ctx.reply("📭 You have no tasks.");

        let taskList = "📋 Your tasks:\n";
        tasks.forEach((t, i) => taskList += `${i + 1}. ${t.text}\n`);
        return ctx.reply(taskList);
    }

    if (text === "⏰ View Reminders") {
        const tasks = userTasks[userId] || [];
        const reminders = tasks
            .filter((t) => t.reminderTime)
            .map((t, i) => `${i + 1}. ${t.text} at ${t.reminderTime.hour}:${t.reminderTime.minute}`);
        if (reminders.length === 0) return ctx.reply("⏰ No reminders set.");
        return ctx.reply("⏰ Upcoming Reminders:\n" + reminders.join("\n"));
    }

    if (text === "❌ Clear All") {
        userTasks[userId] = [];
        return ctx.reply("🗑️ All tasks cleared!");
    }

    
    if (ctx.session.state === "adding_task") {
    
        let match = text.match(/at (\d{1,2}):(\d{2})/);
        let reminderTime = null;
        if (match) reminderTime = { hour: parseInt(match[1]), minute: parseInt(match[2]) };

        userTasks[userId].push({ text, reminderTime });
        ctx.session.state = null;

        ctx.reply(
            `✅ Task added: "${text}"` +
            (reminderTime ? ` (Reminder set at ${match[1]}:${match[2]})` : "")
        );

        if (reminderTime) {
            cron.schedule(
                `${reminderTime.minute} ${reminderTime.hour} * * *`,
                () => bot.telegram.sendMessage(userId, `🔔 Reminder: ${text}`),
                { timezone: "UTC" }
            );
        }
        return;
    }

    
    ctx.reply("⚠️ I didn't understand that. Please choose an option from the menu.");
});


bot.launch();
console.log("🚀 Task Manager Bot running...");
