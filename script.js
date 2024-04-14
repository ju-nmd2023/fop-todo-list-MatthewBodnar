document.addEventListener("DOMContentLoaded", function() {

  // References to elements in Html
  const addItemBtn = document.getElementById('addItemBtn');
  const overlay = document.getElementById('overlay');
  const taskInput = document.getElementById('taskInput');
  const todoList = document.getElementById('todoList');
  const undoBtn = document.getElementById('undoBtn');
  let deletedTask = null; // Variable stroing recently deleted task
  let undoVisible = false; // Tracking the undo button visibility

  // Initially hide the overlay and undo button when the page loads
  overlay.style.display = 'none';
  undoBtn.style.display = 'none';

  loadTasks(); // Function loading tasks from local storage

  // Click event on the "+" button to see the task input field and overlay --- also hides undo button
  addItemBtn.addEventListener('click', function() {
    hideUndoButton();
    overlay.style.display = 'flex';
    taskInput.focus(); // automatically letting you type your task
  });

  // Add the new task and remove the overlay and input field when Enter is pressed
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask(taskInput.value.trim(), false) // trim means removing leading or trailing white space characters
      overlay.style.display = 'none';
      taskInput.value = '';
    }
  });

  // Hides the overlay and dialog when Escape is prssed
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      overlay.style.display = 'none';
      taskInput.value = '';
    }
  });

  // Add new task to the list with the dialoged text --- ChatGPT assisted fucntion
  function addTask(taskText, isDone) {
    if (taskText === '') return; // if the input field is empty, go back
  
    // Creating new li element for the taks
    const li = document.createElement('li');
    li.textContent = taskText; // set the text content of the <li> element
    li.className = isDone ? 'task-item done' : 'task-item'; // set class based on completion status
  
    // Create controls(buttons) for the task (mark as done or delete)
    const controls = document.createElement('div'); 
    controls.className = 'task-controls';
  
    // Green circle button
    const greenCircle = document.createElement('div');
    greenCircle.className = 'green-circle';
    greenCircle.title = 'Mark as Done';
    greenCircle.addEventListener('click', function() {
      toggleTaskStatus(li); // switch the task completion status when button clicked
    });
    
    // Red circle button
    const redCircle = document.createElement('div');
    redCircle.className = 'red-circle';
    redCircle.title = 'Delete Task';
    redCircle.addEventListener('click', function() {
      deleteTask(li); // delete task when button clicked
      showUndoButton(); // show undo button after deleting a task
    });
  
    // Append the buttons to the controls container
    controls.appendChild(greenCircle);
    controls.appendChild(redCircle);
    li.appendChild(controls); // append the controls container to the task <li> element
    todoList.appendChild(li); // append the task <li> element to the todo list <ul> element
  
    saveTasks(); // save the updated list of tasks to local storage
  }

  // Being able to switch the task as done or not done --- GPT assisted to connect this with the prev. function
  function toggleTaskStatus(li) {
    li.classList.toggle('done');
    hideUndoButton(); // hide undo button when marking a task as done
    saveTasks();
  }

  // Delete task from list and show undo button
  function deleteTask(li) {
    if (li.parentNode === todoList) { // ensure the <li> is a child of the todo list
      deletedTask = li; // store the deleted task for potential undo
      li.remove(); // remove task from DOM
      saveTasks();
    }
  }

  // Saving the current list of tasks to the browser's local storage --- ChatGPT assisted function
  function saveTasks() {
    const tasks = [];
    Array.from(todoList.children).forEach(task => { // loop through all <li> elements inside the todo list
      const taskText = task.textContent.trim(); // get the text content
      const isDone = task.classList.contains('done');  // get the completion status
      tasks.push({ text: taskText, done: isDone });  // store task details (text and completion status) in an array
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // store the array of tasks as a JSON string in local storage
  }

  // Loading previously saved listed tasks --- ChatGPT assisted to connect this with the prev. function
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // get the tasks back
    tasks.forEach(task => { // loop through the tasks and add them to the list
      addTask(task.text, task.done);
    });
  }

  // Undo button is visible
  function showUndoButton() {
    if (!undoVisible) { // check button if its not already visible
      undoBtn.style.display = 'inline-block';
      undoVisible = true; // update the button's state as visible
    }
  }

  // Undo button is hidden
  function hideUndoButton() {
    if (undoVisible) { // check button if its already visible
      undoBtn.style.display = 'none';
      undoVisible = false; // update the button's state as hidden
    }
  }

  // Undo button pressed --- restoring the most recently deleted task, even if it was marked as done or not done
  undoBtn.addEventListener('click', function() {
    if (deletedTask) {
      addTask(deletedTask.textContent.trim(), deletedTask.classList.contains('done')); // adding the deleted task back
      hideUndoButton(); // hide the button once pressed
    }
  });
});
