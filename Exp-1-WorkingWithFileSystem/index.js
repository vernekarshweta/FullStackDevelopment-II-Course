const fs = require("fs").promises

const file = "tasks.json"

async function loadTasks() {
    try {
        const data = await fs.readFile(file, "utf-8")
        return JSON.parse(data)
    } catch (err) {
        return []
    }
}

async function saveTasks(tasks) {
    await fs.writeFile(file, JSON.stringify(tasks, null, 2))
}

// ADD TASK
async function addTask(title, desc) {

    const tasks = await loadTasks()

    const task = {
        id: Date.now(),
        title,
        desc,
        status: "pending"
    }

    tasks.push(task)

    await saveTasks(tasks)

    console.log("Task added")
}

// LIST TASK
async function listTasks() {

    const tasks = await loadTasks()

    console.log(tasks)
}

// COMPLETE TASK
async function completeTask(id) {

    const tasks = await loadTasks()

    const updated = tasks.map(t => {
        if (t.id == id) {
            t.status = "completed"
        }
        return t
    })

    await saveTasks(updated)

    console.log("Task updated")
}

// DELETE TASK
async function deleteTask(id) {

    const tasks = await loadTasks()

    const filtered = tasks.filter(t => t.id != id)

    await saveTasks(filtered)

    console.log("Task deleted")
}


// CLI COMMANDS

const cmd = process.argv[2]

if (cmd === "add") {

    const title = process.argv[3]
    const desc = process.argv[4]

    addTask(title, desc)

}

else if (cmd === "list") {

    listTasks()

}

else if (cmd === "complete") {

    const id = process.argv[3]

    completeTask(id)

}

else if (cmd === "delete") {

    const id = process.argv[3]

    deleteTask(id)

}

else {

    console.log("Commands:")
    console.log("add title desc")
    console.log("list")
    console.log("complete id")
    console.log("delete id")

}