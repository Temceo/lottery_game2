const lottoNumbers = document.querySelectorAll(".btn-lotto-number");
const lotteryContainer = document.querySelector(".lottery-container");
const quickPick = document.querySelector(".quick-pick");
const bin = document.querySelector(".bin");
const submitBtn = document.querySelector(".btn-submit");
const playerPicks = {
  autoPick: [],
  manualPick: [],
};

const getRandomNumbers = (number) => {
  const numbers = new Set();
  while (numbers.size < number) {
    numbers.add(Math.floor(Math.random() * 59) + 1);
  }
  return Array.from(numbers);
};

const checkWin = () => {
  // generate lotter number inside here
  console.log("In checkwin...");
  console.log(playerPicks);
};

const handleUserSelection = (e) => {
  e.preventDefault();
  const button = e.target;
  const number = Number(button.textContent);

  if (playerPicks.manualPick.length < 6) {
    if (!e.target.classList.contains("btn-lotto-number")) return;
    submitBtn.style.display = "none";
    button.classList.toggle("green");
    if (button.classList.contains("green")) {
      playerPicks.manualPick.push(number);
    } else {
      const index = playerPicks.manualPick.indexOf(number);
      if (index > -1) {
        playerPicks.manualPick.splice(index, 1);
      }
    }
    console.log(playerPicks.manualPick.length);
    console.log("...........");
    console.log(playerPicks);
  }
  if (playerPicks.manualPick.length === 6) {
    submitBtn.style.display = "inline-block";
    if (button.classList.contains("green")) {
      const index = playerPicks.manualPick.indexOf(number);
      if (index > -1) {
        playerPicks.manualPick.splice(index, 1);
        submitBtn.style.display = "none";
      } else if (!button.classList.contains("green")) return;
    }
  }
};

const handleQuickPick = (e) => {
  e.preventDefault();

  // only respond to clicks on quick pick (not bin)
  if (e.target.className !== "quick-pick") return;
  const requiredNumber = 6;
  lottoNumbers.forEach((button) => {
    button.classList.remove("green");
  });
  const pick = getRandomNumbers(requiredNumber);
  playerPicks.autoPick = pick.sort((a, b) => a - b);
  lottoNumbers.forEach((button) => {
    if (pick.includes(Number(button.textContent))) {
      button.classList.add("green");
    }
  });
  if (playerPicks.autoPick.length === 6) {
    submitBtn.style.display = "inline-block";
  }

  // IDEA - Allow possibility for player to change number by tapping on green buttons to remove background colour
  console.log(playerPicks);
};

quickPick.addEventListener("click", handleQuickPick);
lotteryContainer.addEventListener("click", handleUserSelection);
submitBtn.addEventListener("click", checkWin);
