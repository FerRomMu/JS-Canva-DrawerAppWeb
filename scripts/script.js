/**
 * HTML elements
 */
const canvas = document.querySelector("canvas"),
slider = document.getElementById("size-slider"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
ctx = canvas.getContext("2d"),
clearCanvas = document.querySelector(".clear-canvas"),
saveCanvas = document.querySelector(".save-img")

/**
 * GLOBAL VARIABLES
 *
 * isDrawing: Indicates whether the mouse is clicked.
 * selectedTool: A string describing the selected tool.
 * toolWidth: A value between 0 and 100 that describes
 *            the size of the line to be draw.
 * downMouseX: The relative X position when the mouse
 *             was clicked.
 * downMouseY: The relative Y position when the mouse
 *             was clicked.
 * snapshot: A backup of the image before an alteration
 *           is made.
 */
let isDrawing = false,
selectedTool = "brush",
toolWidth = () => slider.value,
downMouseX, downMouseY, snapshot,
selectedColor = "#F00"

/**
 * Set canvas size.
 */
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

/**
 * Creates a rectangle from the original position of
 * the mouse when was clicked to the actual position
 * given by the event.
 * @param e: is the event
 */
const drawRect = (e) => {
    if(fillColor.checked) {
        ctx.fillRect(e.offsetX, e.offsetY,
            downMouseX - e.offsetX,
            downMouseY - e.offsetY)
    } else {
        ctx.strokeRect(e.offsetX, e.offsetY,
        downMouseX - e.offsetX,
        downMouseY - e.offsetY)
    }
}

/**
 * Creates a circle from the original position of
 * the mouse when was clicked to the actual position
 * given by the event.
 * @param e: is the event
 */
const drawCircle = (e) => {
    ctx.beginPath()
    let radius = Math.sqrt(
        Math.pow((downMouseX - e.offsetX), 2) +
        Math.pow((downMouseY - e.offsetY), 2)
    )
    ctx.arc(downMouseX, downMouseY, radius, 0, 2 * Math.PI)
    fillColor.checked ? ctx.fill() : ctx.stroke()
}

/**
 * Creates a triangle from the original position of
 * the mouse when was clicked to the actual position
 * given by the event.
 * @param e: is the event
 */
const drawTriangle = (e) => {
    ctx.beginPath()
    ctx.moveTo(downMouseX, downMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(downMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath()
    fillColor.checked ? ctx.fill() : ctx.stroke()
}

/**
 * If the mouse is being clicked execute the currently
 * active tool.
 * @param e: is the event
 */
const drawing = (e) => {
    if(!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)

    if(selectedTool === "brush" || 
       selectedTool == "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ?
                          "#161b22" : selectedColor
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    }

    if(selectedTool === "rectangle") {
        drawRect(e)
    }

    if(selectedTool === "triangle") {
        drawTriangle(e)
    }

    if(selectedTool === "circle") {
        drawCircle(e)
    }
}

/**
 * Sets global variables when mouse is clicked.
 * @param e: is the event
 */
const startDraw = (e) => {
    isDrawing = true
    ctx.beginPath()
    ctx.lineWidth = toolWidth()
    ctx.strokeStyle = selectedColor
    ctx.fillStyle = selectedColor
    downMouseX = e.offsetX
    downMouseY = e.offsetY
    snapshot = ctx.getImageData(0,0,canvas.width,canvas.height)
}

/**
 * Sets global variables when mouse stop being clicked.
 * @param e: is the event
 */
const stopDraw = (e) => {
    isDrawing = false
}

/**
 * Sets events to execute functions when mouse is
 * clicked and moved.
 */
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mouseup", stopDraw)

/**
 * Sets events on tool to be able to select them.
 */
toolBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector(".options .active").classList.remove("active")
        btn.classList.add("active")
        selectedTool = btn.id
    })
})

/**
 * Sets events on colors selectors.
 */
colorBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector(".options .selected").classList.remove("selected")
        btn.classList.add("selected")
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color")
    })
})

/**
 * Set event on color picker.
 */
colorPicker.addEventListener("change", () => {
    colorPicker.parentElement
    .style.background = colorPicker.value
    colorPicker.parentElement.click() //Calls event to refresh color
})

/**
 * Clear canvas when clear button is clicked.
 */
clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0,0,canvas.width, canvas.height)
})