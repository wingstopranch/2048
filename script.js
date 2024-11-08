// Initialize score variables
let currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0;
const gridSize = 4;

// Update initial display for scores
document.getElementById('high-score').textContent = `High Score: ${highScore}`;
document.getElementById('current-score').textContent = `Score: ${currentScore}`;

// Game grid as a 2D array
let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));

// Function to update the current score
function updateScore(points) {
    currentScore += points;
    document.getElementById('current-score').textContent = `Score: ${currentScore}`;
    
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('highScore', highScore);
        document.getElementById('high-score').textContent = `High Score: ${highScore}`;
        const highScoreElement = document.getElementById('high-score');
        highScoreElement.classList.add('highlight');
        setTimeout(() => highScoreElement.classList.remove('highlight'), 1000);
    }
}

// Function to reset the high score
function resetHighScore() {
    highScore = 0;
    localStorage.setItem('highScore', highScore);
    document.getElementById('high-score').textContent = `High Score: ${highScore}`;
}

// Add a new tile to an empty cell
function addNewTile() {
    let emptyCells = [];
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (!grid[row][col]) emptyCells.push({ row, col });
        }
    }
    
    if (emptyCells.length > 0) {
        let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = Math.random() > 0.9 ? 4 : 2; // 10% chance of 4, otherwise 2
        renderBoard();
    }
}

// Render the game board
function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear current tiles
    
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const tileValue = grid[row][col];
            const tile = document.createElement('div');
            tile.className = 'tile';
            if (tileValue) {
                tile.dataset.value = tileValue;
                tile.textContent = tileValue;
            }
            gameBoard.appendChild(tile);
        }
    }
}

// Move and merge tiles based on direction
function slide(direction) {
    let moved = false;
    
    if (direction === 'up' || direction === 'down') {
        for (let col = 0; col < gridSize; col++) {
            let line = [];
            for (let row = 0; row < gridSize; row++) {
                line.push(grid[row][col]);
            }
            let mergedLine = merge(line, direction === 'down');
            for (let row = 0; row < gridSize; row++) {
                if (grid[row][col] !== mergedLine[row]) moved = true;
                grid[row][col] = mergedLine[row];
            }
        }
    } else if (direction === 'left' || direction === 'right') {
        for (let row = 0; row < gridSize; row++) {
            let mergedLine = merge(grid[row], direction === 'right');
            for (let col = 0; col < gridSize; col++) {
                if (grid[row][col] !== mergedLine[col]) moved = true;
                grid[row][col] = mergedLine[col];
            }
        }
    }
    
    if (moved) addNewTile();
}

// Merge tiles in a line, based on direction
function merge(line, reverse) {
    if (reverse) line.reverse();
    let newLine = line.filter(value => value !== null);
    
    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i + 1]) {
            newLine[i] *= 2;
            updateScore(newLine[i]);
            newLine.splice(i + 1, 1);
            newLine.push(null);
        }
    }
    while (newLine.length < gridSize) newLine.push(null);
    if (reverse) newLine.reverse();
    return newLine;
}

// Handle arrow key input for tile movement
function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            slide('up');
            break;
        case 'ArrowDown':
            slide('down');
            break;
        case 'ArrowLeft':
            slide('left');
            break;
        case 'ArrowRight':
            slide('right');
            break;
    }
    renderBoard();
}

// Initialize the game
function initializeGame() {
    currentScore = 0;
    document.getElementById('current-score').textContent = `Score: ${currentScore}`;
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
    addNewTile();
    addNewTile();
    renderBoard();
}

// Event listener for arrow keys
document.addEventListener('keydown', handleKeyPress);

// Start the game
initializeGame();
