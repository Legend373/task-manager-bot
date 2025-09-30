class TaskManager {
    constructor(storage, reminderService) {
        this.storage = storage;           // any storage implementing save/get methods
        this.reminderService = reminderService; // service to schedule reminders
    }

    addTask(userId, text) {
        // Check for optional reminder: "at HH:MM"
        let reminderTime = null;
        const match = text.match(/at (\d{1,2}):(\d{2})/);
        if (match) {
            reminderTime = { hour: parseInt(match[1]), minute: parseInt(match[2]) };
        }

        const task = { text, reminderTime };
        this.storage.addTask(userId, task);

        // Schedule reminder if time exists
        if (reminderTime) {
            this.reminderService.scheduleReminder(userId, task);
        }

        return task;
    }

    viewTasks(userId) {
        return this.storage.getTasks(userId);
    }

    viewReminders(userId) {
        const tasks = this.storage.getTasks(userId);
        return tasks.filter(task => task.reminderTime);
    }

    clearAll(userId) {
        this.storage.clearTasks(userId);
    }
}

module.exports = TaskManager;
