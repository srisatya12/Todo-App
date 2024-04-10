let todoItemsContainer = document.getElementById("todoItemsContainer");

// let todoList = [{
//         text: "Learn HTML",
//         uniqueId: 1
//     },
//     {
//         text: "Learn CSS",
//         uniqueId: 2
//     },
//     {
//         text: "Learn JavaScript",
//         uniqueId: 3
//     }
// ];

let todoList = [];
let todoCount = 0;


function gettodofromlocalstorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

todoList = gettodofromlocalstorage();


function todostatus(checkboxId, labelId, todoId) {
    let inputElement = document.getElementById(checkboxId);
    let labelItem = document.getElementById(labelId);
    // if(inputElement.checked===true){
    //     labelItem.classList.add("checked");
    // }else{
    //     labelItem.classList.remove("checked");
    // }
    let todoObjectIndex = todoList.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueId;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    })
    // console.log(todoObjectIndex);
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === false) {
        todoObject.isChecked = true;
    } else {
        todoObject.isChecked = false;
    }
    labelItem.classList.toggle("checked");

}

function ondeletetodo(todoId) {
    let todoElement = document.getElementById(todoId);
    // console.log("delte icon");
    todoItemsContainer.removeChild(todoElement);
    let toDoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachtodoId = "todo" + eachTodo.uniqueId;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(toDoItemIndex, 1);
    console.log(todoList);
}



function add(todo) {

    let labelId = "label" + todo.uniqueId;
    let checkboxId = "checkboxInput" + todo.uniqueId;
    let todoId = "todo" + todo.uniqueId;



    let listItem = document.createElement("li");
    listItem.classList.add("todo-item-container", "d-flex", "flex-row");
    listItem.id = todoId;
    todoItemsContainer.appendChild(listItem);

    let inputElement = document.createElement("input");
    inputElement.classList.add("checkbox-input");
    inputElement.type = "checkbox";
    inputElement.id = "checkboxInput" + todo.uniqueId;
    inputElement.checked = todo.isChecked;
    listItem.appendChild(inputElement);
    inputElement.onclick = function() {
        todostatus(checkboxId, labelId, todoId);
    };

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    listItem.appendChild(labelContainer);


    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", "checkboxInput" + todo.uniqueId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = "label" + todo.uniqueId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let icon = document.createElement("i");
    icon.classList.add("far", "fa-trash-alt", "delete-icon");
    icon.onclick = function() {
        ondeletetodo(todoId);
    }
    deleteIconContainer.appendChild(icon);
}

for (item of todoList) {
    add(item);
}

function onAddTodo() {
    let todoUserInput = document.getElementById("todoUserInput");
    let userInputValue = todoUserInput.value;
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todoCount = todoCount + 1
    let todo = {
        text: userInputValue,
        uniqueId: todoCount,
        isChecked: false
    }
    todoList.push(todo);
    add(todo);
    todoUserInput.value = "";
}

let addTodoButton = document.getElementById("addTodoButton");
addTodoButton.onclick = function() {
    onAddTodo();
}

let savetodobutton = document.getElementById("savetodobutton");
savetodobutton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}