/* 
Main features:

(DONE)  # Shuffle, and reshuffle after reset.

(concept done slicedImages) # change the pairsNumber to the specific    number pairs needed in the game.

(DONE)  # Cards will appear for period of time (Ex.5 seconds) then it will flip to the other side. // (solved) still can play it during that

(DONE)  # User will choose two cards.

(DONE)  # Cards will be checked Correct , Wrong.

        # reset // When finish, user will see a screen with the result on it with a Play Again button.

*/

/* 
Extra features:
        # Choose the time limit and show the timer.
        # difficulty Number of Pairs ... //! update pairsNumber by DOM
        # wrongAttempts to loss the game //! update wrongAttempts by DOM
(DONE)  # Show the pics for 10s
(Not yet)   or start the game immediately button.
        # Play music and stop button.
(DONE)  # Reset button and shuffle again.
        # Hint button and give hint after 3 mistakes.
        # Dark theme.

        # shift the images to the center of the screen
        # local storage save progress 
        # 

*/

/* 
Bugs:
# //! (solved) prevent clicks until setTimeout executed.
# //! (solved) still can play it during that

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

let pairsNumber = 12; //! update pairsNumber by DOM

const slicedImages = images.slice(0, pairsNumber * 2);

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

const body = document.querySelector("body");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");

const mainWelcome = document.querySelector("#main-welcome");
const music = document.querySelector("#music");
let musicVol = document.getElementById("music");
musicVol.volume = 0.25;

const dark = document.querySelector("#dark");
const logo = document.querySelector("#logo");
const welcome = document.querySelector("#welcome");
const number = document.querySelector("#number");
const difficulty = document.querySelector("#difficulty");
const time = document.querySelector("#time");
const playNowButton = document.querySelector("#play-now-button");

const mainIndex = document.querySelector("#main-index");
const timer = document.querySelector("#timer");
const motivation = document.querySelector("#motivation");
const game = document.querySelector("#game");
const hint = document.querySelector("#hint");
const start = document.querySelector("#start");
const resetButton = document.querySelector("#reset-button");

const preventClicks = document.createElement("img");
preventClicks.src = "Media/meraki-logo.jpg";
preventClicks.id = "prevent-clicks";
const theGame = () => {
  let userClick;
  let firstImage;
  let correctPairsCounter = 0;
  let wrongAttempts = 5; //! user defined 
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
        if (correctPairsCounter === pairsNumber) {
          console.log("WIN");
        }
      }
    });
    imageDiv.append(image, overlay);
    game.append(imageDiv);
  }
};

theGame();

resetButton.addEventListener("click", (e) => {
  for (let i = 0; i < shuffledImages.length; i++) {
    const imageDiv = document.querySelector(".image-div");
    // const overlay = document.querySelector(".overlay")
    game.removeChild(imageDiv);
  }
  shuffledImages = shuffle(shuffledImages);
  theGame();
});
