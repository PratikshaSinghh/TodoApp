const taskInput = document.querySelector(".task-input input");

let todos = JSON.parse(localStorage.getItem("todo-list"));
taskBox= document.querySelector(".task-box");
filters = document.querySelectorAll(".filters span");
clearAll = document.querySelector(".clear-btn");
// let editId;
let isEditedTask = null;

clearAll.addEventListener("click", function(){
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
});

function showTodo(filter){
    let li="";
    if(todos){
        todos.forEach(function(todo, id){
        console.log(id,todo);
        let isCompleted = todo.status == "completed" ? "checked" : "";
        if(filter == todo.status || filter =="all"){
            li += `<li class="task">
            <label for="${id}">
            <input onclick=updateStatus(this) type="checkbox" id=${id} ${isCompleted}>
            <p class="${isCompleted}">${todo.name}</p>
            </label>
            <div class = "settings">
            <ul class = "task-menu">
            <button onclick="editTask(${id})">Edit</button>
            <button onclick="deleteTask(${id})">Delete</button>
            </ul>
            </div>
            </li>`;
        }
       
        });
    }    
    taskBox.innerHTML = li || `You dont have any task here`;
}
showTodo("all");

// function editTask(taskId,taskName){
//     console.log(taskId,taskName);
//     editId=taskId;
//     isEditedTask = true;

//     taskInput.value=taskName;
// }
function editTask(id){
    console.log(id);
    isEditedTask=id;
    taskInput.value= todos[id].name;

    // isEditedTask = true;

}

function deleteTask(deleteId){
    // console.log(deleteId);
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

filters.forEach(btn => {
    btn.addEventListener("click", function(){
        console.log(btn);
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function updateStatus(selectedTask){
   
    // console.log(selectedTask);
    let taskName =selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status="completed";
        }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status="pending";

    }
    localStorage.setItem("todo-list",JSON.stringify(todos));

}

taskInput.addEventListener("keyup", function(e){
    let userTask = taskInput.value.trim();
    if(e.key=="Enter" && userTask){
        if(isEditedTask == null){
            
            let taskInfo= {name:userTask, status:"pending"};
            todos.push(taskInfo);
        }else{
        // isEditedTask = false;

            todos[isEditedTask].name= userTask;
        }
        // console.log(userTask);
        
        taskInput.value="";
     
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});