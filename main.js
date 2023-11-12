/* 
Extra features:
# Choose the time limit and show the timer.
# Choose difficulty 2x2 3x3 4x4 ...
# Show the pics for 10s or start the game immediately button.
# Play music and stop button.
# Reset button and shuffle again.
# Hint button and give hint after 3 mistakes.
# Dark theme.
*/

const images = [
    { id: 1, src: "Media/01.jpg"},
    { id: 1, src: "Media/01.jpg"},
    { id: 2, src: "Media/02.jpg"},
    { id: 2, src: "Media/02.jpg"},
    { id: 3, src: "Media/03.jpg"},
    { id: 3, src: "Media/03.jpg"},
    { id: 4, src: "Media/04.jpg"},
    { id: 4, src: "Media/04.jpg"},
    { id: 5, src: "Media/05.jpg"},
    { id: 5, src: "Media/05.jpg"},
    { id: 6, src: "Media/06.jpg"},
    { id: 6, src: "Media/06.jpg"},
    { id: 7, src: "Media/07.jpg"},
    { id: 7, src: "Media/07.jpg"},
    { id: 8, src: "Media/08.jpg"},
    { id: 8, src: "Media/08.jpg"},
    { id: 9, src: "Media/09.jpg"},
    { id: 9, src: "Media/09.jpg"},
    { id: 10, src: "Media/10.jpg"},
    { id: 10, src: "Media/10.jpg"},
    { id: 11, src: "Media/11.jpg"},
    { id: 11, src: "Media/11.jpg"},
    { id: 12, src: "Media/12.jpg"},
    { id: 12, src: "Media/12.jpg"},
  ];


const body = document.querySelector("body");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");

const mainWelcome = document.querySelector("#main-welcome");
const music = document.querySelector("#music");
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




