const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const errorText = document.querySelector("#error-text");
const taskList = document.querySelector("#task-list");
const itemCounter = document.querySelector("#item-counter");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";
let doneTasks = 0;

render();

function save() {
    let tasksJson = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksJson);
}

function render() {
    taskList.textContent = "";
    doneTasks = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].done === true) {
            doneTasks++;
        }
        // nedan sorterar ut allt som är klart eller aktiva, beroende på currentFilter 
        if (currentFilter === "all" ||
            currentFilter === "active" && tasks[i].done === false ||
            currentFilter === "done" && tasks[i].done === true) {

            const taskLi = document.createElement("li");
            const removeBtn = document.createElement("button");
            const doneBtn = document.createElement("button");

            taskLi.textContent = tasks[i].todo;

            if (tasks[i].done === true) {
                taskLi.classList.add("done");
            }

            removeBtn.textContent = "X";
            doneBtn.textContent = tasks[i].done ? "Undo" : "Done";

            removeBtn.addEventListener("click", function() {
                tasks.splice(i, 1);
                save();
                render();
            });

            doneBtn.addEventListener("click", function() {
                if (tasks[i] === undefined) {
                    return;
                }

                if (tasks[i].done === false) {
                    tasks[i].done = true;
                } else {
                    tasks[i].done = false;
                }

                save();
                render();
            });

            taskLi.appendChild(doneBtn);
            taskLi.appendChild(removeBtn);
            taskList.appendChild(taskLi);
        }
    }

    itemCounter.textContent = `${doneTasks}/${tasks.length}`;
}

todoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const todoText = todoInput.value.trim();

    if (todoText === "") {
        errorText.textContent = "Please enter a task!";
        return;
    }

    errorText.textContent = "";

    const itemObj = {
        todo: todoText,
        done: false
    };

    tasks.push(itemObj);
    save();
    render();

    todoInput.value = "";
});

document.getElementById("all-tasks").addEventListener("click", function() {
    currentFilter = "all";
    render();
});

document.getElementById("active-tasks").addEventListener("click", function() {
    currentFilter = "active";
    render();
});

document.getElementById("done-tasks").addEventListener("click", function() {
    currentFilter = "done";
    render();
});

document.getElementById("clear-done").addEventListener("click", function() {
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].done === true) {
            tasks.splice(i, 1);
    }
    }
    save();
    render();
});