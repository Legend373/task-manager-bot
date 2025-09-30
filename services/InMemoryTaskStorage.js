class InMemoryTaskStorage {
    constructor() {
        this.userTasks = {}; // { userId: [task, ...] }
    }

    addTask(userId, task) {
        if (!this.userTasks[userId]) this.userTasks[userId] = [];
        this.userTasks[userId].push(task);
    }

    getTasks(userId) {
        return this.userTasks[userId] || [];
    }

    clearTasks(userId) {
        this.userTasks[userId] = [];
    }
}

module.exports = InMemoryTaskStorage;
