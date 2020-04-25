enum Sides {
    Left,
    Right
}

class TrapezoidCanvas {
    canvas = document.getElementById("trapezoid-canvas") as HTMLCanvasElement;
    angle = 20;
    tanAngle = Math.tan(this.angle * Math.PI/180);
    extraWidth: number;
    backgroundLeft = new Image();
    backgroundRight = new Image();

    constructor() {
        this.backgroundLeft.src = "assets/img/landscape1.jpeg";
        this.backgroundRight.src = "assets/img/landscape2.jpeg";

        this.setupCanvas();

        this.backgroundLeft.onload = () => {
            this.drawTrapezoid(Sides.Left);
        }

        this.backgroundRight.onload = () => {
            this.drawTrapezoid(Sides.Right);
        }

        window.addEventListener("resize", this.redrawCanvas);
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

        // Make sure the image will at least cover the side it is on
        const displayWidth = (background.width > tempCanvasDisplayWidth)? background.width : tempCanvasDisplayWidth;
        const displayHeight = (background.height > this.canvas.height)? background.height : this.canvas.height;

        // Set where on the canvas it needs to be drawn from (ie left or from the start of the right side)
        const displayXOffset = -((displayWidth - tempCanvasDisplayWidth) / 2)
        const tempCanvasDisplayX = (side == Sides.Left)? displayXOffset : this.canvas.width - tempCanvasDisplayWidth + displayXOffset;
        // For the Y we just need to vertically centre the image
        const tempCanvasDisplayY = -((displayHeight - this.canvas.height) / 2);

            // Draw the image into the canvas
        tempContext.drawImage(background, 0, 0, background.width, background.height, tempCanvasDisplayX, tempCanvasDisplayY, displayWidth, displayHeight);
        return tempCanvas;
    }

    /**
     * Draw the trapezoid for the given side
     * @param side
     */
    drawTrapezoid = (side: Sides) => {
        // Setup the canvas context ready for draw
        const context = this.canvas.getContext("2d");

        // Define the coordinates for the trapezoid
        const topMiddle = (this.canvas.width / 2) + this.extraWidth;
        const bottomMiddle = (this.canvas.width / 2) - this.extraWidth;
        const xCoordinates = (side == Sides.Left)? [0, topMiddle, bottomMiddle, 0] : [topMiddle, this.canvas.width, this.canvas.width, bottomMiddle];
        const yCoordinates = [0, 0, this.canvas.height, this.canvas.height];

        // Get the background image
        const background = (side == Sides.Left)? this.backgroundLeft : this.backgroundRight;

        // Create a temporary canvas to scale it to the right size
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
        context.fill();
    }
}

new TrapezoidCanvas();