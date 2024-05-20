(() => {
    const form = document.querySelector('.edit-order-form');
    const completeBtn = document.querySelector('#completed');
    const rejectBtn = document.querySelector('#reject');
    const confirmBtn = document.querySelector('#confirm');
    const shippedBtn = document.querySelector('#shipped');

    const createInputElement = (value) => {
        const inputElement = document.createElement('input');
        inputElement.type = 'hidden';
        inputElement.value = value
        inputElement.name = 'status'

        return inputElement;
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            form.appendChild(createInputElement('CANCELED'));
            form.submit();
        });
    }

    if (completeBtn) {
        completeBtn.addEventListener('click', () => {
            form.appendChild(createInputElement('COMPLETED'));
            form.submit();
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            form.appendChild(createInputElement('SHIPPING'));
            form.submit();
        });
    }

    if (shippedBtn) {
        shippedBtn.addEventListener('click', () => {
            form.appendChild(createInputElement('SHIPPED'));
            form.submit();
        });
    }
})()
