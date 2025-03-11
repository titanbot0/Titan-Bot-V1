const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    appendMessage('User', userMessage);
    userInput.value = '';

    const response = await getTitanResponse(userMessage);
    appendMessage('Titan', response);
});

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = sender.toLowerCase();
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
}

async function getTitanResponse(message) {
    const response = await fetch('http://127.0.0.1:5000/respond', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.reply;
}
