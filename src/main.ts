// Task class
class Task {
  constructor(public title: string, public completed: boolean = false) {}
}

// TaskManager class to manage tasks
class TaskManager {
  private tasks: Task[] = [];

  addTask(title: string) {
    const newTask = new Task(title);
    this.tasks.push(newTask);
  }

  editTask(index: number, title: string) {
    if (this.tasks[index]) {
      this.tasks[index].title = title;
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  getTasks() {
    return this.tasks;
  }
}

// TaskEditor class to handle task editing
class TaskEditor {
  private taskManager: TaskManager;
  public editingIndex: number | null = null;

  constructor(taskManager: TaskManager) {
    this.taskManager = taskManager;
  }

  setEditingIndex(index: number) {
    this.editingIndex = index;
  }

  editTask(title: string) {
    if (this.editingIndex !== null) {
      this.taskManager.editTask(this.editingIndex, title);
      this.editingIndex = null; // Reset editing index
    }
  }
}

// TaskDeleter class to handle task deletion
class TaskDeleter {
  private taskManager: TaskManager;

  constructor(taskManager: TaskManager) {
    this.taskManager = taskManager;
  }

  deleteTask(index: number) {
    this.taskManager.deleteTask(index);
  }
}

// Get references to DOM elements
const taskInput = document.getElementById("input-task") as HTMLInputElement;
const addTaskButton = document.getElementById("add-btn") as HTMLButtonElement;
const taskList = document.getElementById("list") as HTMLUListElement;

// Create instances of TaskManager, TaskEditor, and TaskDeleter
const taskManager = new TaskManager();
const taskEditor = new TaskEditor(taskManager);
const taskDeleter = new TaskDeleter(taskManager);

// Add task button event listener
addTaskButton.addEventListener("click", () => {
  const taskTitle = taskInput.value.trim();

  if (taskTitle !== "") {
    if (taskEditor.editingIndex !== null) {
      taskEditor.editTask(taskTitle);
      addTaskButton.textContent = "+"; // Reset button text
    } else {
      taskManager.addTask(taskTitle);
    }
    taskInput.value = ""; // Clear the input
    displayTasks(); // Refresh the task list
  }
});

// Function to display tasks in the list
function displayTasks() {
  taskList.innerHTML = ""; // Clear previous tasks
  const tasks = taskManager.getTasks();
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
      taskEditor.setEditingIndex(index);
      taskInput.value = taskManager.getTasks()[index].title; // Set the input value to the task title
      addTaskButton.textContent = "Update Task"; // Change button text to indicate update
    });
  });

  // Add event listeners for delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      taskDeleter.deleteTask(index); // Call deleteTask with the index of the task
      displayTasks(); // Refresh the task list
    });
  });
}

