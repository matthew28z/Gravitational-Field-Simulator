import { firstClick } from "/startLogic/firstClick.js";

export const valueArray = [];
export const alphabetArray = ["a", "b", "c", "d", "e", "f", "g"];
export const contentArray = ["Sun", "Planet", "Asteroid"];

export const p2 = document.getElementById("p2");
export const div = document.getElementById("mainDiv");
export const start = document.getElementById("start");
const presets = document.getElementById("presets");
console.log(window.location.href)
sessionStorage.clear()

const buttons = presets.querySelectorAll("button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        if (i === 0) {
            sessionStorage.setItem("model", "A")
        } else if (i === 1) {
            sessionStorage.setItem("model", "B")
        } else {
            sessionStorage.setItem("model", "C")
        }
        buttons.forEach(button => {
            button.style.borderColor = "gold"
        })
        this.style.borderColor = "red"
    })
}

function choosemodel() {
    const model = sessionStorage.getItem("model")

    if (model !== null) {
        presets.style.left = "30vw"

        buttons.forEach(button => {
            button.remove()
        })
        document.getElementById("modelP").innerHTML = "Your Simulation Presets:"

        for (let i = 0; i < 4; i++) {
            const button = document.createElement("button")
            presets.appendChild(button)
    
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
    
                    const buttons = presets.querySelectorAll("button")
    
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

        start.removeEventListener("click", choosemodel)
        start.addEventListener("click", firstClick)
    } else {
        window.alert("You have to choose a Physics Model before advancing to the next selection screen")
    }
}

start.addEventListener("click", choosemodel)
