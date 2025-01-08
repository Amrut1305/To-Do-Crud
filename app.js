const todoUl = document.getElementById("todoUl");
const todoForm = document.getElementById("todoForm");
const todoItem = document.getElementById("todoItem");
const addToDo = document.getElementById("addToDo");
const updateToDo = document.getElementById("updateToDo");
const cancelToDoEdit = document.getElementById("cancelToDoEdit");









function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let demo =[{
    todoItem : "Angular",
    id : uuid()
}]


function getData(){
    if(localStorage.getItem("todoData")){
        return JSON.parse(localStorage.getItem("todoData"))
    }else{
        return demo;
    }
}

function setData(arr){
    localStorage.setItem("todoData", JSON.stringify(arr))
}

let templating = (array) =>{
    result = ""
    array.forEach(element => {
        result +=`
                    <li class="list-group-item d-flex justify-content-between" id="${element.id}">
                        <strong>${element.todoItem}</strong>
                        <div class="btngrp">
                        <button class="btn btn-sm btn-primary" onclick="todoEditHandler(this)">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="todoRemoveHandler(this)">Remove</button>
                        </div>
                    </li>
                `
    });
    todoUl.innerHTML = result;
}


templating(getData());



let submitTodoHandler = (eve)=>{
    eve.preventDefault();

    updateToDo.classList.add("d-none")
    addToDo.classList.remove("d-none")
    let newObj = {
        todoItem : todoItem.value,
        id : uuid()
    }
    let localData = getData();
    localData.unshift(newObj);
    setData(localData);

    let li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `
                    <strong>${newObj.todoItem}</strong>
                    <div class="btngrp">
                        <button class="btn btn-sm btn-primary" onclick="todoEditHandler(this)">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="todoRemoveHandler(this)">Remove</button>
                    </div>
                  `
    li.id = newObj.id;
    todoUl.append(li);

    Swal.fire({
    title: "Todo data Added Successfully!",
    icon: "success",
    draggable: true
});
    todoForm.reset();
}

let todoRemoveHandler=(eve)=>{

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            let getId = eve.closest("li").id;

            let localData =getData();
            let romvingObjIndex = localData.findIndex(todo=>todo.id === getId);
            localData.splice(romvingObjIndex,1)
            templating(localData);
            setData(localData);

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      }); 
}

let todoEditHandler=(eve)=>{
    updateToDo.classList.remove("d-none")
    addToDo.classList.add("d-none")

    let getId = eve.closest("li").id;
    localStorage.setItem("id", JSON.stringify(getId))

    let localData = getData();
    let editingObj = localData.find(todo=>todo.id === getId);
    todoItem.value = editingObj.todoItem;
}

let todoUpdateHandler = (eve) =>{
    let getId = JSON.parse(localStorage.getItem("id"));

    let localData = getData();
    let editingObj = localData.find(todo=>todo.id === getId);

    let editingObjIndex = localData.findIndex(todo=>todo.id === getId);
    editingObj.todoItem = todoItem.value;

    localData.splice(editingObjIndex, 1, editingObj);

    updateToDo.classList.add("d-none")
    addToDo.classList.remove("d-none")
    templating(localData);
    Swal.fire({
        title: "Updated!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    setData(localData);
    todoForm.reset();
}


let todocancelHandler = (eve) =>{
    todoForm.reset();
    updateToDo.classList.add("d-none")
    addToDo.classList.remove("d-none");
}




updateToDo.addEventListener("click", todoUpdateHandler);
todoForm.addEventListener("submit", submitTodoHandler);
cancelToDoEdit.addEventListener("click", todocancelHandler);