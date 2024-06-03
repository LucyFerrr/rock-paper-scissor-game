"use strict";

const labelPlayerScore = document.getElementById("user-score");
const labelComputerScore = document.getElementById("computer-score");
const labelWinner = document.querySelector(".secondary-header");
const labelResult = document.querySelector(".vs-text");
const labelChoice = document.querySelector(".choice-text");
const buttonChoices = document.querySelectorAll(".user-choose");
const buttonPlayAgain = document.querySelector(".play-again-btn");
const aiChoose = document.querySelectorAll(".ai-choose");

let playerScore = 0;
let computerScore = 0;
let gameState = 1;

// Player Move
buttonChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (gameState) {
      resetUIChoice();
      const userChoice = choice.id;
      const computerChoice = computerMove();
      const result = determineWinner(userChoice, computerChoice);
      updateUI(result, userChoice, computerChoice);
      updateSore(result);
      getOverAllWinner();
    }
  });
});

// Computer Move
function computerMove() {
  const choices = ["rock", "paper", "scissor"];
  const randomMove = Math.floor(Math.random() * 3);
  return choices[randomMove];
}

// Determine Winner
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "draw";
  } else if (
    (userChoice === "rock" && computerChoice === "scissor") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissor" && computerChoice === "paper")
  ) {
    return "user";
  } else {
    return "computer";
  }
}

// Update the UI
function updateUI(result, userChoice, compChoice) {
  const computerChoices = document.getElementById(`ai-${compChoice}`);

  if (result === "draw") {
    updateUIText("draw!", `you both chose ${userChoice}.`);
    computerChoices.style.opacity = "100";
  } else if (result === "user") {
    updateUIText("you win!", `${userChoice} beats ${compChoice}.`);
    computerChoices.style.opacity = "100";
  } else {
    updateUIText("you lose!", `${compChoice} beats ${userChoice}.`);
    computerChoices.style.opacity = "100";
  }
}

// updates the Texts
function updateUIText(result, choiceResult) {
  labelResult.textContent = result;
  labelChoice.textContent = choiceResult;
}

// Resets the UI;
function resetUIChoice() {
  aiChoose.forEach((choice) => {
    choice.style.opacity = "50%";
  });
}

// Update the Score
function updateSore(result) {
  if (result === "user") {
    playerScore++;
  } else if (result === "computer") {
    computerScore++;
  }
  updateScoreText(playerScore, computerScore);
}

function updateScoreText(playersScore, computersScore) {
  labelPlayerScore.textContent = playersScore;
  labelComputerScore.textContent = computersScore;
}

// Get overAllWinner
function getOverAllWinner() {
  if (playerScore >= 20) {
    toggleUI();
    gameState = 0;
  } else if (computerScore >= 20) {
    labelWinner.textContent = "COMPUTER WINS";
    toggleUI();
    gameState = 0;
  }
}

// Toggle the hide class
function toggleUI() {
  labelWinner.classList.toggle("hide");
  labelResult.classList.toggle("hide");
  buttonPlayAgain.classList.toggle("btn-toggle");
}

// Resets the Game
buttonPlayAgain.addEventListener("click", () => {
  updateScoreText("0", "0");
  updateUIText("vs", "");
  toggleUI();
  labelWinner.textContent = "PLAYER WINS";
  playerScore = 0;
  computerScore = 0;
  gameState = 1;
});
