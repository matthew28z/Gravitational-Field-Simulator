import { valueArray, alphabetArray } from "../start.js";
import { thirdClick } from "./thirdClick.js"
import { createInputs } from "./functions.js";

const mainDiv = document.getElementById("mainDiv");

function newInput(element) {
    const parent = element.parentElement
    const allDivs = document.querySelectorAll("#mainDiv div")

    let currentDivIndex;

    for (let i = 0; i < allDivs.length; i++) {
        if (parent === allDivs[i]) {
            currentDivIndex = i
            break
        }
    }

    let currentInputIndex;

    const inputs = parent.querySelectorAll("input")

    for (let i = 0; i < inputs.length; i++) {
        if (element === inputs[i]) {
            currentInputIndex = i
            break
        }
    }

    if (currentInputIndex === 0) { //This means it is for the x axis
        valueArray[currentDivIndex].Ux = Number(element.value)
    } else { //this means its for the y axis
        valueArray[currentDivIndex].Uy = Number(element.value)
    }
    sessionStorage.setItem("valueArray", JSON.stringify(valueArray))
}

export function secondClick() {
    const allDivs = document.querySelectorAll("#mainDiv div")
    let total = allDivs.length
    let amount = 0;

    for (let i = 0; i < allDivs.length; i++) {
        let hasBeenClicked = sessionStorage.getItem(i)
        if (hasBeenClicked === "true") {
            amount += 1 
        } 
    }

    if (amount === total) {
        start.removeEventListener("click", secondClick)
        allDivs.forEach(div => {
            div.remove()
        })
        
        document.querySelector("#mainDiv p").innerHTML = "Choose the speed of each object in the simulation (This will have an effect on their trajectories, we suggest that Planets and Asteroids have bigger speeds while Suns have a speed of 0)"
        
        createInputs("&nbsp;Choose the speed in the x axis:&nbsp;", "&nbsp;Choose the speed in the y axis:&nbsp;", "m/s", newInput)

        start.addEventListener("click", thirdClick)
    } else {
        window.alert("You have to choose a type for each object before proceeding to the next selection")
    }
}


