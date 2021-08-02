const TODO_URL = "https://awsc4v.deta.dev/todos"

let url = new URL(window.location.href);
let todoKey = url.searchParams.get("id");
const inputName = document.getElementById("input-name");
const inputDetail = document.getElementById("input-detail");
let isTodoCompleted = false;

getTodoByKey(todoKey);

function getTodoByKey(key) {
    fetch(`${TODO_URL}/${key}`)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function(json) {
            handleGetTodoJson(json);
        })
        .catch(function(err) {
            console.warn(err);
        })
}

function handleGetTodoJson(json) {
    inputName.value = json.title;
    inputDetail.value = json.description;
    isTodoCompleted = json.completed;
}

function updateTodo(key, title, description, completed) {
    const editTodo = {
        'key': key,
        'title': title,
        'description': description,
        'completed': completed
    };

    fetch(TODO_URL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editTodo)
        }).then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function(json) {
            alert("Update Successfully");
            window.location = "/todo_list.html";
        })
        .catch(function(err) {
            console.warn(err);
        })
}

function deleteTodo(key) {
    fetch(`${TODO_URL}/${key}`, {
            method: "DELETE"
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function(json) {
            window.location = "/todo_list.html";
        })
        .catch(function(err) {
            console.warn(err);
        })
}

const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", function() {
    deleteTodo(todoKey);
})

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", function() {
    updateTodo(todoKey, inputName.value, inputDetail.value, isTodoCompleted);
})