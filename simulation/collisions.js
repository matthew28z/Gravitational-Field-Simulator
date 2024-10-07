import { array, timeConstant } from "/functions";

const valueArray = JSON.parse(sessionStorage.getItem("valueArray"));

function collision(U1x, U1y, U2x, U2y, m1, m2) {
    //sets the values for most cases
    let u1x = ((m1 - m2) * U1x + 2 * m2 * U2x) / (m1 + m2)
    let u1y = ((m1 - m2) * U1y + 2 * m2 * U2y) / (m1 + m2)
    let u2x = ((m2 - m1) * U2x + 2 * m1 * U1x) / (m1 + m2)
    let u2y = ((m2 - m1) * U2y + 2 * m1 * U1y) / (m1 + m2)

    //checks for special cases
    if (U1y === 0 || U2y === 0) {
        //changes the speeds as if no collision happened in the y axis
        u1y = U1y
        u2y = U2y
    }
    if (U1x === 0 || U2x === 0) {
        //changes the speeds as if no collision happened in the x axis
        u1x = U1x
        u2x = U2x
    }
    //den einai swsto an to ena exei taxythta mono ston y kai to allo mono ston x
    return [{x: u1x, y: u1y}, {x: u2x, y: u2y}]
}

setInterval(() => {
    for (let i = 0; i < array.length; i++) {
        const r1 = valueArray[i].width / 2
        const x1 = array[i].obj.getBoundingClientRect().left + r1
        const y1 = array[i].obj.getBoundingClientRect().top + r1

        
        for (let k = 0; k < array.length; k++) {
            if (i !== k) {
                const r2 = valueArray[k].width / 2
                const x2 = array[k].obj.getBoundingClientRect().left + r2
                const y2 = array[k].obj.getBoundingClientRect().top + r2

                const d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

                if (d <= r1 + r2) {
                    const speeds = collision(array[i].Ux, array[i].Uy, array[k].Ux, array[k].Uy, valueArray[i].mass, valueArray[k].mass) 

                    array[i].Ux = speeds[0].x
                    array[i].Ux = speeds[0].y
                    array[k].Ux = speeds[1].x
                    array[k].Ux = speeds[1].y
                }
            }
        }
    }
}, timeConstant);