const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';

// Function to handle cell click
function handleClick(event) {
    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase()); // Add the class "x" or "o"
        if (checkWin(currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            resetBoard();
        } else if (isDraw()) {
            alert("It's a draw!");
            resetBoard();
        } else {
            switchPlayer();
        }
    }
}

// Function to switch the current player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check if the current player has won
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === player;
        });
    });
}

// Function to check if the game is a draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

// Function to reset the board
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
}

// Add event listeners to cells and reset button
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
resetButton.addEventListener('click', resetBoard);
