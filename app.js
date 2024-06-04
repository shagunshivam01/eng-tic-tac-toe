let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerTurn = document.querySelector(".player-turn");
let turn = document.querySelector("#turn");
let newGameBtn = document.querySelector("#new-btn");
let gameBox = document.querySelectorAll(".g-box");

let turnX = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }
        disableBoxes();
        console.log(`Button was clicked.`);
        checkWinnerBox(box.name);
        nextMove(box.value);
    });
});

const checkWinnerBox = (boxName) => {
    let thisBox = document.getElementsByName(`${boxName}`);

    for(let pattern of winPatterns) {
        let pos1val = thisBox[pattern[0]].innerText;
        let pos2val = thisBox[pattern[1]].innerText;
        let pos3val = thisBox[pattern[2]].innerText;
        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val){
                console.log(`Winner is ${pos1val} for box ${boxName}`);
                gameBox[parseInt(boxName)-1].innerText = pos1val;
                checkWinnerGame();
            }
        }
    }
};

const checkWinnerGame = () => {
    for(let pattern of winPatterns) { 
        let pos1val = gameBox[pattern[0]].innerText;
        let pos2val = gameBox[pattern[1]].innerText;
        let pos3val = gameBox[pattern[2]].innerText;
        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val){
                console.log(`Congratulations, Winner is ${pos1val}`);
                showWinner(pos1val);
            }
        }
    }
};

const showWinner = (winner) => {
    playerTurn.classList.add("hide");
    resetBtn.classList.add("hide");
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

const nextMove = (boxName) => {
    if(gameBox[parseInt(boxName)-1].innerText === "") {
        console.log(`Next move to be played in box ${boxName}`);
        turn.innerText = `Player ${(turnX)? "X" : "O"}'s turn in box ${boxName}`;
        for(let box of boxes) {
            if(box.name === boxName && box.innerText === "") {
                box.disabled = false;
            }
        }
    } else {
        turn.innerText = `Player ${(turnX)? "X" : "O"}'s turn`;
        for(i = 1; i <= 9; i++) {
            if(gameBox[i-1].innerText === "") {
                thisBox = document.getElementsByName(`${i}`);
                for(let box of thisBox) {
                    if(box.innerText === "") {
                        box.disabled = false;
                    }
                }
            }
        }
    } 
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    for(let gBox of gameBox) {
        gBox.innerText = "";
    }
    msgContainer.classList.add("hide");
    playerTurn.classList.remove("hide");
    resetBtn.classList.remove("hide");
};

const resetGame = () => {
    turnX = true;
    enableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);