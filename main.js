/* 
todo: Main features (DONE):

(DONE)  # Shuffle, and reshuffle after reset.

(DONE) # change the cardsNumber to the specific    number cards needed in the game.

(DONE)  # Cards will appear for period of time (Ex.5 seconds) then it will flip to the other side. // (solved) still can play it during that

(DONE)  # User will choose two cards.

(DONE)  # Cards will be checked Correct , Wrong.

(DONE)  # reset // When finish, user will see a screen with the result on it with a Play Again button.

*/

/* 
Extra features:
        # Choose the time limit and show the timer.
(DONE)  # difficulty Number of cards.
(DONE)  # wrongAttempts to lost the game
(DONE)  # Show the pics for a number of seconds ex.5s
(skipped)   or start the game immediately button.
(DONE)  # Play music and stop button.
(DONE)  # Reset button and shuffle again.
(button added, concept not yet) # Hint button and give hint after 3 mistakes. 
(DONE)  # Dark theme.
        # motivational sentences. fireworks and sounds.
(DONE)  # shift the images to the center of the screen
(DONE)  # local storage save progress 
        # image.div 100/6 100/5 100/4

*/

/* 
Bugs:
# //! (solved) prevent clicks until setTimeout executed.
# //! (solved) still can play it during that
# //! (solved) music controls take a big portion of the header. // moved to the footer.
# //! (solved) music not synced between pages (welcome main result) // update the html pages to single page. (app.html)
# //! (solved) edit reset button, it stopped working after cardsNumber updated
*/

const images = [
  { id: 1, src: "Media/01.jpg" },
  { id: 1, src: "Media/01.jpg" },
  { id: 2, src: "Media/02.jpg" },
  { id: 2, src: "Media/02.jpg" },
  { id: 3, src: "Media/03.jpg" },
  { id: 3, src: "Media/03.jpg" },
  { id: 4, src: "Media/04.jpg" },
  { id: 4, src: "Media/04.jpg" },
  { id: 5, src: "Media/05.jpg" },
  { id: 5, src: "Media/05.jpg" },
  { id: 6, src: "Media/06.jpg" },
  { id: 6, src: "Media/06.jpg" },
  { id: 7, src: "Media/07.jpg" },
  { id: 7, src: "Media/07.jpg" },
  { id: 8, src: "Media/08.jpg" },
  { id: 8, src: "Media/08.jpg" },
  { id: 9, src: "Media/09.jpg" },
  { id: 9, src: "Media/09.jpg" },
  { id: 10, src: "Media/10.jpg" },
  { id: 10, src: "Media/10.jpg" },
  { id: 11, src: "Media/11.jpg" },
  { id: 11, src: "Media/11.jpg" },
  { id: 12, src: "Media/12.jpg" },
  { id: 12, src: "Media/12.jpg" },
];

//
//

const body = document.querySelector("#body");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");
//
//
const bodyWelcome = document.querySelector("#body-welcome");
const mainWelcome = document.querySelector("#main-welcome");
const welcomeClass = document.querySelector(".welcome-class");
const music = document.querySelector("#music");
const dark = document.querySelector("#dark");
const light = document.querySelector("#light");
const logo = document.querySelector("#logo");
const winLose = document.querySelector("#win-lose");
const logoPhoto = document.querySelector("#logo-photo");
const logoText = document.querySelector("#logo-text");
const welcome = document.querySelector(".welcome-text");
const number = document.querySelector("#number");
const numberSelect = document.querySelector("#number-select");
const difficulty = document.querySelector("#difficulty");
const difficultySelect = document.querySelector("#difficulty-select");
const time = document.querySelector("#time");
const timeSelect = document.querySelector("#time-select");
const playNowButton = document.querySelector("#play-now-button");
const playAgainButton = document.querySelector("#play-again-button");
//
//
const bodyGame = document.querySelector("#body-game");
const mainIndex = document.querySelector("#main-index");
const gameClass = document.querySelector(".game-class");
const timer = document.querySelector("#timer");
const timerValue = document.querySelector("#timer-value");
const motivation = document.querySelector("#motivation");
const game = document.querySelector("#game");
const hintDiv = document.querySelector("#hint-div");
const hintButton = document.querySelector("#hint-button");
const numberOfMistakesDiv = document.querySelector(".number-of-mistakes");
const numberOfMistakes = document.querySelector("#number-of-mistakes");
const wrongAttemptsCounter = document.querySelector("#wrong-attempts-counter");

