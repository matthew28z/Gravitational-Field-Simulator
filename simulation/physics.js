const valueArray = JSON.parse(sessionStorage.getItem("valueArray"));
const model = sessionStorage.getItem("model");

function position(obj, posX, posY) {
    document.querySelector("body").appendChild(obj)

    let x = window.innerWidth * posX + "px"
    let y = window.innerHeight * posY + "px"

    obj.style.position = "fixed"
    obj.style.top = y
    obj.style.left = x
}

function fillArray(valueArray) {
    const array = [];

    for (let i = 0; i < valueArray.length; i++) {
        const element = document.createElement("div") 
        element.classList.add("object")    
        document.body.appendChild(element)

        if (valueArray[i].type === "Sun") {
            element.classList.add("sun")
        } else if (valueArray[i].type === "Planet") {
            element.classList.add("planet")
            
        }
        element.style.width = valueArray[i].width + "px"
        element.style.height = valueArray[i].width + "px"
        console.log(parseFloat(element.style.width))

        array.push({obj: element, Ux: valueArray[i].Ux, Uy: valueArray[i].Uy, mass: valueArray[i].mass})

        position(element, valueArray[i].posX, valueArray[i].posY)
    }

    return array
}

export const array = fillArray(valueArray)

console.log(array)
const timeConstant = model === "A" ? 10 : 3
export const timeValues = { timeConstant: timeConstant, fixTime: timeConstant * Math.pow(10, -3), speedOfTime: 1}


const G = 6.6743 * Math.pow(10,-11); //Gravitational Constant

const screenLength = window.innerWidth;

export const distanceValues = { distance: 1500 * Math.pow(10, 9), fixDistance: 1500 * Math.pow(10, 9) / screenLength };


function calcDistance(a, b) {
    let dx = ((a.getBoundingClientRect().left + parseFloat(a.style.width) / 2) - (b.getBoundingClientRect().left + parseFloat(b.style.width) / 2)) * distanceValues.fixDistance
    let dy = ((a.getBoundingClientRect().top + parseFloat(a.style.height) / 2) - (b.getBoundingClientRect().top + parseFloat(b.style.height) / 2)) * distanceValues.fixDistance
   
    let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy,  2))

    return [d, dx, dy]
}

function calcForce(d, dx, dy, m1, m2) {
    let Fx;
    let Fy;
    if (d !== 0) {
        Fx = G * (m1 * m2)/ (Math.pow(d, 2)) * (dx) / d * (-1)
        Fy = G * (m1 * m2)/ (Math.pow(d, 2)) * (dy) / d * (-1)

    } else {
        Fx = 0;
        Fy = 0;
    }
    
    return [Fx, Fy]
}

function calcAcceleration(Fx, Fy, m) {
    let ax = Fx / m
    let ay = Fy / m

    return [ax, ay]
}

function calcSpeed(ax, ay) {
    let Ux = ax * timeValues.fixTime
    let Uy = ay * timeValues.fixTime

    return [Ux, Uy]
}

function calcMovement(Ux, Uy, ax = 0, ay = 0) {
    let x;
    let y;
    if (model === "B") {
        x = Ux * timeValues.fixTime +  0.5 * ax * Math.pow(timeValues.fixTime, 2)
        y = Uy * timeValues.fixTime + 0.5 * ay * Math.pow(timeValues.fixTime, 2)
    } else {
        x = Ux * timeValues.fixTime 
        y = Uy * timeValues.fixTime
    }
    return [x, y]
}

function moveObject(obj, x, y) {
    let left = obj.getBoundingClientRect().left
    let top = obj.getBoundingClientRect().top

    obj.style.left = left + x + "px"
    obj.style.top = top + y + "px"
}

export function loop() {
    for (let i = 0; i < array.length; i++) {
        let UxB = array[i].Ux
        let UyB = array[i].Uy
    
        const Fol = [];
    
        for (let k = 0 ; k < array.length; k++) {
            if (i !== k) {
                const dArray = calcDistance(array[i].obj, array[k].obj)
    
                let d = dArray[0]
                let dx = dArray[1]
                let dy = dArray[2]
                
                const fArray = calcForce(d, dx, dy, array[i].mass, array[k].mass) 
    
                let Fx = fArray[0]
                let Fy = fArray[1]
               
                Fol.push({x: Fx, y: Fy})
            }
        }
    
        let Fx = 0;
        let Fy = 0;
    
        for (let x = 0; x < Fol.length; x++) {
            Fx += Fol[x].x
            Fy += Fol[x].y
        }
    
        const aArray = calcAcceleration(Fx, Fy, array[i].mass)
    
        let ax = aArray[0]
        let ay = aArray[1]

        let mArray;
        let speedArray;
        let Ux;
        let Uy;

        if (model === "B") {
            mArray = calcMovement(UxB, UyB, ax, ay)
            speedArray = calcSpeed(ax, ay)
        
            Ux = speedArray[0] + UxB
            Uy = speedArray[1] + UyB
        } else if (model === "A") {
            speedArray = calcSpeed(ax * timeValues.speedOfTime, ay * timeValues.speedOfTime) //accounts for the speed of time set bu the user
            
            Ux = speedArray[0] + UxB
            Uy = speedArray[1] + UyB
            
            mArray = calcMovement(Ux * timeValues.speedOfTime, Uy * timeValues.speedOfTime) 
        } else {
            speedArray = calcSpeed(ax * timeValues.speedOfTime, ay * timeValues.speedOfTime)

            Ux = speedArray[0] + UxB
            Uy = speedArray[1] + UyB

            let UxA = (Ux + UxB) / 2
            let UyA = (Uy + UyB) / 2

            mArray = calcMovement(UxA * timeValues.speedOfTime, UyA * timeValues.speedOfTime) 
        }
        
        let x = mArray[0]
        let y = mArray[1]
       
    
    
        array[i].Ux = Ux
        array[i].Uy = Uy
    
        moveObject(array[i].obj, x, y)
    }
}
