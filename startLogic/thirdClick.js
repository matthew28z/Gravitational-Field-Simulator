import { valueArray, start } from "../start.js";
import { createInputs } from "./functions.js";
import { finalClick } from "./finalClick.js";

const mainDiv = document.getElementById("mainDiv");

function newInput(element) {
    if (element.value < 0 || element.value > 1) {
        if (element.value < 0) {
            element.value = 0
        } else {
            element.value = 1
        }
    }
    
    const parent = element.parentElement
    const allDivs = document.querySelectorAll("#mainDiv div")

    let currentDivIndex;

    for (let i = 0; i < allDivs.length; i++) {
        if (parent === allDivs[i]) {
            currentDivIndex = i
            break
        }
    }

    const inputs = parent.querySelectorAll("input")
    let currentInputIndex;

    for (let i = 0; i < inputs.length; i++) {
        if (element === inputs[i]) {
            currentInputIndex = i
            break
        }
    }

    if (currentInputIndex === 0) { //This means it is for the x axis
        valueArray[currentDivIndex].posX = Number(element.value)
    } else { //this means its for the y axis
        valueArray[currentDivIndex].posY = Number(element.value)
    }
    sessionStorage.setItem("valueArray", JSON.stringify(valueArray))
}

export function thirdClick() {
        const allDivs = document.querySelectorAll("#mainDiv div")
        const mainDiv = document.getElementById("mainDiv")
    
        start.innerHTML = "Begin Simulation"
    
        const text = mainDiv.querySelector("p")
        text.innerHTML = `Choose the starting position of each object (it is relative to the viewport, for example 0.5 means around the halfpoint of the axis)`
    
        allDivs.forEach(div => {
            div.remove()
        })
    
        createInputs("&nbsp;Pick a position in the x axis:&nbsp;", "&nbsp;Pick a position in the y axis:&nbsp;", "", newInput, true)

        start.removeEventListener("click", thirdClick)
        start.addEventListener("click", finalClick)

}    