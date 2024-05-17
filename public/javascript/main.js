(() => {
    const creatdAtElements = document.querySelectorAll('.created_at');
    const updatedAtElements = document.querySelectorAll('.updated_at');
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh'
    };
    creatdAtElements.forEach(element => {
        element.innerText = new Date(element.innerText).toLocaleString('vi-VN', options);
    });

    updatedAtElements.forEach(element => {
        element.innerText = new Date(element.innerText).toLocaleString('vi-VN', options);
    });
})()
