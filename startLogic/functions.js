import { valueArray, alphabetArray } from "../start.js";

const mainDiv = document.getElementById("mainDiv");


export function createInputs(string1, string2, string3, func, tF = false) {
    for (let i = 0; i < valueArray.length; i ++) {
        const div = document.createElement("div")
        div.classList.add("section")
        div.style.marginLeft = "15%"
        mainDiv.appendChild(div)
    
        const p = document.createElement("p")
    
        p.innerHTML = valueArray[i].type === "Sun" 
        ? "Sun " + alphabetArray[i].toUpperCase() + ":        " 
        : valueArray[i].type === "Planet" 
        ? "Planet " + alphabetArray[i].toUpperCase() + ":    "
        : "Asteroid " + alphabetArray[i].toUpperCase() + ":"
        div.appendChild(p)
    
        for (let x = 0; x < 2; x++) {
            const text = document.createElement("p")
            text.innerHTML = x === 0  
            ? string1 
            : string2
            div.appendChild(text)
    
            const input = document.createElement("input") 
            input.type = "number"
            input.value = 0
            div.appendChild(input)
    
            input.addEventListener("input", function () {
                func(input)
            })

            if (tF) {
                if (valueArray[i].type === "Sun") {
                    const value = (Math.random() * (0.1) + 0.4).toFixed(1)

                    input.value = value
                    if (x === 0) {
                        valueArray[i].posX = value
                    } else {
                        valueArray[i].posY = value
                    }
                }
            } else {
                if (valueArray[i].type !== "Sun") {
                    if (x === 0) {
                        const value = Math.floor(Math.random() * 500 + 300) 

                        input.value = value

                        valueArray[i].Ux = value
                    } 
                }

                const text2 = document.createElement("p")
                text2.innerHTML = string3
                div.appendChild(text2)
            }
        }
    }
    sessionStorage.setItem("valueArray", JSON.stringify(valueArray))
}