const start = document.querySelector("#start");
const resetButton = document.querySelector("#reset-button");
const resetWarning = document.querySelector("#reset-warning");
//
//

//* /////////////// Local storage ////////////////////

let wins = Number(localStorage.getItem("wins")) || 0;
let loses = Number(localStorage.getItem("loses")) || 0;

//* /////////////// Welcome page eventListener ////////////////////

let cardsNumber = Number(numberSelect.value);
// console.log(typeof cardsNumber, cardsNumber);
let wrongPairsCounter = 0;
let correctPairsCounter = 0;
let wrongAttempts = Number(difficultySelect.value); // the initial value of wrongAttempts.
// console.log('wrongAttempts', typeof wrongAttempts)
if (wrongAttempts >= 0) {
  wrongAttemptsCounter.innerText = ` of ${wrongAttempts}`;
} else {
  wrongAttemptsCounter.innerText = ` of unlimited`;
}
numberOfMistakes.innerText = 0;
numberOfMistakesDiv.append(numberOfMistakes, wrongAttemptsCounter);

//
//

numberSelect.addEventListener("change", (e) => {
  cardsNumber = e.target.value;
});
difficultySelect.addEventListener("change", (e) => {
  //the updated value of wrongAttempts.

  wrongAttempts = Number(e.target.value);
  // wrongAttempts = e.target.value;
  // console.log(typeof wrongAttempts, wrongAttempts);

  if (wrongAttempts >= 0) {
    wrongAttemptsCounter.innerText = ` of ${wrongAttempts}`;
  } else {
    wrongAttemptsCounter.innerText = ` of unlimited`;
  }
});

//
//

bodyWelcome.style.display = "block";
bodyGame.style.display = "none";
gameClass.style.display = "none";
playAgainButton.style.display = "none";
//* /////////////// shuffle function ////////////////////

let shuffledImages = [];
const shuffle = (array) => {
  let shuffledArray = [];
  for (let i = array.length; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * array.length);
    shuffledArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return shuffledArray;
};
//* /////////////// When you press (Play Now)  ////////////////////

const playTheGame = (event, cardsNumber, wrongAttempts) => {
  if (bodyWelcome.style.display === "block") {
    bodyWelcome.style.display = "none";
    bodyGame.style.display = "block";
    gameClass.style.display = "block";
    playNowButton.style.display = "none";
    playAgainButton.style.display = "none";
    motivation.innerText = "Good Luck";
  }

  //* ///////////// cardsNumber slicedImages shuffle //////////////////

  let slicedImages = images.slice(0, cardsNumber);

  shuffledImages = shuffle(slicedImages);

  theGame(shuffledImages, wrongAttempts);
};

playNowButton.addEventListener("click", (event) => {
  playTheGame(event, cardsNumber, wrongAttempts);
});

playAgainButton.addEventListener("click", (event) => {
  for (let i = 0; i < shuffledImages.length; i++) {
    const imageDiv = document.querySelector(".image-div");
    game.removeChild(imageDiv);
  }
  shuffledImages = shuffle(shuffledImages);
  playTheGame(event, cardsNumber, wrongAttempts);
});

//* /////////////// resetButton ////////////////////

let buttonOriginalColor = resetButton.style.color;
let buttonOriginalBackgroundColor = resetButton.style.backgroundColor;
let buttonOriginalBorder = resetButton.style.border;

