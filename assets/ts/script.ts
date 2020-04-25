class TrapezoidCanvas {
    canvas = document.getElementById("trapezoid-canvas") as HTMLCanvasElement;
    canvasWidth = this.canvas.width;
    canvasHeight = this.canvas.height;
    angle = 20;
    extraWidth = (Math.cos(this.angle) * this.canvasHeight) / 2;

    constructor() {
        window.addEventListener("resize", this.drawCanvas);

        this.drawCanvas();
    }

    runCanvas = () => {

    }

    drawCanvas = () => {
        this.drawLeftTrapezoid();
        this.drawRightTrapezoid();
    }

    drawLeftTrapezoid = () => {
        const leftContext = this.canvas.getContext("2d");
        leftContext.beginPath();
        leftContext.lineCap = 'round';
        leftContext.moveTo(0,0);
        leftContext.lineTo((this.canvasWidth / 2) + this.extraWidth,0);
        leftContext.lineTo((this.canvasWidth / 2) - this.extraWidth, this.canvasHeight);
        leftContext.lineTo(0, this.canvasHeight);
        leftContext.closePath();
        leftContext.stroke();
        leftContext.fillStyle="blue";
        leftContext.fill();
    }

    drawRightTrapezoid = () => {
        const rightContext = this.canvas.getContext("2d");
        rightContext.beginPath();
        rightContext.lineCap = 'round';
        rightContext.moveTo(this.canvasWidth,0);
        rightContext.lineTo((this.canvasWidth / 2) + this.extraWidth,0);
        rightContext.lineTo((this.canvasWidth / 2) - this.extraWidth, this.canvasHeight);
        rightContext.lineTo(this.canvasWidth, this.canvasHeight);
        rightContext.closePath();
        rightContext.stroke();
        rightContext.fillStyle="red";
        rightContext.fill();
    }
}

new TrapezoidCanvas();