const canvas = document.querySelector("canvas")
const slider = document.getElementById("size-slider")
const toolBtns = document.querySelectorAll(".tool")
ctx = canvas.getContext("2d")

let isDrawing = false
let selectedTool = "brush"

let toolWidth = () => slider.value

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

const drawing = (e) => {
    if(!isDrawing) return

    if(selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    }
}

const startDraw = () => {
    isDrawing = true
    ctx.beginPath()
    ctx.lineWidth = toolWidth()
}

canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mouseup", () => { isDrawing = false })

toolBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector(".options .active").classList.remove("active")
        btn.classList.add("active")
        selectedTool = btn.id
    })
})