resetButton.addEventListener("mouseover", (event) => {
  if (wrongPairsCounter !== 0 || correctPairsCounter !== 0) {
    // let buttonOriginalColor = resetButton.style.color;
    resetButton.style.color = "white";
    resetButton.style.backgroundColor = "rgb(240, 80, 80)";
    resetButton.style.border = "2px solid rgb(240, 80, 80)";
    /*   setTimeout(() => {
    resetButton.style.color = buttonOriginalColor;

  }, 5000); */
    resetWarning.innerText =
      "since you already start playing, if you reset, you will lose the game.";
    resetWarning.style.color = "rgb(240, 80, 80)";
  }
});
resetButton.addEventListener("mouseout", (event) => {
  resetButton.style.color = buttonOriginalColor;
  resetButton.style.backgroundColor = buttonOriginalBackgroundColor;
  resetButton.style.border = buttonOriginalBorder;
  resetWarning.innerText = "";
});

resetButton.addEventListener("click", (event) => {
  logoPhoto.src = "Media/meraki-logo.jpg";
  logoText.innerText = "";
  if (wrongPairsCounter !== 0 || correctPairsCounter !== 0) {
    logoPhoto.src = "Media/you-lose.jpg";

    logoText.innerText =
      "You lost because you reset the game after you start playing it";
  }
  wrongPairsCounter = 0;
  numberOfMistakes.innerText = 0;
  correctPairsCounter = 0;
  bodyWelcome.style.display = "block";
  bodyGame.style.display = "none";
  gameClass.style.display = "none";
  motivation.innerText = "Good Luck";
  playAgainButton.style.display = "block";
});

//* /////////////// preventClicks ////////////////////
const preventClicks = document.createElement("img");
preventClicks.src = "Media/meraki-logo.jpg";
preventClicks.id = "prevent-clicks";

//* /////////////// Music ////////////////////

let musicVol = document.getElementById("music");
musicVol.volume = 0.1; // to change the initial music volume level

//* /////////////// Light & Dark theme ////////////////////

light.style.display = "none";
const lightFunction = () => {
  body.style.backgroundColor = "rgb(250, 250, 250)";
  body.style.color = "rgb(65, 65, 65)";
  light.style.display = "none";
  dark.style.display = "block";
};
const darkFunction = () => {
  body.style.backgroundColor = "rgb(65, 65, 65)";
  body.style.color = "rgb(250, 250, 250)";
  light.style.display = "block";
  dark.style.display = "none";
};

light.addEventListener("click", lightFunction);
dark.addEventListener("click", darkFunction);

//* /////////////// Timer ////////////////////
// const time = document.querySelector("#time");
// const timeSelect = document.querySelector("#time-select");
// const timer = document.querySelector("#timer");
// const timerValue = document.querySelector("#timer-value");
const mustFinishWithin = () => {};
setTimeout(mustFinishWithin, Number(timeSelect.value) + 5000); //5000 the first 5s of the game to see the cards before flip.
// console.log((Number(timeSelect.value)+5000));

//* /////////////// motivation ////////////////////

// motivation.innerText = "Good Luck";
mainIndex.append(motivation);

/* const motivational = [
  {id: 0, quote: ""},
  {id: 1, quote: ""},
  {id: 2, quote: ""},
  {id: 3, quote: ""},
  {id: 4, quote: ""},
  {id: 5, quote: ""},
  {id: 6, quote: ""},
  {id: 7, quote: ""},
  {id: 8, quote: ""},
  {id: 9, quote: ""},
  {id: 10, quote: ""},
  {id: 11, quote: ""},
  {id: 12, quote: ""},
  {id: 13, quote: ""},
  {id: 14, quote: ""},
  {id: 15, quote: ""},
  {id: 16, quote: ""}
] */

