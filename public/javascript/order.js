(() => {
    const form = document.querySelector('.edit-order-form');
    const completeBtn = document.querySelector('#completed');
    const rejectBtn = document.querySelector('#reject');
    const confirmBtn = document.querySelector('#confirm');

    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            const inputElement = document.createElement('input');
            inputElement.type = 'hidden';
            inputElement.value = 'CANCELED'
            inputElement.name = 'status'
            form.appendChild(inputElement);
            form.submit();
        });
    }

    if (completeBtn) {
        completeBtn.addEventListener('click', () => {
            const inputElement = document.createElement('input');
            inputElement.type = 'hidden';
            inputElement.value = 'COMPLETED';
            inputElement.name = 'status';
            form.appendChild(inputElement);
            form.submit();
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', (event) => {
            const inputElement = document.createElement('input');
            inputElement.type = 'hidden';
            inputElement.value = 'SHIPPED';
            inputElement.name = 'status';
            form.appendChild(inputElement);
            form.submit();
        });
    }
})()
