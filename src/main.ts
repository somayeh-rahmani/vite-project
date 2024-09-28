// Task class
class Task {
  constructor(public title: string, public completed: boolean = false) {}

  edit(title: string) {
    this.title = title;
  }

  static tasks: Task[] = [];

  static addTask(title: string) {
    const newTask = new Task(title);
    Task.tasks.push(newTask);
  }

  static deleteTask(index: number) {
    Task.tasks.splice(index, 1);
  }

  static getTasks() {
    return Task.tasks;
  }
}

// Get references to DOM elements
const taskInput = document.getElementById("input-task") as HTMLInputElement;
const addTaskButton = document.getElementById("add-btn") as HTMLButtonElement;
const taskList = document.getElementById("list") as HTMLUListElement;

// Add task button event listener
addTaskButton.addEventListener("click", () => {
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== "") {
    const editingIndex = parseInt(addTaskButton.dataset.editingIndex || '-1');
    if (editingIndex !== -1) {
      Task.tasks[editingIndex].edit(taskTitle);
      addTaskButton.textContent = "+"; // Reset button text
      delete addTaskButton.dataset.editingIndex; // Clear editing index
    } else {
      Task.addTask(taskTitle);
    }
    taskInput.value = ""; // Clear the input
    displayTasks(); // Refresh the task list
  }
});

// Function to display tasks in the list
function displayTasks() {
  taskList.innerHTML = ""; // Clear previous tasks
  const tasks = Task.getTasks();
  let item = "";
  tasks.forEach((task, index) => {
    item += `<div class="task-item">  
                    <span class="task-text">${task.title}</span>  
                    <button class="edit-button" data-index="${index}"><i class="far fa-edit fa-xs"></i></button>  
                    <button class="delete-button" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>  
                </div>`;
  });
  taskList.innerHTML = item;

  // Add event listeners for edit buttons
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const index = parseInt((event.target as HTMLElement).closest("button")!.dataset.index!);
      taskInput.value = Task.getTasks()[index].title; // Set the input value to the task title
      addTaskButton.textContent = "Update Task"; // Change button text to indicate update
      addTaskButton.dataset.editingIndex = index.toString(); // Set editing index
    });
  });

  // Add event listeners for delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      Task.deleteTask(index); // Call deleteTask with the index of the task
      displayTasks(); // Refresh the task list
    });
  });
}


