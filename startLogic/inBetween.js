import { firstClick } from "./firstClick.js";
import { start } from "/start.js";

const div = document.getElementById("presets")

export function inBetween() {

    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button")
        div.appendChild(button)

        const name = localStorage.getItem(`Name ${i + 1}`)

        if (name === null) {
            button.innerHTML = "Preset " + (i + 1)
        } else {
            button.innerHTML = name
        }

        button.addEventListener("click", function () {
            const storedValue = JSON.parse(localStorage.getItem(`Preset ${i + 1}`))

            if (storedValue === null) {
                alert("You have no Preset saved in this slot, to save one click the 💾 during the simulation")
            } else {
                start.innerHTML = "Begin Simulation"

                const buttons = div.querySelectorAll("button")

                buttons.forEach(element => {
                    element.style.borderColor = "gold"
                })
                
                button.style.borderColor = "red"

                sessionStorage.setItem("valueArray", JSON.stringify(storedValue))
                
                for (let x = 0; x < 4; x++) {
                    sessionStorage.setItem(`pr${x + 1}`, "false")
                }
                sessionStorage.setItem(`pr${i + 1}`, "true")
            }
        })
    }

    start.removeEventListener("click", inBetween)
    start.addEventListener("click", firstClick)
}