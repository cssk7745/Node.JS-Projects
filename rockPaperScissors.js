// Rock, Paper, Scissors Game in Node.js

// Available choices
const choices = ['rock', 'paper', 'scissors'];

// Function to get computer's random choice
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'It\'s a tie!';
  }
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    return 'You win!';
  }
  return 'Computer wins!';
}

// Main function to play the game
function playGame() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Prompt user for input
  readline.question('Enter rock, paper, or scissors: ', (input) => {
    const playerChoice = input.toLowerCase();
    if (!choices.includes(playerChoice)) {
      console.log('Invalid choice! Please choose rock, paper, or scissors.');
      readline.close();
      playGame(); // Restart if input is invalid
      return;
    }

    const computerChoice = getComputerChoice();
    console.log(`\nYou chose: ${playerChoice}`);
    console.log(`Computer chose: ${computerChoice}`);
    console.log(determineWinner(playerChoice, computerChoice));

    // Ask if user wants to play again
    readline.question('\nDo you want to play again? (yes/no): ', (response) => {
      readline.close();
      if (response.toLowerCase() === 'yes') {
        playGame(); // Replay the game
      } else {
        console.log('Thanks for playing! Goodbye!');
      }
    });
  });
}

// Start the game
playGame();
