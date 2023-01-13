const canvas = document.querySelector("canvas")
ctx = canvas.getContext("2d")

let isDrawing = false;

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
}

canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mouseup", () => { isDrawing = false })