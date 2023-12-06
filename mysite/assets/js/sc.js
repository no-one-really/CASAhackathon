
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
    const baseStaticUrl = "{% static '' %}";
    let des ={
      shirt:" Good for casual occasions",
      pants:" Good for official occasions",
      watch:"very nice ones",
      shoe: "elegant",
      leaf: "hiyo"
    };

    let itemCount = 0;
    var listitem = ["shirt","pant","shoe","watch","leaf"]
    for (let i = 0; i < items.length; i++) {
      if(listitem.includes(items[i])){
        const item = items[i];
        const lowerCaseItem = item.toLowerCase();
        // const imageUrl = `${lowerCaseItem}.jpg`; // Assuming the images are in JPG format
        const imageUrl = lowerCaseItem+'.jpg';

        // Check if the image for the item exists in the "images" folder
        const imageExists = /* Logic to check if the image exists */ true; // Implement this logic

        if (imageExists) {
            // Create a Bootstrap card with the image and append it to the cards container
            const card = document.createElement('div');
            card.classList.add('card', 'mb-2');

            card.innerHTML = `

            <div class="card jkl" style="width: 100%;">
  <img src="static/images/${imageUrl}" alt="${lowerCaseItem} Image" class="product-image">
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
        }}
    }

    // Scroll to the bottom of the chat
    chatContainer.scrollTop = chatContainer.scrollHeight;
    sendPostRequest(userMessage);

}

async function sendPostRequest(userMessage) {
    const url = 'https://8ebb-192-102-190-52.ngrok-free.app'; // Replace with your server URL
    console.log('start process',);
    const data = {
description: userMessage.textContent,
data:"mistral",
botprompt:"I am a fashion advisor. I will help you find what you need in our store"
};
const inChatDiv = document.querySelector('.inchat');
// Create a new user message div


// Append the user message to the chat container


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log("step2")
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        var result = await response.json();
        result_len = result['outputData'].slice(0, -6);
        console.log('Server Response:', result);
        const chatContainer = document.querySelector('.chat-container');
        const inChatDiv = document.querySelector('.inchat');
        // Create a new user message div
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'assistant-message');
        userMessage.textContent = result['outputData'];

        // Append the user message to the chat container
        inChatDiv.appendChild(userMessage);


        // Continue with the next steps or actions here
        console.log('Moving to the next step...');

    } catch (error) {
        console.error('Error:', error.message);
        // Handle errors here
    }
}

// Press Enter to send message
document.getElementById('inputMessage').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        sendMessage();

    }
});
