import { valueArray, p2,  div, start, alphabetArray, contentArray} from "../start.js";
import { secondClick } from "./secondClick.js";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomValue(type) {
    let mass;
    let width;
    if (type === "Sun") {
        mass = getRandomInt(10, 15) * Math.pow(10, 35)
        width = getRandomInt(90, 100)
    } else if (type === "Planet") {
        mass = getRandomInt(1, 10) * Math.pow(10, getRandomInt(18, 20))
        width = getRandomInt(20, 30)
    } else {
        mass = getRandomInt(1, 10) * Math.pow(10, getRandomInt(14, 16))
        width = getRandomInt(10, 16)
    }
    return [mass, width]
}

function chooseType(button) {
    const parent = button.parentElement
    const buttons = parent.querySelectorAll("button")

    buttons.forEach(element => {
        element.style.borderColor = "gold"
    });

    button.style.borderColor = "red"

    const divs = document.querySelectorAll("#mainDiv div")
    let currentDivIndex;
    for (let x = 0; x < divs.length; x++) {
        if (divs[x] === parent) {
            currentDivIndex = x
            break
        }
    } 

    if (button.innerHTML === "Sun") {
        const values = randomValue("Sun")
        valueArray[currentDivIndex].mass = values[0] 
        valueArray[currentDivIndex].width = values[1] 
        valueArray[currentDivIndex].type = "Sun"
    } else if (button.innerHTML === "Planet") {
        const values = randomValue("Planet")
        valueArray[currentDivIndex].mass = values[0] 
        valueArray[currentDivIndex].width = values[1]
        valueArray[currentDivIndex].type = "Planet"
    } else {
        const values = randomValue("Asteroid")
        valueArray[currentDivIndex].mass = values[0] 
        valueArray[currentDivIndex].width = values[1]
        valueArray[currentDivIndex].type = "Asteroid"
    }
    
    let hasBeenClicked = sessionStorage.getItem(currentDivIndex)

    if (!hasBeenClicked) {
        sessionStorage.setItem(currentDivIndex, "true")
    }
    console.log(valueArray)
}

export function firstClick() {
    let value;

    for (let i = 0; i < 4; i++) {
        if (sessionStorage.getItem(`pr${i + 1}`) === "true") {
            value = true
        }
    }


    if (!value) {
        let amount = parseInt(prompt("How many objects do you want in your simulation (max 7, min 2)", 4))
    start.innerHTML = "Continue"

    while (amount < 2 || amount > 7 || isNaN(amount)) {
        if (amount < 2) {
            amount = parseInt(prompt("You need at least 2 objects (max 7)", 2))
        } else if (amount > 7) {
            amount = parseInt(prompt("More than 7 objects will result in a laggy simulation (min 2)", 7))
        } else {
            amount = parseInt(prompt("Your answer must be an integer (max 7, min 2)", 4))
        }
    }

    const presets = document.getElementById("presets")
    presets.remove()
    p2.remove()
    const text = document.createElement("p")
    text.innerHTML = "Choose the type of each object in the simulation (This will have an effect on the forces they generate)"
    div.appendChild(text)

    start.style.bottom = "5vh"

    for (let i = 0; i < amount; i++) {
        valueArray.push({name: alphabetArray[i], type: "", mass: 0, width: 0, Ux: 0, Uy: 0, posX: 0, posY: 0})
        
        const div = document.createElement("div")
        div.classList.add("section")
        mainDiv.appendChild(div)

        const p = document.createElement("p")
        p.innerHTML = "Object " + alphabetArray[i].toUpperCase() + ":"
        div.appendChild(p)

        for (let k = 0; k < 3; k++) {            
            const button = document.createElement("button") 
            button.innerHTML = contentArray[k]
            button.classList.add("content")
            div.appendChild(button)

            button.addEventListener("click", function () {
                chooseType(button)
            })
        }

    }

    start.removeEventListener("click", firstClick)
    start.addEventListener("click", secondClick)
    } else {
        window.location.href = "../simulation/sim.html"
    }
}
