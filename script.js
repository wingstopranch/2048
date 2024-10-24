document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    let tiles = Array(16).fill(null);
    
    function initializeGame() {
        addNewTile();
        addNewTile();
        renderBoard();
    }

    function renderBoard() {
        gameBoard.innerHTML = '';
        tiles.forEach((value, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (value) {
                tile.textContent = value;
                tile.dataset.value = value;
            }
            gameBoard.appendChild(tile);
        });
    }

    function addNewTile() {
        const emptyTiles = tiles.map((value, index) => value === null ? index : null).filter(index => index !== null);
        if (emptyTiles.length === 0) return;
        const randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        tiles[randomIndex] = Math.random() < 0.9 ? 2 : 4;
    }

    function slideTiles(row) {
        const newRow = row.filter(value => value !== null);
        while (newRow.length < 4) {
            newRow.push(null);
        }
        return newRow;
    }

    function combineTiles(row) {
        for (let i = 0; i < 3; i++) {
            if (row[i] && row[i] === row[i + 1]) {
                row[i] *= 2;
                row[i + 1] = null;
            }
        }
        return row;
    }

    function moveTiles(direction) {
        let needToAddTile = false;

        function getRow(index) {
            switch (direction) {
                case 'left':
                case 'right':
                    return Math.floor(index / 4);
                case 'up':
                case 'down':
                    return index % 4;
            }
        }

        for (let i = 0; i < 4; i++) {
            let row;
            if (direction === 'left' || direction === 'right') {
                row = tiles.slice(i * 4, i * 4 + 4);
                if (direction === 'right') row.reverse();
            } else {
                row = [tiles[i], tiles[i + 4], tiles[i + 8], tiles[i + 12]];
                if (direction === 'down') row.reverse();
            }

            const originalRow = [...row];
            row = slideTiles(row);
            row = combineTiles(row);
            row = slideTiles(row);
            if (direction === 'right' || direction === 'down') row.reverse();

            if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
                needToAddTile = true;
            }

            if (direction === 'left' || direction === 'right') {
                for (let j = 0; j < 4; j++) {
                    tiles[i * 4 + j] = row[j];
                }
            } else {
                for (let j = 0; j < 4; j++) {
                    tiles[i + j * 4] = row[j];
                }
            }
        }

        if (needToAddTile) {
            addNewTile();
            renderBoard();
            checkGameOver();
        }
    }

    function checkGameOver() {
        if (tiles.includes(null)) return;

        for (let i = 0; i < tiles.length; i++) {
            const value = tiles[i];
            if (
                (i % 4 < 3 && value === tiles[i + 1]) || 
                (i < 12 && value === tiles[i + 4])
            ) {
                return;
            }
        }

        alert('Game Over!');
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                moveTiles('left');
                break;
            case 'ArrowRight':
                moveTiles('right');
                break;
            case 'ArrowUp':
                moveTiles('up');
                break;
            case 'ArrowDown':
                moveTiles('down');
                break;
        }
    });

    initializeGame();
});
