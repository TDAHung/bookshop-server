const socket = io('http://localhost:3000');

socket.on('onMessage', (content) => {
    console.log(content);
});


const btn = document.getElementById('sendBtn');
btn.addEventListener('click', () => {
    const input = document.getElementById('messageInput');
    const content = input.value;
    const userId = 1;
    const message = {
        content,
        userId
    };
    socket.emit('message', JSON.stringify(message));
    input.value = '';
});

