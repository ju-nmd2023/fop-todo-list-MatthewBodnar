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

      const taskSpan = document.createElement('span'); // span holding task's text
      taskSpan.textContent = taskText;

      // complete button
      const completeButton = document.createElement('button');
      completeButton.textContent = '✅';
      completeButton.className = 'complete-button';
      completeButton.onclick = function() {
        toggleTaskCompletion(taskSpan,taskText);
      };

      // delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '❌';
      deleteButton.className = 'delete-button';
      deleteButton.onclick = function() {
        deleteTask(taskText, taskItem);
      };

      // append elements to the task item
      taskItem.appendChild(taskSpan);
      taskItem.appendChild(completeButton);
      taskItem.appendChild(deleteButton);

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
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // retrieve existing tasks as a string

    tasks.push(taskText); // add the new task to the tasks array

    // change the tasks array back to a string and save it to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // load tasks from local storage when the page loads
  function loadTasks() {
    let storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      storedTasks = JSON.parse(storedTasks); // parse the JSON string into an array

      if (Array.isArray(storedTasks)) { 

        // loop through each task in the array and display it on the page
        storedTasks.forEach(function(taskText) {
          const taskItem = document.createElement('div');
          taskItem.className = 'input-item';

          const taskSpan = document.createElement('span');
          taskSpan.textContent = taskText.replace(' [done]', ''); // display text without '[done]'
   
          if (taskText.endsWith(' [done]')) { // if task '[done]' then line-through
            taskSpan.style.textDecoration = 'line-through';
          }

          // create complete button
          const completeButton = document.createElement('button');
          completeButton.textContent = '✅';
          completeButton.className = 'complete-button';
          completeButton.onclick = function() {
            toggleTaskCompletion(taskSpan, taskText);
          };

          // create delete button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = '❌';
          deleteButton.className = 'delete-button';
          deleteButton.onclick = function() {
            deleteTask(taskText, taskItem);
          };
   
          // append elements to the task item
          taskItem.appendChild(taskSpan);
          taskItem.appendChild(completeButton);
          taskItem.appendChild(deleteButton);

          taskListContainer.appendChild(taskItem);
        });
      }
    }
  }

  // toggle task completion
  function toggleTaskCompletion(taskSpan, taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


    // toggle the line-through
    const isCompleted = taskSpan.style.textDecoration === 'line-through';
    taskSpan.style.textDecoration = isCompleted ? 'none' : 'line-through';

    // update task in local storage by adding or removing '[done]'
    const updatedTasks = tasks.map(task => {
      if (task === taskText) {
        return isCompleted ? task.replace(' [done]', '') : task + ' [done]'; // toggle '[done]'
      }
      return task;
    });

    // save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  // delete a task
  function deleteTask(taskText, taskItem) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks = tasks.filter(task => task !== taskText && task !== taskText + ' [done]'); // removal
      localStorage.setItem('tasks', JSON.stringify(tasks)); // update local storage
    
    taskListContainer.removeChild(taskItem); // remove task from the DOM
  }

  addButton.addEventListener('click', addTask);

  // display stored tasks
  loadTasks();

});