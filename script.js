const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

const errorText = document.querySelector("#error-text");

const taskList = document.querySelector("#task-list");

const itemCounter = document.querySelector("#item-counter");

const tasks = [];

let doneTasks = 0;

function save(){
    let tasksJson = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksJson);

}


function render() {
    taskList.textContent = ""

    for (let i = 0; i < tasks.length; i++) {
        const taskLi = document.createElement("li");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", function () {
            tasks.splice(i, 1)
            taskLi.remove();
            save();
                    itemCounter.textContent = `${doneTasks}/${tasks.length}`;

        });

        taskLi.addEventListener("click", function(){
            taskLi.classList.toggle("done");
            if (taskLi.classList.contains("done")) {
                tasks[i].done = true;
                doneTasks++;
                save();
            } else {
                tasks[i].done = false;
                doneTasks--;
                save();
            }
            
                    itemCounter.textContent = `${doneTasks}/${tasks.length}`;

        })

        taskLi.textContent = tasks[i].todo
        taskLi.appendChild(removeBtn)
        taskList.appendChild(taskLi)
        itemCounter.textContent = `${doneTasks}/${tasks.length}`;
    }
    
}

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

        const todoText = todoInput.value.trim();

        if (todoText === "" || todoText === " ") {
        errorText.textContent = "Please enter a task!";
         return;
    }

    const itemObj = {
        todo: todoInput.value,
        done: false
    }

    tasks.push(itemObj)
    save();
    render()

});
