const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");


const appendMessage = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name = prompt("Enter your name");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    appendMessage(`${name} joined the chat`, 'right');
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

socket.on('receive', data => {
    appendMessage(`${data.name}: ${data.message}`, 'left');
})
socket.on('user-left', name => {
    appendMessage(`${name} left the chat`, 'left');
})