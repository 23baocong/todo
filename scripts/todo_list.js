const TODO_URL = "https://awsc4v.deta.dev/todos?completed="

let filterTodoCompleted = false

fetchTodo(filterTodoCompleted)

function handleBtnFilterOnClick() {
    filterTodoCompleted = !filterTodoCompleted
    fetchTodo(filterTodoCompleted)
}

function fetchTodo(isCompleted) {
    fetch(`${TODO_URL}${isCompleted}`)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function(json) {
            handleGetTodoJson(json)
        })
        .catch(handleFetchTodoError)
}


function handleGetTodoJson(data) {
    const todoSectionDocument = document.getElementById("todo-section")
    todoSectionDocument.innerHTML = ""
    for (element of data) {
        let todoHtml = createTodoElement(element)
        todoSectionDocument.innerHTML += todoHtml
    }
}

// TODO handle completed
function createTodoElement(todo) {
    let displayImgTodo = "";
    if (todo.completed == false) {
        displayImgTodo = "hidden";
    }
    return `
    <a href="/todo_edit.html?id=${todo.key}">
    <div id="item" class="item">
        <img style="visibility:${displayImgTodo};" class="icon" src="images/hook.png" alt="Hook">
        <div class="content">
            <h2 class="title">${todo.title}</h2>
            <p class="description">${todo.description}</p>
        </div>
    </div>
    </a>
    `
}


function handleFetchTodoError(err) {
    console.warn(err)
}