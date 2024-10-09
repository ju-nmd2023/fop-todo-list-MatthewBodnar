document.addEventListener("DOMContentLoaded", function() {

  const taskInput = document.querySelector('.inputbox');
  const addButton = document.getElementById('add-input');
  const taskListContainer = document.getElementById('input-list');

  //add a new task
  function addTask() {
    const taskText = taskInput.value.trim(); // taskText into a whitespace trimmed taskInput

    if (taskText !== '') { //add the task if input is not empty
      const taskItem = document.createElement('div'); // create a new task element
      taskItem.className = 'input-item';
      taskItem.textContent = taskText;

      // append the new task to the list container
      taskListContainer.appendChild(taskItem);

      // store the task text in local storage
      storeTaskInLocalStorage(taskText);

      // clear the inputbox after adding the task
      taskInput.value = '';
    }
  }

  // store a new task in local storage
  function storeTaskInLocalStorage(taskText) {
    let tasks = localStorage.getItem('tasks'); // retrieve existing tasks as a string
      if (tasks === null) {
       tasks = []; // if no tasks were stored, empty array
       } else {
         tasks = JSON.parse(tasks); // if tasks were stored, combine them into an array
         }

    tasks.push(taskText); // add the new task to the tasks array

    // change the tasks array back to a string and save it to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // load tasks from local storage when the page loads
  function loadTasks() {
    let storedTasks = localStorage.getItem('tasks');
      if (storedTasks === null) {
        storedTasks = [];
        } else {
          storedTasks = JSON.parse(storedTasks);
          }

    // loop through each task in the array and display it on the page
    storedTasks.forEach(function(taskText) {
    const taskItem = document.createElement('div');
    taskItem.className = 'input-item';
    taskItem.textContent = taskText;
    taskListContainer.appendChild(taskItem);
    });
  }

  addButton.addEventListener('click', addTask);

  // display stored tasks
  loadTasks();

});