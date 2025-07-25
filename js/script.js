// Select DOM elements
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const addButton = document.querySelector('#todo-form button');
const todoTableBody = document.querySelector('#todo-table tbody');
const filterButton = document.getElementById('filter-button');
const deleteAllButton = document.getElementById('delete-all-button');

// Array to store tasks
let tasks = [];

// Function to render tasks in the table
function renderTasks() {
    todoTableBody.innerHTML = '';
    if (tasks.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 4;
        cell.textContent = 'No task found';
        row.appendChild(cell);
        todoTableBody.appendChild(row);
        return;
    }

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        const taskCell = document.createElement('td');
        const dateCell = document.createElement('td');
        const statusCell = document.createElement('td');
        const actionsCell = document.createElement('td');

        taskCell.textContent = task.task;
        dateCell.textContent = task.dueDate;

        // Status (completed or not)
        const statusCheckbox = document.createElement('input');
        statusCheckbox.type = 'checkbox';
        statusCheckbox.checked = task.completed;
        statusCheckbox.addEventListener('change', () => {
            task.completed = statusCheckbox.checked;
            saveTasks();
        });
        statusCell.appendChild(statusCheckbox);

        // Actions (edit and delete)
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(index));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(taskCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);
        todoTableBody.appendChild(row);
    });
}

// Function to add a new task
function addTask(task, dueDate) {
    tasks.push({ task, dueDate, completed: false });
    saveTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

// Function to edit a task
function editTask(index) {
    const newTask = prompt('Edit Task:', tasks[index].task);
    const newDueDate = prompt('Edit Due Date:', tasks[index].dueDate);
    if (newTask && newDueDate) {
        tasks[index].task = newTask;
        tasks[index].dueDate = newDueDate;
        saveTasks();
    }
}

// Function to filter tasks by completion status
function filterTasks(completed) {
    tasks = tasks.filter(task => task.completed === completed);
    saveTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}

// Event listeners
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    if (task && dueDate) {
        addTask(task, dueDate);
        taskInput.value = '';
        dueDateInput.value = '';
    }
});

filterButton.addEventListener('click', () => {
    const filterValue = prompt('Filter by completion status (true/false):');
    if (filterValue === 'true' || filterValue === 'false') {
        filterTasks(filterValue === 'true');
    } else {
        alert('Invalid filter value. Use "true" or "false".');
    }
});

deleteAllButton.addEventListener('click', () => {
    tasks = [];
    saveTasks();
});

// Load tasks on page load
loadTasks();