const motivationalCorrect = [
  { id: 0, quote: "Good job." },
  { id: 1, quote: "Well played." },
  { id: 2, quote: "Nice one." },
  { id: 3, quote: "Continue! ;)" },
  { id: 4, quote: "Wow!" },
  { id: 5, quote: "Outstanding." },
  { id: 6, quote: "You're so good." },
  { id: 7, quote: "Incredible" },
  { id: 8, quote: "Fantastic!" },
  { id: 9, quote: "Now this is good work." },
  { id: 10, quote: "You're doing this right." },
  // { id: 11, quote: "" },
  // { id: 12, quote: "" },
  // { id: 13, quote: "" },
  // { id: 14, quote: "" },
  // { id: 15, quote: "" },
  // { id: 16, quote: "" },
];
const motivationalCorrectRandom = () => {
  const randomIndex = Math.floor(Math.random() * motivationalCorrect.length);

  if (Math.floor(Math.random() * 2)) {
    motivation.innerText = motivationalCorrect[randomIndex].quote;
  } else {
    motivation.innerText = "";
  }
};

const motivationalWrong = [
  { id: 0, quote: "Do it again." },
  { id: 1, quote: "You can do it." },
  { id: 2, quote: "I Know you are better than this" },
  { id: 3, quote: "Focus!" },
  { id: 4, quote: "Need a hint?" },
  { id: 5, quote: "Try another one." },
  { id: 6, quote: "Remember these cards for later use." },
  { id: 7, quote: "This is not the end of the game." },
  // { id: 8, quote: "" },
  // { id: 9, quote: "" },
  // { id: 10, quote: "" },
  // { id: 11, quote: "" },
  // { id: 12, quote: "" },
  // { id: 13, quote: "" },
  // { id: 14, quote: "" },
  // { id: 15, quote: "" },
  // { id: 16, quote: "" },
];
const motivationalWrongRandom = () => {
  const randomIndex = Math.floor(Math.random() * motivationalWrong.length);

  if (Math.floor(Math.random() * 2)) {
    motivation.innerText = motivationalWrong[randomIndex].quote;
  } else {
    motivation.innerText = "";
  }
};

const motivationalCongrats = [
  {
    id: 0,
    quote: "It is a rough road that leads to the heights of greatness.",
  },
  { id: 1, quote: "If you can dream it, you can do it." },
  {
    id: 2,
    quote:
      "Congratulations on your well-deserved success! You're an inspiration!",
  },
  { id: 3, quote: "You were born to win." },
  { id: 4, quote: "Great deeds are usually wrought at great risks." },
  {
    id: 5,
    quote: `Success… seems to be connected with action. Successful people keep moving. They make mistakes, but they don’t quit.`,
  },
  { id: 6, quote: "Congratulations! We're so very proud of you!" },
  {
    id: 7,
    quote: "Your hard work and perseverance have paid off. Congratulations!",
  },
  {
    id: 8,
    quote: "Hard work. Dedication. Perseverance. You did it! Congratulations!",
  },
  { id: 9, quote: "You did it, grad! I knew you could!" },
  { id: 10, quote: "Warmest congratulations on your achievement!" },
  // { id: 11, quote: "" },
  // { id: 12, quote: "" },
  // { id: 13, quote: "" },
  // { id: 14, quote: "" },
  // { id: 15, quote: "" },
  // { id: 16, quote: "" },
];
const motivationalCongratsRandom = () => {
  const randomIndex = Math.floor(Math.random() * motivationalCongrats.length);
  return motivationalCongrats[randomIndex].quote;
};

const motivationalTryAgain = [
  { id: 0, quote: "Never give up! All you have to do is try again." },
  {
    id: 1,
    quote:
      "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
  },
  { id: 2, quote: "Defeat happens only to those who refuse to try again." },
  { id: 3, quote: "If at first you don't succeed, try, try, try again." },
  { id: 4, quote: "Our greatest weakness lies in giving up." },
  {
    id: 5,
    quote:
      "I've failed over and over and over again in my life and that is why I succeed.",
  },
  {
    id: 6,
    quote: "When you lose, you get up, you make it better, you TRY AGAIN.",
  },
  { id: 7, quote: "When you fall, leap to your feet and try again." },
  {
    id: 8,
    quote:
      "The successful person will profit from his mistakes and try again in a different way.",
  },
  {
    id: 9,
    quote:
      "Mistakes in life teach you how to succeed because you want to try again and do it better.",
  },
  // {id: 10, quote: ""},
  // {id: 11, quote: ""},
  // {id: 12, quote: ""},
  // {id: 13, quote: ""},
  // {id: 14, quote: ""},
  // {id: 15, quote: ""},
  // {id: 16, quote: ""}
];
const motivationalTryAgainRandom = () => {
  const randomIndex = Math.floor(Math.random() * motivationalTryAgain.length);
  return motivationalTryAgain[randomIndex].quote;
};

