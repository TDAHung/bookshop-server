const socket = io('http://localhost:3000');
const messages = document.getElementById('messages');
const userWrapper = document.getElementById('users-wrapper');
let userId = Number(document.querySelector('.user-btn').id);
let adminId = Number(document.querySelector('#userId').innerText)
socket.emit('joinRoom', adminId);

socket.on('onMessage', (payload) => {
    console.log(payload);
    const messageItem = createMessageElement(payload.content.content, payload.content.createdAt, payload.content.senderId);
    messages.appendChild(messageItem);
    userWrapper.innerHTML = '';
    payload.users.forEach(user => {
        const userItem = renderUser(user.id, `${user.firstName} ${user.lastName}`);
        userWrapper.appendChild(userItem);
    })
    renderTime();
});

socket.on('onUser', (payload) => {
    messages.innerHTML = '';
    payload.user.messages.forEach(message => {
        const messageElement = createMessageElement(message.content, message.createdAt, message.senderId);
        messages.appendChild(messageElement);
    });
    renderTime();
});

const renderUser = (id, name) => {
    const templateUser = document.querySelector("#templateUser");
    const userFragment = templateUser.content.cloneNode(true);
    const userElement = userFragment.querySelector("div");
    const userName = userElement.querySelector('.user-name');
    userElement.setAttribute('id', id);
    userName.innerText = name;
    userElement.addEventListener('click', () => {
        userId = Number(id);
        const message = {
            userId
        }
        socket.emit('clients', JSON.stringify(message))
    })
    return userElement;
}

const createMessageElement = (content, timestamp, senderId) => {
    const templateMessage = document.querySelector("#templateMessage");
    const messageFragment = templateMessage.content.cloneNode(true);
    const messageElement = messageFragment.querySelector("div");
    const messageWrapper = messageElement.querySelector('.message-wrapper');
    if (senderId) {
        messageWrapper.classList.add('bg-purple-200');
    } else {
        messageWrapper.classList.add('bg-gray-200', 'ml-auto');
    }
    const messageText = messageElement.querySelector('.content');
    messageText.innerText = content;
    const messageTimestamp = messageElement.querySelector('.createdAt');
    messageTimestamp.innerText = timestamp;
    return messageElement;
}


const userBtn = document.querySelectorAll('.user-btn');
userBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        userId = Number(btn.id);
        const message = {
            userId
        }
        socket.emit('clients', JSON.stringify(message))
    })
});

const renderTime = () => {
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

    const createdAt = document.querySelectorAll('.createdAt');
    createdAt.forEach(element => {
        element.innerText = new Date(element.innerText).toLocaleString('vi-VN', options);
    });
}

renderTime();

const btn = document.getElementById('message-send');
btn.addEventListener('click', () => {
    const input = document.getElementById('message-input');
    const content = input.value;
    const receiverId = userId;
    const message = {
        content,
        receiverId
    };
    socket.emit('message', JSON.stringify(message));
    input.value = '';
});

