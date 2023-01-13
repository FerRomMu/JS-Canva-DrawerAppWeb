const canvas = document.querySelector("canvas")
const slider = document.getElementById("size-slider")
ctx = canvas.getContext("2d")

let isDrawing = false

let toolWidth = () => slider.value

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

const drawing = (e) => {
    if(!isDrawing) return
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
}

const startDraw = () => {
    isDrawing = true
    ctx.beginPath()
    ctx.lineWidth = toolWidth()
}

canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mouseup", () => { isDrawing = false })