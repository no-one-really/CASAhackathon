function sendMessage() {
    const inputMessage = document.getElementById('inputMessage').value.trim();

    if (inputMessage === '') {
        return; // Don't send empty messages
    }

    const chatContainer = document.querySelector('.chat-container');

    // Create a new user message div
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = inputMessage;

    // Append the user message to the chat container
    chatContainer.appendChild(userMessage);

    // Clear input after sending
    document.getElementById('inputMessage').value = '';

    // Count the number of words in the input message
    const wordCount = inputMessage.split(/\s+/).length;

    // Calculate the number of cards needed based on word count (maximum 4)
    const cardCount = Math.min(wordCount, 4);

    // Create Bootstrap cards with placeholder images and append them to the right panel
    const rightPanel = document.querySelector('.right-panel');
    rightPanel.innerHTML = ''; // Clear previous cards

    for (let i = 0; i < cardCount; i++) {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-2');

        // Example: Add placeholder image URLs based on the card number
        const imageUrl = `https://placekitten.com/200/300?image=${i + 1}`;

        card.innerHTML = `
            <img src="${imageUrl}" class="card-img-top" alt="Card Image">
            <div class="card-body">
                <h5 class="card-title">Card ${i + 1}</h5>
                <p class="card-text">${inputMessage}</p>
            </div>
        `;
        rightPanel.appendChild(card);
    }

    // Scroll to the bottom of the chat
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Press Enter to send message
document.getElementById('inputMessage').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