//* ///////////////////////////////////////////////////////
//* ///////////////////////////////////////////////////////
//* ///////////////////// THE GAME ////////////////////////
//* ///////////////////////////////////////////////////////
//* ///////////////////////////////////////////////////////

const theGame = (shuffledImages, wrongAttemptsInGame) => {
  let userClick;
  let firstImage;
  // console.log("wrongAttemptsInGame ", wrongAttemptsInGame);
  body.append(preventClicks);
  setTimeout(() => {
    body.removeChild(preventClicks);
  }, 510); //! prevent clicks at the game start for number of seconds, you need to edit the animation duration when updating this.

  for (let i = 0; i < shuffledImages.length; i++) {
    const imageDiv = document.createElement("div");
    imageDiv.className = "image-div";

    const overlay = document.createElement("img");
    overlay.id = shuffledImages[i].id;
    overlay.className = "overlay";
    overlay.src = "Media/meraki-logo.jpg";
    overlay.style.zIndex = 1;

    const image = document.createElement("img");
    image.src = shuffledImages[i].src;

    overlay.addEventListener("click", (e) => {
      overlay.style.zIndex = -1;
      if (userClick === undefined) {
        firstImage = e.target; // overlay 1 tag
        userClick = e.target.id; // overlay 1 ID
      } else if (userClick !== e.target.id) {
        wrongPairsCounter++;
        numberOfMistakes.innerText = wrongPairsCounter;
        console.log("Wrong:", wrongPairsCounter);
        motivationalWrongRandom();
        if (wrongPairsCounter % 3 === 0) {
          hintButton.style.display = "flex";
        } else {
          hintButton.style.display = "none";
        }
        // console.log(wrongPairsCounter == wrongAttemptsInGame);
        // console.log(typeof wrongAttemptsInGame);
        // console.log(typeof wrongPairsCounter);
        if (wrongPairsCounter === wrongAttemptsInGame) {
          console.log("LOST");
          loses++;
          localStorage.setItem("loses", loses);
          winLose.innerText = `[ Wins = ${wins} , Loses = ${loses} ]`;
          wrongPairsCounter = 0;
          numberOfMistakes.innerText = 0;
          correctPairsCounter = 0;
          bodyWelcome.style.display = "block";
          bodyGame.style.display = "none";
          gameClass.style.display = "none";
          logoPhoto.src = "Media/you-lose.jpg";
          logoText.innerText = motivationalTryAgainRandom();
          playAgainButton.style.display = "block";
        }
        body.append(preventClicks);
        setTimeout(() => {
          body.removeChild(preventClicks);
          overlay.style.zIndex = 1;
          firstImage.style.zIndex = 1;
          userClick = undefined;
          firstImage = undefined;
        }, 500);
      } else if (userClick === e.target.id) {
        correctPairsCounter++;
        console.log("Correct:", correctPairsCounter);
        motivationalCorrectRandom();
        userClick = undefined;
        firstImage = undefined;
        if (correctPairsCounter === cardsNumber / 2) {
          console.log("WON");
          wins++;
          localStorage.setItem("wins", wins);
          winLose.innerText = `[ Wins = ${wins} , Loses = ${loses} ]`;
          wrongPairsCounter = 0;
          numberOfMistakes.innerText = 0;
          correctPairsCounter = 0;
          bodyWelcome.style.display = "block";
          bodyGame.style.display = "none";
          gameClass.style.display = "none";
          logoPhoto.src = "Media/you-win.jpg";
          logoText.innerText = motivationalCongratsRandom();
          playAgainButton.style.display = "block";
        }
      }
    });
    imageDiv.append(image, overlay);
    game.append(imageDiv);
  }
};
