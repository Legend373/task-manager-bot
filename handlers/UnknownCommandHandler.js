class UnknownCommandHandler {
    canHandle(ctx) {
        return true; // fallback
    }

    handle(ctx) {
        return ctx.reply("⚠️ I didn't understand that. Please choose an option from the menu.");
    }
}

module.exports = UnknownCommandHandler;
