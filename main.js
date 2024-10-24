console.log("TIC TAC TOE");

const boxes = document.querySelectorAll(".box");
const message = document.querySelector(".message");
const reset = document.querySelector(".reset");
const line = document.querySelector(".line");
let isOTurn = true;
let moveCount = 0;

console.log(boxes);

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText) {
      return;
    }
    if (isOTurn) {
      box.innerHTML = `<span class="material-symbols-outlined icon">radio_button_unchecked</span>`;
      isOTurn = false;
      message.innerText = "X TURN";
    } else {
      box.innerHTML = `<span class="material-symbols-outlined icon">close</span>`;
      isOTurn = true;
      message.innerText = "O TURN";
    }
    moveCount++;

    if (checkWinner()) {
      checkWinner();

      return;
    }
    if (moveCount === 9) {
      message.innerText = "DRAW";
      disableBoxes();
      return;
    }
  });
});

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
];

const linePattern = {
  "0 1 2": "top-horizontal",
  "3 4 5": "middle-horizontal",
  "6 7 8": "bottom-horizontal",
  "0 3 6": "left-vertical",
  "1 4 7": "middle-vertical",
  "2 5 8": "right-vertical",
  "2 4 6": "diagonal-right",
  "0 4 8": "diagonal-left",
};

const checkWinner = () => {
  for (let patterns of winningPatterns) {
    const [a, b, c] = patterns;
    const pos1 = boxes[a].innerText;
    const pos2 = boxes[b].innerText;
    const pos3 = boxes[c].innerText;

    if (pos1 && pos1 === pos2 && pos1 === pos3) {
      message.innerText =
        pos1 === "radio_button_unchecked" ? "O WINNER" : "X WINNER";
      disableBoxes();
      const lineKey = `${a} ${b} ${c}`;

      for (let key in linePattern) {
        if (lineKey === key) {
          line.classList.add(linePattern[key]);
        }
      }

      return true;
    }
  }
  return false;
};

checkWinner();

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

reset.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML = "";
  });
  isOTurn = true;
  message.innerText = "O TURN";
  line.className = "line";
});
