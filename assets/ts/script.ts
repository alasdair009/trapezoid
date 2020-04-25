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

    /**
     * Setup a background canvas to generate a background pattern for the shape
     * @param background the HTML background image
     * @param side the side one which the background will be drawn
     */
    generateBackgroundCanvasPattern = (background: HTMLImageElement, side: Sides):HTMLCanvasElement => {
        // Create a temporary virtual canvas
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempContext = tempCanvas.getContext("2d");
        // Get the width an image would need to cover
        const tempCanvasDisplayWidth = (this.canvas.width / 2) + this.extraWidth;
        // Set where on the canvas it needs to be drawn from (ie left or from the start of the right side)
        const tempCanvasDisplayX = (side == Sides.Left)? 0 : this.canvas.width - tempCanvasDisplayWidth;
        // Make sure the image will at least cover the side it is on
        const displayWidth = (background.width > tempCanvasDisplayWidth)? background.width : tempCanvasDisplayWidth;
        const displayHeight = (background.height > this.canvas.height)? background.height : this.canvas.height;
        // Draw the image into the canvas
        tempContext.drawImage(background, 0, 0, background.width, background.height, tempCanvasDisplayX, 0, displayWidth, displayHeight);
        return tempCanvas;
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
            // Once we have the background create a temporary canvas to scale it to the right size
            const tempCanvas = this.generateBackgroundCanvasPattern(background, side);

            context.fillStyle = context.createPattern(tempCanvas, "no-repeat");
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