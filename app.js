// Selecting DOM Elements
const input = document.getElementById("todo-input");
const add = document.getElementById("todo-add");
const list = document.getElementById("todo-list");

// Retrieve the saved todo list (if anya) from localstorage
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Function to save the array of todos in localstorage
const saveTodos = () => {
    localStorage.setItem("todos",JSON.stringify(todos));
}

// Function to create a todo list item DOM node
const createTodoNode = (todo, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", ()=>{
        todo.completed = checkbox.checked;

        // TODO -> Visual feedback : strike-through 
        textSpan.style.textDecoration = todo.completed?"line-through":"";
        saveTodos();
    })

    // Text of the Todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px";
    if(todo.completed){
        textSpan.style.textDecoration = "line-through";
    }
        // Add dbl-click evnt listner to "EDIT" the todo
        textSpan.addEventListener("dblclick", ()=>{
            const newText = prompt("Edit todo", todo.text);
            if(newText !== null){
                todo.text = newText.trim();
                textSpan.textContent = todo.text;
                saveTodos();
            }
        });

        // Delete Todo Button
        const delBtn = document.createElement("button");
        delBtn.textContent = " - ";
        delBtn.style.border = "1px solid red";
        delBtn.style.color = "red";
        delBtn.style.cursor = "pointer";
        delBtn.addEventListener("click", ()=>{
            todos.splice(index, 1);
            render();
            saveTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);

        return li;

}

// Function to render the todo list 
const render = () =>{
    list.innerHTML = "";

    todos.forEach((todo,index) => {
        const node = createTodoNode(todo,index);
        list.appendChild(node);
    });
}

const addTodo = () => {
    const text = input.value.trim();
    if(!text){
        return
    }

    // Push a new Todo Object
    todos.push({text, completed:false});
    input.value = "";
    render();
    saveTodos();
}

add.addEventListener("click", addTodo);
input.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        addTodo();
    }
});
render();
