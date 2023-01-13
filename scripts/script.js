/**
 * HTML elements
 */
const canvas = document.querySelector("canvas"),
slider = document.getElementById("size-slider"),
toolBtns = document.querySelectorAll(".tool"),
ctx = canvas.getContext("2d")

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
downMouseX, downMouseY, snapshot

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
    ctx.strokeRect(e.offsetX, e.offsetY,
        downMouseX - e.offsetX,
        downMouseY - e.offsetY)
}

/**
 * If the mouse is being clicked execute the currently
 * active tool.
 * @param e: is the event
 */
const drawing = (e) => {
    if(!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)

    if(selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    }

    if(selectedTool === "rectangle") {
        drawRect(e)
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