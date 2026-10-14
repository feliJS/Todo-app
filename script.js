const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

const errorText = document.querySelector("#error-text");

const taskList = document.querySelector("#task-list");

const itemCounter = document.querySelector("#item-counter");

const tasks = [];

todoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const todoText = todoInput.value.trim();

    if (todoText === "" || todoText === " ") {
        errorText.textContent = "Please enter a task!";
        return;
    }

    let taskObject = {task: todoText}
    tasks.push(taskObject);
});
