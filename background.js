const points = []
let numPoints = 40;
let incrementRange = 100;
let aliveTime = 300;
let switchDirection = 5;
let width = window.innerWidth;
let height = document.documentElement.scrollHeight;
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
ctx.canvas.width = width
ctx.canvas.height = height


for(let i= 0; i < numPoints; i++){
	points[i] = [Math.floor(Math.random() * width), 0, 0]
}

async function build() {

	for (let j = 0; j < aliveTime; j++){
		for (let i = 0; i < numPoints; i++) {
			if(j % switchDirection == 0) {
				let choice = Math.floor(Math.random() * 3)
				let increment = Math.floor(Math.random() * incrementRange)
				if (choice == 1 & points[i][2] == 0) {
					if (points[i][0]+increment >= width){
						points[i] = [width, points[i][1], 1, width-points[i][0]]
					} else  {
						points[i] = [points[i][0], points[i][1], 1, increment]
					}
				} else if (choice == 2 & points[i][2] == 0) {
					if (points[i][0]-increment <= 0){
						points[i] = [0, points[i][1], 2, points[i][0]]
					} else {
						points[i] = [points[i][0], points[i][1], 2, increment]
					}
				} else {
					points[i] = [points[i][0], points[i][1], 0, increment]
				}
			} else {

				
				let choice = points[i][2]
				ctx.beginPath()
				ctx.moveTo(points[i][0], points[i][1])
				if(choice == 1){
					points[i][0] = points[i][0] + Math.floor(points[i][3]/switchDirection)
				} else if (choice == 2) {
					console.log("hejei")
					points[i][0] = points[i][0] - Math.floor(points[i][3]/switchDirection)
				} else {
					points[i][1] = points[i][1] + Math.floor(points[i][3]/switchDirection)
				}
				ctx.lineWidth = ((i+1)/numPoints) * 3
				ctx.lineTo(points[i][0], points[i][1])
				let alpha = ((i+1)/numPoints) * .25
				let title = document.getElementById("title").getBoundingClientRect()
				console.log(title.bottom)
				if(points[i][1] >= title.bottom/2) {
					alpha = alpha * (1 - (points[i][1]/title.bottom))
				}
				if(points[i][1] > title.bottom*1.5){
					return
				}
				ctx.strokeStyle = "rgba(0, 0, 0, " + alpha + ")";
				ctx.stroke()
			}
		}
		await new Promise(r => setTimeout(r, 30))
	}
}
build()
