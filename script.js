const cardImages = [
    'minion1.jpeg', 'minion2.jpeg', 'minion3.jpeg', 
    'minion4.jpeg', 'minion5.jpeg', 'minion6.jpeg'
];

let gameBoard = document.getElementById('gameBoard');
let movesElement = document.getElementById('moves');
let timeElement = document.getElementById('time');
let winMessage = document.getElementById('winMessage');
let resetButton = document.getElementById('resetButton');
let youtubeAudio = document.getElementById('youtubeAudio');
let gameSound = document.getElementById('gameSound'); // Access the audio element
let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer;
let time = 0;
let player;

// Load YouTube IFrame Player API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubeIframe', {
        videoId: 'plW2OIYk3lQ',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'mute': 0
        }
    });
}

function initGame() {
    const shuffledCards = shuffleCards([...cardImages, ...cardImages]);
    shuffledCards.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.addEventListener('click', onCardClick);

        const img = document.createElement('img');
        img.src = image;
        card.appendChild(img);

        gameBoard.appendChild(card);
        cards.push(card);
    });
    startTimer();
    gameSound.play().catch(e => console.log('Audio play error:', e)); // Debug audio play errors
}

function shuffleCards(array) {
    return array.sort(() => 0.5 - Math.random());
}

function onCardClick(event) {
    const card = event.currentTarget;
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            movesElement.textContent = moves;
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timeElement.textContent = time;
    }, 1000);
}

function endGame() {
    clearInterval(timer);

    // Create the winning card
    const winningCard = document.createElement('div');
    winningCard.classList.add('card', 'flipped', 'winning-card');
    
    // Create and add the image to the winning card
    const winImage = document.createElement('img');
    winImage.src = 'téléchargé2.png';
    winningCard.appendChild(winImage);
    
    // Create and add the "You win 🏆" message
    const winMessageText = document.createElement('div');
    winMessageText.classList.add('win-message-text');
    winMessageText.textContent = "🎉You win 🎉 ";
    winningCard.appendChild(winMessageText);

    // Append the winning card to the game board
    gameBoard.innerHTML = ''; 
    gameBoard.appendChild(winningCard);

    // Show the reset button
    resetButton.classList.remove('hidden');
    resetButton.addEventListener('click', resetGame, { once: true });

    // Show the hidden YouTube iframe and play the sound
    youtubeAudio.classList.remove('hidden');
    player.playVideo(); // Play the video (audio only)
    gameSound.pause(); // Stop the sound effect at the end of the game
    gameSound.currentTime = 0; // Reset the sound effect to the beginning
}

function resetGameBoard() {
    gameBoard.innerHTML = ''; // Clear the game board
    moves = 0;
    time = 0;
    matchedCards = [];
    flippedCards = [];
    cards = [];
    movesElement.textContent = moves;
    timeElement.textContent = time;
    winMessage.classList.add('hidden');
    resetButton.classList.add('hidden'); // Hide the reset button

    // Hide the YouTube video
    youtubeAudio.classList.add('hidden');
    player.pauseVideo(); // Pause the video
    gameSound.pause(); // Stop the sound effect when the game is reset
    gameSound.currentTime = 0; // Reset the sound effect to the beginning
}

function resetGame() {
    clearInterval(timer);
    resetGameBoard();
    initGame();
}

initGame();









    



