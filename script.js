const DEFAULT_Size = 16
const DEFAULT_color = '#333333'
const DEFAULT_mode = 'color'

let Current_size = DEFAULT_Size
let Current_color = DEFAULT_color
let Current_mode = DEFAULT_mode


function setCurrentColor(new_color) {
    Current_color = new_color
}

function serCurrentMode(new_mode) {
    Current_mode = new_mode

}

function setCurrentSize(new_size) {
    Current_size = new_size
}

// slider
let slider = document.getElementById("slider")
let selector_val = document.getElementById("selector_value")
let selector_val2 = document.getElementById("selector_value2")
selector_val.innerHTML = slider.value;
selector_val2.innerHTML = slider.value;
let sketchBox = document.getElementById("sketch_box")

slider.onchange = function () {
    selector_val.innerHTML = this.value;
    selector_val2.innerHTML = this.value;
    let size = this.value
    setCurrentSize(size)
    resetSketchBox()
}


// getting mode buttons
let COLOR_INPUT = document.getElementById("COL_INP")
const ColorModeBtn = document.getElementById("Color")
const RainbowModeBtn = document.getElementById("Rainbow")
const EraseModeBtn = document.getElementById("Erase")
const ClearModeBtn = document.getElementById("Clear")


// getting current color
COLOR_INPUT.oninput = (e) => setCurrentColor(e.target.value)

// getting current modes
ColorModeBtn.onclick = () => serCurrentMode('color')
RainbowModeBtn.onclick = () => serCurrentMode('rainbow')
EraseModeBtn.onclick = () => serCurrentMode('erase')
ClearModeBtn.onclick = () => resetSketchBox()



// reset the box
function resetSketchBox() {
    clearSketchBox()
    makeGrid(Current_size)
}

function clearSketchBox() {
    sketchBox.innerHTML = ""
}


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function makeGrid(size) {

    sketchBox.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    sketchBox.style.gridTemplateRows = `repeat(${size},1fr)`

    for (i = 0; i < size * size; i++) {
        grids = document.createElement("div");
        grids.classList.add("grids")
        grids.addEventListener('mouseover', changeColor)
        grids.addEventListener('mousedown', changeColor)
        sketchBox.appendChild(grids)

    }
}


function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (Current_mode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (Current_mode === 'color') {
        e.target.style.backgroundColor = Current_color
    } else if (Current_mode === 'erase') {
        e.target.style.backgroundColor = '#ffffff'
    }
}

window.onload = () => {
    makeGrid(DEFAULT_Size)
}

