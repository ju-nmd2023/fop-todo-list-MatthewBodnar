document.addEventListener("DOMContentLoaded", function() {
  const addItemBtn = document.getElementById('addItemBtn');
  const overlay = document.getElementById('overlay');
  const taskInput = document.getElementById('taskInput');
  const todoList = document.getElementById('todoList');

  loadTasks();

  addItemBtn.addEventListener('click', function() {
    overlay.style.display = 'flex';
    taskInput.focus();
  });

  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask(taskInput.value.trim(), false);
      overlay.style.display = 'none';
      taskInput.value = '';
    }
  });

  function addTask(taskText, isDone) {
    if (taskText === '') return;
  
    const li = document.createElement('li');
    li.textContent = taskText;
    const controls = document.createElement('div');
    controls.className = 'task-controls';
  
    const greenCircle = document.createElement('div');
    greenCircle.className = 'green-circle';
    greenCircle.title = 'Mark as Done';
    greenCircle.addEventListener('click', function() {
      markTaskAsDone(li);
    });
  
    const redSquare = document.createElement('div');
    redSquare.className = 'red-square';
    redSquare.title = 'Delete Task';
    redSquare.addEventListener('click', function() {
      li.remove();
      saveTasks();
    });
  
    controls.appendChild(greenCircle);
    controls.appendChild(redSquare);
    li.appendChild(controls);
    todoList.appendChild(li);
  
    if (isDone) {
      markTaskAsDone(li);
    }
  
    saveTasks();
  }
  

  function toggleTaskStatus(li) {
    li.classList.toggle('done');
    saveTasks();
  }
  
  function markTaskAsDone(li) {
    li.classList.toggle('done');
    const taskText = li.firstChild.textContent; 
    li.firstChild.innerHTML = `<span style="color: lightgreen; text-decoration: line-through;">${taskText}</span>`; /* CHATGPT ASSISTED LINE */
    saveTasks();
  }

  function saveTasks() {/* CHATGPT ASSISTED FUNCTION */
    const tasks = [];
    Array.from(todoList.children).forEach(li => {
      const taskText = li.textContent.trim();
      const isDone = li.classList.contains('done');
      tasks.push({ text: taskText, done: isDone });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      addTask(task.text, task.done);
    });
  }
});
