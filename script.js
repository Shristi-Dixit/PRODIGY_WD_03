

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const playerModeButton = document.getElementById("playerMode");
const aiModeButton = document.getElementById("aiMode");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let aiMode = false;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Handle Cell Click
function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();

    if (aiMode && gameActive && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

// AI Move (Random)
function aiMove() {
    let emptyCells = board.map((val, i) => val === "" ? i : null).filter(v => v !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    checkWinner();
}

// Check for Winner or Draw
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset Game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => (cell.textContent = ""));
}

// Set Game Mode
playerModeButton.addEventListener("click", () => {
    aiMode = false;
    resetGame();
});

aiModeButton.addEventListener("click", () => {
    aiMode = true;
    resetGame();
});

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

