enum Sides {
    Left,
    Right
}

class TrapezoidCanvas {
    canvas = document.getElementById("trapezoid-canvas") as HTMLCanvasElement;
    angle = 20;
    tanAngle = Math.tan(this.angle * Math.PI/180);
    extraWidth: number;

    constructor() {
        // If the screen proportions change we need to redraw the content
        window.addEventListener("resize", this.redrawCanvas);

        this.setupCanvas();
        this.drawCanvas();
    }

    /**
     * Ensures we have the right amount of canvas pixels and clear any previous
     */
    setupCanvas = () => {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.extraWidth = (this.tanAngle * this.canvas.height) / 2;
    }

    redrawCanvas = () => {
        this.canvas.getContext("2d").clearRect(0,0,this.canvas.width, this.canvas.height);
        this.setupCanvas();
        this.drawCanvas();
    }

    drawCanvas = () => {
        this.drawTrapezoid(Sides.Left);
        this.drawTrapezoid(Sides.Right);
    }

    drawTrapezoid = (side: Sides) => {
        const context = this.canvas.getContext("2d");
        const topMiddle = (this.canvas.width / 2) + this.extraWidth;
        const bottomMiddle = (this.canvas.width / 2) - this.extraWidth;
        const xCoordinates = (side == Sides.Left)? [0, topMiddle, bottomMiddle, 0] : [topMiddle, this.canvas.width, this.canvas.width, bottomMiddle];
        const yCoordinates = [0, 0, this.canvas.height, this.canvas.height];
        const background = new Image();
        background.src = (side == Sides.Left)? "assets/img/landscape1.jpeg" : "assets/img/landscape2.jpeg";

        background.onload = () => {
            context.fillStyle = context.createPattern(background, "repeat");
            context.beginPath();
            xCoordinates.forEach((xCoordinate, index) => {
                if (index > 0) {
                    context.lineTo(xCoordinate, yCoordinates[index]);
                } else {
                    context.moveTo(xCoordinate, yCoordinates[index]);
                }

            });
            context.closePath();
            context.stroke();
            //context.fillStyle=(side == Sides.Left)? "red" : "blue";
            context.fill();
        }
    }
}

new TrapezoidCanvas();