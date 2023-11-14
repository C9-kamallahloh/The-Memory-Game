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
        # Dark theme.
        # motivational sentences.
        # shift the images to the center of the screen
        # local storage save progress 
        # 

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

const body = document.querySelector("body");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");
//
//
const bodyWelcome = document.querySelector("#body-welcome");
const mainWelcome = document.querySelector("#main-welcome");
const welcomeClass = document.querySelector(".welcome-class");
const music = document.querySelector("#music");
const dark = document.querySelector("#dark");
const logo = document.querySelector("#logo");
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
const motivation = document.querySelector("#motivation");
const game = document.querySelector("#game");
const hintDiv = document.querySelector("#hint-div");
const hintButton = document.querySelector("#hint-button");
const numberOfMistakesDiv = document.querySelector(".number-of-mistakes");
const numberOfMistakes = document.querySelector("#number-of-mistakes");
const wrongAttemptsCounter = document.querySelector("#wrong-attempts-counter");

const start = document.querySelector("#start");
const resetButton = document.querySelector("#reset-button");
//
//
//* /////////////// Welcome page eventListener ////////////////////

let cardsNumber = Number(numberSelect.value);
// console.log(typeof cardsNumber, cardsNumber);
let wrongPairsCounter = 0;
let correctPairsCounter = 0;
let wrongAttempts = Number(difficultySelect.value);
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

resetButton.addEventListener("hover", (event) => {
  resetButton.style.color = "red";

  if (wrongPairsCounter !== 0 || correctPairsCounter !== 0) {
  }
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

  playAgainButton.style.display = "block";
});

//* /////////////// preventClicks ////////////////////
const preventClicks = document.createElement("img");
preventClicks.src = "Media/meraki-logo.jpg";
preventClicks.id = "prevent-clicks";

//* /////////////// Music ////////////////////

let musicVol = document.getElementById("music");
musicVol.volume = 0.1; // to change the initial music volume level

//* /////////////// motivation ////////////////////

let motivationInnerText = "Good Luck";
motivation.innerText = motivationInnerText;
mainIndex.append(motivation);

//* /////////////// THE GAME ////////////////////

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
          wrongPairsCounter = 0;
          numberOfMistakes.innerText = 0;
          bodyWelcome.style.display = "block";
          bodyGame.style.display = "none";
          gameClass.style.display = "none";
          logoPhoto.src = "Media/you-lose.jpg";
          logoText.innerText = `Try Again, you can do better.`;
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
        console.log("correct");
        correctPairsCounter++;
        userClick = undefined;
        firstImage = undefined;
        if (correctPairsCounter === cardsNumber / 2) {
          console.log("WON");
          wrongPairsCounter = 0;
          numberOfMistakes.innerText = 0;
          bodyWelcome.style.display = "block";
          bodyGame.style.display = "none";
          gameClass.style.display = "none";
          logoPhoto.src = "Media/you-win.jpg";
          logoText.innerText = `Congrats!! you are Awesome.`;
          playAgainButton.style.display = "block";
        }
      }
    });
    imageDiv.append(image, overlay);
    game.append(imageDiv);
  }
};
