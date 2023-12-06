function sendMessage() {
    const inputMessage = document.getElementById('inputMessage').value.trim();

    if (inputMessage === '') {
        return; // Don't send empty messages
    }

    const inChatDiv = document.querySelector('.inchat');
    // Create a new user message div
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = inputMessage;

    // Append the user message to the inchat div
    inChatDiv.appendChild(userMessage);

    // Clear input after sending
    document.getElementById('inputMessage').value = '';

    // Make a POST request to the server
    fetch('your_api_endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('Server response:', data);

            // You can use the response data as needed, for example, displaying it in the chat
            const serverResponseMessage = document.createElement('div');
            serverResponseMessage.classList.add('message', 'assistant-message');
            serverResponseMessage.textContent = data.response; // Adjust this based on your server response structure

            inChatDiv.appendChild(serverResponseMessage);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}

// Press Enter to send message
document.getElementById('inputMessage').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputMessage = document.getElementById('inputMessage').value.trim();

    if (inputMessage === '') {
        return; // Don't send empty messages
    }

    const chatContainer = document.querySelector('.chat-container');
    const inChatDiv = document.querySelector('.inchat');
    // Create a new user message div
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = inputMessage;

    // Append the user message to the chat container
    inChatDiv.appendChild(userMessage);

    // Clear input after sending
    document.getElementById('inputMessage').value = '';

    // Split the input into individual items (assuming items are separated by space)
    const items = inputMessage.split(' ');

    // Create a Bootstrap card for each item and append it to the cards container
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = ''; // Clear previous cards

    let des ={
      shirt:" Good for casual occasions",
      pants:" Good for official occasions",
      watch:"very nice ones",
      shoe: "elegant"
    };

    let itemCount = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const lowerCaseItem = item.toLowerCase();
        const imageUrl = `images/${lowerCaseItem}.jpg`; // Assuming the images are in JPG format

        // Check if the image for the item exists in the "images" folder
        const imageExists = /* Logic to check if the image exists */ true; // Implement this logic

        if (imageExists) {
            // Create a Bootstrap card with the image and append it to the cards container
            const card = document.createElement('div');
            card.classList.add('card', 'mb-2');

            card.innerHTML = `

            <div class="card jkl" style="width: 100%;">
  <img src="${imageUrl}" class="card-img-top" alt="${lowerCaseItem} Image">
  <div class="card-body">
    <h5 class="card-title">${lowerCaseItem}</h5>
    <p class="card-text">${des[lowerCaseItem]}</p>
    <a href="#" class="btn btn-primary">Add to cart</a>
  </div>
</div>

            `;

            // Append the card to the cards container
            cardsContainer.appendChild(card);

            // Increment the item count and check if it exceeds the limit of 4
            itemCount++;
            if (itemCount >= 4) {
                break;
            }
        }
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
