let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let messageRef = document.querySelector("#message");
let newgameBtn = document.querySelector("#new-game");
let restartBtn = document.querySelector("#restart");
let turnRef = document.querySelector("#turn"); // New: Dynamic turn display

let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;
let count = 0;

// Add sound effects
const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");
const drawSound = new Audio("draw.mp3");

// Function to disable all buttons and show the popup
const disabledButtons = () => {
    btnRef.forEach((element) => {
        element.disabled = true;
    });
    popupRef.classList.remove("hide");
};

// Function to highlight winning buttons
const highlightWinningButtons = (pattern) => {
    pattern.forEach((index) => {
        btnRef[index].classList.add("winner"); // Add a CSS class to highlight buttons
    });
};

// Function to enable all buttons for a new game
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
        element.classList.remove("winner"); // Remove winner highlight for a new game
    });
    popupRef.classList.add("hide");
    messageRef.innerText = "";
    turnRef.innerText = "Turn: X"; // Reset to X's turn
    xTurn = true;
    count = 0;
};

// Function to handle win
const winFunction = (winner, pattern) => {
    highlightWinningButtons(pattern); // Highlight the winning pattern
    disabledButtons();
    messageRef.innerText = `${winner} Wins! 🎉`;
    winSound.play(); // Play win sound
};

// Function to check for win or draw
const winChecker = () => {
    for (let pattern of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[pattern[0]].innerText,
            btnRef[pattern[1]].innerText,
            btnRef[pattern[2]].innerText,
        ];
        if (element1 !== "" && element1 === element2 && element2 === element3) {
            winFunction(element1, pattern); // Pass the winning pattern
            return;
        }
    }

    // If all cells are filled and no winner, it's a draw
    if (count === 9) {
        popupRef.classList.remove("hide");
        messageRef.innerText = "It's a Draw! 🤝";
        drawSound.play(); // Play draw sound
    }
};

// Add click events to each button
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        clickSound.play(); // Play click sound
        if (xTurn) {
            xTurn = false;
            element.innerText = "X";
            turnRef.innerText = "Turn: O"; // Update turn
        } else {
            xTurn = true;
            element.innerText = "O";
            turnRef.innerText = "Turn: X"; // Update turn
        }
        element.disabled = true;
        count++;
        winChecker(); // Check for a win or draw after each turn
    });
});

// New game button functionality
newgameBtn.addEventListener("click", enableButtons);

// Restart game functionality
restartBtn.addEventListener("click", enableButtons);
