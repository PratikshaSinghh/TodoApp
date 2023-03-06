document.addEventListener("DOMContentLoaded", () => {
    taskInput = document.querySelector(".task-input input");

    todos = JSON.parse(localStorage.getItem("todo-list"));
    taskBox = document.querySelector(".task-box");
    filters = document.querySelectorAll(".filters span");
    editText = document.querySelector(".text");
    clearAll = document.querySelector(".clear-btn");
    let editId;
    let isEditedTask = false;

    clearAll.addEventListener("click", function () {
        todos.splice(0, todos.length);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    });

    showTodo("all");

    filters.forEach(btn => {
        btn.addEventListener("click", function () {
            console.log(btn);
            document.querySelector("span.active").classList.remove("active");
            btn.classList.add("active");
            showTodo(btn.id);
        });
    });

    taskInput.addEventListener("keyup", function (e) {
        let userTask = taskInput.value.trim();
        // let newTask = editText.value.trim();
        if (e.key == "Enter" && userTask) {
            if (!isEditedTask) {
                let taskInfo = { name: userTask, status: "pending" };
                todos.push(taskInfo);
            } else {
                isEditedTask = false;

                todos[editId].name = userTask; //userTask
                // todos[isEditedTask].name = newTask; //userTask

            }
            taskInput.value = "";
            localStorage.setItem("todo-list", JSON.stringify(todos));
            showTodo("all");
        }
    });
});

function showTodo(filter) {
    let li = "";
    if (todos) {
        todos.forEach(function (todo, id) {
            console.log(id, todo);
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += `<li class="task">
            <label for="${id}">
                <input onclick=updateStatus(this) type="checkbox" id=${id} ${isCompleted}>
                    <p class="${isCompleted} text" >${todo.name}</p>
            </label>
                <div class = "settings">
                    <ul class = "task-menu">
                        <button onclick="editTask(${id}, '${todo.name}')">Edit</button>
                        <button onclick="deleteTask(${id})">Delete</button>
                    </ul>
                </div>
            </li>`;
            }
        });
    }
    taskBox.innerHTML = li || `You dont have any task here`;
}

// function editTask(id) {
//     console.log(id);
//     isEditedTask = id;
//     // taskInput.value = todos[id].name;
//     editText = todos[id].name;

//     console.log(editText);
// }

function editTask(taskId, taskName){

    console.log(taskId,taskName);
    // isEditedTask = taskName;
    editId= taskId;
    isEditedTask = true;

    taskInput.value = todos[taskId].name;
}
function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}