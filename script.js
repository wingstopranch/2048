// Initialize score variables
let currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0;

// Update initial display for scores
document.getElementById('high-score').textContent = `High Score: ${highScore}`;
document.getElementById('current-score').textContent = `Score: ${currentScore}`;

// Function to update the current score
function updateScore(points) {
    currentScore += points;
    document.getElementById('current-score').textContent = `Score: ${currentScore}`;
    
    // Check if the current score is a new high score
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('highScore', highScore);
        document.getElementById('high-score').textContent = `High Score: ${highScore}`;
        
        // Highlight animation for the new high score
        const highScoreElement = document.getElementById('high-score');
        highScoreElement.classList.add('highlight');
        
        // Remove highlight effect after animation
        setTimeout(() => {
            highScoreElement.classList.remove('highlight');
        }, 1000);
    }
}

// Function to reset the high score
function resetHighScore() {
    highScore = 0;
    localStorage.setItem('highScore', highScore);
    document.getElementById('high-score').textContent = `High Score: ${highScore}`;
}

// Example function to add points
// Call this function whenever points need to be added in the actual game
function addPoints(points) {
    updateScore(points);
}

// Initialize the game board with tiles (basic setup for demonstration)
function initializeGame() {
    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.value = Math.random() > 0.8 ? 4 : 2; // Randomly assign value 2 or 4 for demonstration
        tile.textContent = tile.dataset.value;
        gameBoard.appendChild(tile);
    }
}

// Reset current score and game board on game restart
function restartGame() {
    currentScore = 0;
    document.getElementById('current-score').textContent = `Score: ${currentScore}`;
    document.getElementById('game-board').innerHTML = ''; // Clear game board
    initializeGame(); // Reinitialize game board
}

// Start the game
initializeGame();
