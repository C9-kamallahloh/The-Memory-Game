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
    { id: 1, src: ""},
    { id: 1, src: ""},
    { id: 2, src: ""},
    { id: 2, src: ""},
    { id: 3, src: ""},
    { id: 3, src: ""},
    { id: 4, src: ""},
    { id: 4, src: ""},
    { id: 5, src: ""},
    { id: 5, src: ""},
    { id: 6, src: ""},
    { id: 6, src: ""},
    { id: 7, src: ""},
    { id: 7, src: ""},
    { id: 8, src: ""},
    { id: 8, src: ""},
    { id: 9, src: ""},
    { id: 9, src: ""},
    { id: 10, src: ""},
    { id: 10, src: ""},
    { id: 11, src: ""},
    { id: 11, src: ""},
    { id: 12, src: ""},
    { id: 12, src: ""},
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




