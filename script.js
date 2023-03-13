document.addEventListener("DOMContentLoaded", () => {

    taskInput = document.querySelector(".task-input input");
    todos = JSON.parse(localStorage.getItem("todo-list"));
    taskBox = document.querySelector(".task-box");
    filters = document.querySelectorAll(".filters span");
    clearAll = document.querySelector(".clear-btn");
    const ul = document.getElementById('myList');

    showTodo("all");
    
    clearAll.addEventListener("click", function () {
        todos.splice(0, todos.length); // To remove entire list values and update it in the storage
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    });

    filters.forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelector("span.active").classList.remove("active");
            //classList property that returns css class names
            btn.classList.add("active");
            showTodo(btn.id);
        });
    });

    ul.addEventListener('click', function (event, id) {
        id = event.target.parentElement.getAttribute('for')// Label attribute for which has the id    
        if (event.target.tagName === 'BUTTON') {  //event.target is the button
            const button = event.target;
            const label = button.parentNode;
            if (button.textContent === 'Edit') {
                const p = label.firstElementChild;//First element of label is the p tag 
                console.log(p);
                const input = document.createElement('input');
                input.type = 'text';
                input.value = p.textContent;
                label.insertBefore(input, p);
                label.removeChild(p);
                button.textContent = 'Save';
            } else if (button.textContent === 'Save') {
                const input = label.firstElementChild;
                const span = document.createElement('span')
                span.textContent = input.value;
                console.log(span.textContent)
                label.insertBefore(span, input); //insertBefore (new, existing)
                label.removeChild(input);
                button.textContent = 'Edit';
                //To save value of the input inside the name of the particular id being edited
                todos[id].name = input.value;
                localStorage.setItem("todo-list", JSON.stringify(todos));//To update in the localstorage
                showTodo("all");
            }
        }
    });

    taskInput.addEventListener("keyup", function (e) {
        let userTask = taskInput.value.trim();// value of input box(taskInput), .trim() to ignore empty spaces
        if (e.key == "Enter" && userTask) { // if value of key is enter and there are no spaces
            if (!todos) {
                todos = [];  //if todos is empty then create new array list
            }
            console.log(taskInput.value)
            // object is declared to store the name and status inside localstorage
            let taskInfo = { name: userTask, status: "pending" };
            // console.log(todos[id].name)
            
            todos.push(taskInfo); // method push to add the array 
            taskInput.value = ""; // To display list values 
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
            // If status is completed add "checked" attribute else leave it blank
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += `
                <ul class="task-box" id ="myList">
                    <li class="task">
                <input onclick=updateStatus(this) type="checkbox" id=${id} ${isCompleted}>
                        <label for="${id}" class="label">
                            <p class="${isCompleted}">${todo.name}</p>
                            <button class="editBtn">Edit</button>

                        </label>
                        <button onclick="deleteTask(${id})">Delete</button>
                        
                    </li>
                </ul>`;
            }
        });
    }
    taskBox.innerHTML = li || `You dont have any task here`;
}

function deleteTask(deleteId) {
    todos.splice(deleteId, 1); //To delete just one list 
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    let check=taskName.parentElement.getElementsByTagName('label')[0].getElementsByTagName('p')[0];
    if (selectedTask.checked) {
        check.classList.add("checked"); //add checked attribute to the element
        todos[selectedTask.id].status = "completed"; //update todos status to completed
    } else {
        check.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}