function allowDrop(event) {
    event.preventDefault();
    const column = event.target.closest('.kanban-column');
    column.classList.add('highlight');
}

function drag(event) {
    event.dataTransfer.setData("taskID", event.target.id);
    event.target.classList.add('dragging');
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskID");
    
    if (!taskId) {
        console.error("Task ID no encontrado.");
        return;
    }

    const taskElement = document.getElementById(taskId);

    if (!taskElement) {
        console.error("Elemento de tarea no encontrado.");
        return;
    }

    event.target.closest('.kanban-column').classList.remove('highlight');

    const dropTarget = event.target.closest('.kanban-column');
    const tasksInColumn = dropTarget.querySelectorAll('.task');

    if (tasksInColumn.length > 0) {
        const middleIndex = Math.floor(tasksInColumn.length / 2);
        const dropBefore = event.clientY < tasksInColumn[middleIndex].getBoundingClientRect().top;

        if (dropBefore) {
            dropTarget.insertBefore(taskElement, tasksInColumn[middleIndex]);
        } else {
            dropTarget.appendChild(taskElement);
        }
    } else {
        dropTarget.appendChild(taskElement);
    }

    updateTaskState(taskElement, dropTarget.id);
}


function updateTaskState(taskElement, newState) {
    const taskID = taskElement.id;
    console.log(`Tarea ${taskID} movida a: ${newState}`);
}

document.querySelectorAll('.task').forEach(task => {
    task.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging');
    });
});

function handleFileDrop(event) {
    event.preventDefault();
    const taskElement = event.target.closest('.task'); 
    if (!taskElement) {
        console.error("No se ha soltado el archivo sobre una tarea.");
        return;
    }

    const taskId = taskElement.id;  
    if (!taskId) {
        console.error("Task ID no encontrado.");
        return;
    }
    const file = event.dataTransfer.files[0];
    
    if (file) {
        const fileInfo = taskElement.querySelector('.file-info');
        fileInfo.textContent = `Archivo adjunto: ${file.name}`;
    }
}


function handleDragOver(event) {
    event.preventDefault();
}
