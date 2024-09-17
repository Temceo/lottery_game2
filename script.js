const lottoNumbers = document.querySelectorAll(".btn-lotto-number");
const lottoButtons = document.querySelector(".lotto-buttons");
const userPick = document.querySelector(".picks");
const quickPick = document.querySelector(".quick-pick");
// const bin = document.querySelector(".bin");
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
  const { autoPick, manualPick } = playerPicks;
  const lotteryArray = getRandomNumbers(7);
  const bonusNumber = lotteryArray.pop();
  console.log(lotteryArray, bonusNumber);
  console.log("In checkwin...");
  if (autoPick[0].length === 6) {
    console.log(autoPick);
  }
};

const handleUserSelection = (e) => {
  e.preventDefault();
  const button = e.target;
  const number = Number(button.textContent);

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

  if (playerPicks.manualPick.length === 6) {
    submitBtn.style.display = "inline-block";
    checkWin();
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
  checkWin();

  // IDEA - Allow possibility for player to change number by tapping on green buttons to remove background colour
};

const handleUserPick = (e) => {
  e.preventDefault();
  console.log(e);
  if (e.target.dataset.choice === "auto") {
    lottoButtons.style.display = "none";
    // const requiredNumber = 6;
    // lottoNumbers.forEach((button) => {
    //   button.classList.remove("green");
    // });
    // const pick = getRandomNumbers(requiredNumber);
    // playerPicks.autoPick = pick.sort((a, b) => a - b);
    // lottoNumbers.forEach((button) => {
    //   if (pick.includes(Number(button.textContent))) {
    //     button.classList.add("green");
    //   }
    // });
    const autoNumbers = getRandomNumbers(6);
    playerPicks.autoPick.push([...autoNumbers]);
    checkWin();
  } else {
    lottoButtons.style.display = "flex";
    console.log("manual");
  }
};

// quickPick.addEventListener("click", handleQuickPick);
lottoButtons.addEventListener("click", handleUserSelection);
submitBtn.addEventListener("click", checkWin);
userPick.addEventListener("change", handleUserPick);
