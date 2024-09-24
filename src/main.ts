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
let editingIndex: number | null = null; // Variable to track the index of the task being edited

// Add task button event listener
addTaskButton.addEventListener("click", () => {
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== "") {
    if (editingIndex !== null) {
      // If we are editing an existing task
      tasks[editingIndex].title = taskTitle; // Update the task title
      editingIndex = null; // Reset editing index
      addTaskButton.textContent = "+"; // Reset button text
    } else {
      // If we are adding a new task
      const newTask = new Task(taskTitle);
      tasks.push(newTask);
    }
    taskInput.value = ""; // Clear the input
    displayTasks(); // Refresh the task list
  }
});

// Function to display tasks in the list
function displayTasks() {
  taskList.innerHTML = ""; // Clear previous tasks
  let item = "";
  tasks.forEach((task, index) => {
    item += `<div class="task-item">  
                    <span class="task-text">${task.title}</span>  
                    <button class="edit-button" data-index="${index}"><i class="far fa-edit fa-xs"></i></button>  
                    <button class="delete-button"><i class="fa-regular fa-trash-can"></i></button>  
                </div>`;
  });
  taskList.innerHTML = item;

  // Add event listeners for edit buttons
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const index = parseInt((event.target as HTMLElement).closest("button")!.dataset.index!);
      editTask(index);
    });
  });
  // Add event listeners for delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteTask(index); // Call deleteTask with the index of the task
    });
  });
}

// Function to edit a task
function editTask(index: number) {
  const taskToEdit = tasks[index];
  taskInput.value = taskToEdit.title; // Set the input value to the task title
  editingIndex = index; // Set the editing index to the current task index
  addTaskButton.textContent = "Update Task"; // Change button text to indicate update
}
// Function to delete a task
function deleteTask(index: number) {
  tasks.splice(index, 1); // Remove the task from the tasks array
  displayTasks(); // Refresh the task list
}

// Add event listeners for delete buttons in the displayTasks function
const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    deleteTask(index); // Call deleteTask with the index of the task
  });
});
