// THIS VERSION OF JS WAS REVIEWED BY CHATGPT - https://chatgpt.com/share/67088f96-44fc-800b-afe5-86642bc67f76

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.querySelector('.inputbox');
  const addButton = document.getElementById('add-input');
  const taskListContainer = document.getElementById('input-list');

  // Load the task list from local storage when the page loads
  showTasks();

  // Attach event listener for adding new tasks
  addButton.addEventListener('click', addTask);

  // Function to create a task element and append it to the list
  function createTaskElement(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'input-item';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    taskSpan.style.textDecoration = task.completed ? 'line-through' : 'none';

    const completeButton = document.createElement('button');
    completeButton.textContent = '✅';
    completeButton.className = 'complete-button';
    completeButton.onclick = function () {
      toggleTaskCompletion(task, taskSpan);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function () {
      deleteTask(task);
      taskListContainer.removeChild(taskItem);
    };

    // Append elements to the task item
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    return taskItem;
  }

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const newTask = { text: taskText, completed: false };
      const tasks = getTasksFromLocalStorage();
      tasks.push(newTask);
      saveTasksToLocalStorage(tasks);
      const taskItem = createTaskElement(newTask);
      taskListContainer.appendChild(taskItem);
      taskInput.value = ''; // Clear the input field
    }
  }

  // Function to toggle task completion
  function toggleTaskCompletion(task, taskSpan) {
    task.completed = !task.completed; // Toggle the completed state
    taskSpan.style.textDecoration = task.completed ? 'line-through' : 'none';
    saveTasksToLocalStorage(getTasksFromLocalStorage().map(t => t.text === task.text ? task : t)); // Save the updated task list
  }

  // Function to delete a task
  function deleteTask(task) {
    const tasks = getTasksFromLocalStorage().filter(t => t.text !== task.text);
    saveTasksToLocalStorage(tasks); // Save the updated tasks
  }

  // Function to save tasks to local storage
  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to get tasks from local storage
  function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : []; // Parse and return the task array
  }

  // Function to load and display tasks from local storage when the page loads
  function showTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
      const taskItem = createTaskElement(task);
      taskListContainer.appendChild(taskItem);
    });
  }
});
