/* 
Main features:

(DONE)  # Shuffle, and reshuffle after reset.

(concept done slicedImages) # change the cardsNumber to the specific    number cards needed in the game.

(DONE)  # Cards will appear for period of time (Ex.5 seconds) then it will flip to the other side. // (solved) still can play it during that

(DONE)  # User will choose two cards.

(DONE)  # Cards will be checked Correct , Wrong.

        # reset // When finish, user will see a screen with the result on it with a Play Again button.

*/

/* 
Extra features:
        # Choose the time limit and show the timer.
(DONE)  # difficulty Number of cards.
        # wrongAttempts to loss the game //! update wrongAttempts by DOM
(DONE)  # Show the pics for 10s
(Not yet)   or start the game immediately button.
(DONE)  # Play music and stop button.
(DONE)  # Reset button and shuffle again.
        # Hint button and give hint after 3 mistakes.
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
# //! music controls take a big portion of the header.
# //! music not synced between pages (welcome main result)
# //! edit reset button, it stopped working after cardsNumber updated
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
const welcome = document.querySelector(".welcome-text");
const number = document.querySelector("#number");
const numberSelect = document.querySelector("#number-select");
const difficulty = document.querySelector("#difficulty"); //! wrongAttempts in the game
const time = document.querySelector("#time");
const playNowButton = document.querySelector("#play-now-button");
//
//
const bodyGame = document.querySelector("#body-game");
const mainIndex = document.querySelector("#main-index");
const gameClass = document.querySelector(".game-class");
const timer = document.querySelector("#timer");
const motivation = document.querySelector("#motivation");
const game = document.querySelector("#game");
const hint = document.querySelector("#hint");
const start = document.querySelector("#start");
const resetButton = document.querySelector("#reset-button");
//
//
//* /////////////// Welcome page eventListener ////////////////////

let cardsNumber = 12; //! 12 is the selected default value, need to change it here with the HTML select tag.

numberSelect.addEventListener("change", (e) => {
  cardsNumber = e.target.value;
});

//* /////////////// Next Page ////////////////////

bodyWelcome.style.display = "block";
bodyGame.style.display = "none";
welcomeClass.style.display = "inherit";
gameClass.style.display = "none";

const nextPage = (event, cardsNumber) => {
  if (bodyWelcome.style.display === "block") {
    bodyWelcome.style.display = "none";
    bodyGame.style.display = "block";
    welcomeClass.style.display = "none"; //! not working for button and text, override.
    playNowButton.style.display = "none";
    welcomeClass.style.display = "none";
    gameClass.style.display = "block";
  }

  //* /////////////// cardsNumber slicedImages ////////////////////

  let slicedImages = images.slice(0, cardsNumber);

  const shuffle = (array) => {
    let shuffledArray = [];
    for (let i = array.length; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * array.length);
      shuffledArray.push(array[randomIndex]);
      array.splice(randomIndex, 1);
    }
    return shuffledArray;
  };

  let shuffledImages = shuffle(slicedImages);

  theGame(shuffledImages);
};

playNowButton.addEventListener("click", (event) => {
  nextPage(event, cardsNumber);
});

//* /////////////// preventClicks ////////////////////
const preventClicks = document.createElement("img");
preventClicks.src = "Media/meraki-logo.jpg";
preventClicks.id = "prevent-clicks";

//* /////////////// Music ////////////////////

// let musicVol = document.getElementById("music");
// musicVol.volume = 0.25; // to change the initial music volume level

//* /////////////// motivation ////////////////////

let motivationInnerText = "Good Luck";
motivation.innerText = motivationInnerText;
mainIndex.append(motivation);

//* /////////////// THE GAME ////////////////////

const theGame = (shuffledImages) => {
  let userClick;
  let firstImage;
  let correctPairsCounter = 0;
  let wrongAttempts = 5; //! user defined wrongAttempts
  let wrongPairsCounter = 0;

  body.append(preventClicks);
  setTimeout(() => {
    body.removeChild(preventClicks);
  }, 3010); //! prevent clicks at the game start for 3s, need to edit the animation when updating this duration.

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
        console.log("Wrong:", wrongPairsCounter);
        if (wrongPairsCounter === wrongAttempts) {
          console.log("LOSS");
        }
        body.append(preventClicks); //! (solved) prevent clicks until setTimeout executed.
        setTimeout(() => {
          body.removeChild(preventClicks);
          overlay.style.zIndex = 1;
          firstImage.style.zIndex = 1;
          userClick = undefined;
          firstImage = undefined;
        }, 3000);

        // overlay.style.animation = "flip-back-after-wrong-answer 3s";
        // firstImage.style.animation = "flip-back-after-wrong-answer 3s"; //! (another sol. found) only works 1 time.
      } else if (userClick === e.target.id) {
        console.log("correct");
        correctPairsCounter++;
        userClick = undefined;
        firstImage = undefined;
        if (correctPairsCounter === cardsNumber / 2) {
          console.log("WIN");
        }
      }
    });
    imageDiv.append(image, overlay);
    game.append(imageDiv);
  }
};

//* /////////////// resetButton ////////////////////

resetButton.addEventListener("click", (e) => {
  for (let i = 0; i < shuffledImages.length; i++) {
    const imageDiv = document.querySelector(".image-div");
    // const overlay = document.querySelector(".overlay")
    game.removeChild(imageDiv);
  }
  shuffledImages = shuffle(shuffledImages);
  theGame();
});
