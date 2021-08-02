const TODO_URL = "https://awsc4v.deta.dev/todos"

function createTodo(title, description) {
    const newTodo = {
        "title": title,
        "description": description,
        "completed": false
    }

    fetch(TODO_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        }).then(function(response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function(json) {
            console.log(json)
        })
        .catch(function(err) {
            console.warn(err)
        })
}

const saveButton = document.getElementById("save-button")
const nameInput = document.getElementById("name-input")
const detailInput = document.getElementById("detail-input")

saveButton.addEventListener('click', function() {
    const title = nameInput.value
    const description = detailInput.value
    createTodo(title, description)
})