export function createClones(array) {
    const body = document.body;
    const clones = [];

    for (let i = 0; i < array.length; i++) {
        //creates a trail
        const element = array[i].obj

        const clone = element.cloneNode(true)
        clone.style.left = element.style.left
        clone.style.top = element.style.top
        clone.classList.add("clone")
        clone.innerHTML = ""
        body.appendChild(clone)

        clones.push(clone)
    } 

        //makes the trail vanish
        setTimeout(() => {
            clones.forEach(clone => {
                clone.style.opacity = "0"
    
                setTimeout(() => {
                    clone.remove()
                })
            }, 1000)
        }, 1000);
}

export function updateTexts(texts, valueArray, names, array) {
        //updates the p elements
        for (let i = 0; i < texts.length; i++) {
            texts[i].innerHTML = `Speed Of ${valueArray[i].type} ${names[i]}: ${(Math.sqrt(Math.pow(array[i].Ux, 2) + Math.pow(array[i].Uy, 2))).toFixed(2)} m/s`
       }
}