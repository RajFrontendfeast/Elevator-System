const elevators = document.querySelectorAll('.elevate_block');

document.querySelectorAll('.action_btn').forEach(button => {
    button.addEventListener('click', () => {
        const floor = parseInt(button.dataset.floor);
        if (!button.classList.contains('waiting')) {
            button.classList.add('waiting');
            button.innerText = 'waiting';
            queue.push({ floor, button });
            processQueue();
        }
    });
});

