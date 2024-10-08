import { loop, timeValues, array, distanceValues } from "./physics.js";
import { createClones, updateTexts } from "./functions.js"
const valueArray = JSON.parse(sessionStorage.getItem("valueArray"))
const texts = [];
const names = ["A","B", "C", "D", "E", "F", "G"];

const model = sessionStorage.getItem("model");

const button = document.querySelector("button");

button.addEventListener("click", function () {
    window.location.href = "/index.html"
})

const info = document.getElementById("info");
info.innerHTML = "1 Pixel ≈ " + (distanceValues.fixDistance / Math.pow(10, 6)).toFixed(1) + " Mm" 

const save = document.getElementById("save");

save.addEventListener("click", function () {
    let answer = prompt("Which preset slot do you want to save this simulation on 1, 2, 3, 4 (type cancel if you changed your mind)")

    while ((isNaN(parseInt(answer)) || answer > 4 || answer < 1) && answer.toLowerCase() !== "cancel" && answer !== null) {
        answer = prompt("Your answer must be a number between 1-4")
    }

    if (answer.toLowerCase() !== "cancel") {
        let name = prompt("How do you want to name this preset (type cancel if you changed your mind)", "Preset " + parseInt(answer))

        if (name.toLowerCase() !== "cancel" && name !== null) {
            localStorage.setItem(`Preset ${parseInt(answer)}`, sessionStorage.getItem("valueArray"))
            localStorage.setItem(`Name ${parseInt(answer)}`, name)   
        }
    }
})
for (let i = 0; i < array.length; i++) {
    array[i].obj.innerHTML = names[i]

    const p = document.createElement("p")
    document.body.appendChild(p)

    texts.push(p)
}

console.log(texts)

const interval = setInterval(() => {
    loop()

    updateTexts(texts, valueArray, names, array)
}, timeValues.timeConstant);

const interval2 = setInterval(() => {
    createClones(array)
}, model === "A" ? 10 : 50);

const upTime = document.getElementById("upTime");
const downTime = document.getElementById("downTime");
const currentTime = document.querySelector("#timeControls p");

upTime.addEventListener("click", function () {
    if (timeValues.speedOfTime < 2) {
        timeValues.speedOfTime = parseFloat((timeValues.speedOfTime + 0.1).toFixed(1))
   
        currentTime.innerHTML = timeValues.speedOfTime + "x"
    }
})

downTime.addEventListener("click", function () {
    if (timeValues.speedOfTime > 0) {
        timeValues.speedOfTime = parseFloat((timeValues.speedOfTime - 0.1).toFixed(1))
   
        currentTime.innerHTML = timeValues.speedOfTime + "x"
    }
})

window.addEventListener("resize", function () {
    const screenLength = window.innerWidth;

    distanceValues.fixDistance = distanceValues.distance / screenLength

    info.innerHTML = "1 Pixel ≈ " + (distanceValues.fixDistance / Math.pow(10, 6)).toFixed(1) + " Mm" 
})

const controls = document.querySelectorAll(".row")

if (model === "B") {
    document.getElementById("timeControls").remove()
    document.getElementById("timeText").innerHTML = "The time feature only <br> does not work for this Model"
}
console.log("Version: 0.0.2")