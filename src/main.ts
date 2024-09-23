// Task class
class Task {
  constructor(public title: string, public completed: boolean = false) {}
}

// Get references to DOM elements
const taskInput = document.getElementById("input-task") as HTMLInputElement;
const addTaskButton = document.getElementById("add-btn") as HTMLButtonElement;
const taskList = document.getElementById("list") as HTMLUListElement;

// Array to store tasks
let tasks: Task[] = [];

// Add task button event listener
addTaskButton.addEventListener("click", () => {
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== "") {
    const newTask = new Task(taskTitle);
    tasks.push(newTask);
    displayTasks();
    taskInput.value = "";
  }
});

// Function to display tasks in the list
function displayTasks() {
  taskList.innerHTML = ""; // Clear previous tasks
  let item = "";
  tasks.forEach((task) => {
   item +=`<div class="task-item">  
                    <span class="task-text">${task.title}</span>  
                    <button class="edit-button"><i class="far fa-edit fa-xs"></i></button>  
                    <button class="delete-button"><i class="fa-regular fa-trash-can"></i></button>  
                </div>  `
              });
              taskList.innerHTML = (item);
}
