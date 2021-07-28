const form = document.querySelector("#addTaskForm")
const input = document.querySelector("#txtTaskName")
const taskList = document.querySelector("#task-list")
const todoText = document.querySelector("#todo-text")
const deleteAllItem = document.querySelector("#btnDeleteAll")

let items = ["item1"]
let newTask

loadItems()
eventListeners()




//event listeners to add and to delete items
function eventListeners() {
    //add event
    form.addEventListener('submit', addNewItem)
        // delete events
    taskList.addEventListener('click', deleteItem)
    deleteAllItem.addEventListener('click', deleteAll)



}

//listing items from local storage
function loadItems() {

    items = getItemsFromLS();
    items.forEach(function(item) {
        createItem(item)
    })
}

//creating a new item
function createItem(text) {

    //adjusting li 
    const li = document.createElement('li')
    const a = document.createElement('a')
    const p = document.createElement('p')
    li.className = "list-group-item"
    a.className = "btn btn-danger float-end"
    a.innerHTML = '<i class="fas fa-times"></i>'
    a.setAttribute('href', '#');
    p.className = "d-inline"
    p.appendChild(document.createTextNode(text))
    li.appendChild(p)
    li.appendChild(a)
        //adding li to taskList
    taskList.appendChild(li)

}

//adding new item
function addNewItem(e) {

    if (input.value === "") {
        alert("Enter A Task")
    } else {

        createItem(input.value)
        setItemToLS(input.value)
    }

    input.value = ''
    e.preventDefault()
}


//to delete all items
function deleteAll() {

    if (confirm("are you sure?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
        //items are removed from local storage too
        localStorage.clear()
    }
}

//to delete an item
function deleteItem(e) {

    if (e.target.className === "fas fa-times") {
        //e.target.parentElement.parentElement => list item
        e.target.parentElement.parentElement.remove()
        deleteItemFromLS(e.target.parentElement.parentElement.textContent)
    }
    e.preventDefault()
}


function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items
}

function setItemToLS(text) {
    items = getItemsFromLS()
    items.push(text)
    localStorage.setItem('items', JSON.stringify(items))
}

function deleteItemFromLS(text) {
    items = getItemsFromLS()
    items.forEach(function(item, index) {
        if (item === text) {
            items.splice(index, 1)
        }
    })

    localStorage.setItem('items', JSON.stringify(items))
}