document.addEventListener("DOMContentLoaded", function() {
  const addItemBtn = document.getElementById('addItemBtn');
  const overlay = document.getElementById('overlay');
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const todoList = document.getElementById('todoList');

  addItemBtn.addEventListener('click', function() {
  overlay.style.display = 'flex';
    taskInput.focus();
  });

  addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
    const li = document.createElement('li');
      li.textContent = taskText;
      todoList.appendChild(li);
      taskInput.value = '';
      overlay.style.display = 'none';
    }
  });
});

