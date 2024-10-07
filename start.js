import { inBetween } from "/startLogic/inBetween.js";

export const valueArray = [];
export const alphabetArray = ["a", "b", "c", "d", "e", "f", "g"];
export const contentArray = ["Sun", "Planet", "Asteroid"];

export const p2 = document.getElementById("p2");
export const div = document.getElementById("mainDiv");
export const start = document.getElementById("start");

console.log(window.location.href)
sessionStorage.clear()

start.addEventListener("click", inBetween)
