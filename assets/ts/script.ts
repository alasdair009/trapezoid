class TrapezoidCanvas {
    canvas = document.getElementById("trapezoid-canvas") as HTMLCanvasElement;
    angle = 20;
    tanAngle = Math.tan(this.angle * Math.PI/180);
    extraWidth = 0;

    constructor() {
        // If the screen proportions change we need to redraw the content
        window.addEventListener("resize", this.redrawCanvas);

        this.setupCanvas();
        this.drawCanvas();
        console.log(this);
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
        leftContext.lineTo((this.canvas.width / 2) + this.extraWidth,0);
        leftContext.lineTo((this.canvas.width / 2) - this.extraWidth, this.canvas.height);
        leftContext.lineTo(0, this.canvas.height);
        leftContext.closePath();
        leftContext.stroke();
        leftContext.fillStyle="blue";
        leftContext.fill();
    }

    drawRightTrapezoid = () => {
        const rightContext = this.canvas.getContext("2d");
        rightContext.beginPath();
        rightContext.lineCap = 'round';
        rightContext.moveTo(this.canvas.width,0);
        rightContext.lineTo((this.canvas.width / 2) + this.extraWidth,0);
        rightContext.lineTo((this.canvas.width / 2) - this.extraWidth, this.canvas.height);
        rightContext.lineTo(this.canvas.width, this.canvas.height);
        rightContext.closePath();
        rightContext.stroke();
        rightContext.fillStyle="red";
        rightContext.fill();
    }
}

new TrapezoidCanvas();