enum Sides {
    Left,
    Right
}

/**
 * A basic class for initialising two trapezoids tessellating with each other
 */
class TrapezoidCanvas {
    // Mouse position
    mPos = {
        x: 0,
        y: 0
    }

    canvas = document.getElementById("trapezoid-canvas") as HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    offsetX = this.canvas.getBoundingClientRect().left;
    offsetY = this.canvas.getBoundingClientRect().top;
    
    pathLeft;
    pathRight;
    backgroundLeft = new Image();
    backgroundRight = new Image();

    constructor() {
        this.backgroundLeft.src = "assets/img/landscape1.jpeg";
        this.backgroundRight.src = "assets/img/landscape2.jpeg";

        // Set up mouse listener on canvas
        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            this.mPos.x = e.clientX;
            this.mPos.y = e.clientY;
        });

        // Call the draw for the first time
        this.draw();
    }


    /**
     * We want animation at 60fps, so we set up one draw method that handles:
     *  - clearing
     *  - redrawing
     *  - resizing
     * Then calls request animation frame
     */
    draw = () =>  {
        this.context = this.canvas.getContext("2d");

        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawTrapezoids();

        this.context.fillStyle = 'rgba(21,21,21,0.5)';

        // hover left
        if (this.context.isPointInPath(this.pathLeft, this.mPos.x, this.mPos.y)) {
            this.context.fill(this.pathLeft);
        }

        // hover right
        if (this.context.isPointInPath(this.pathRight, this.mPos.x, this.mPos.y)) {
            this.context.fill(this.pathRight);
        }

        window.requestAnimationFrame(this.draw);
    }

    /**
     * Draw the trapezoids
     * 
     * This currently splits the frame at two fifths and three fiths
     *  - the ratios will remian the same on resize, but the angle will change
     * 
     * This behaviour could be reversed, you'd just change the maths behind the 
     * path.lineTo() calls
     */
    drawTrapezoids = () => {
        const threeFifths = (this.canvas.width / 5) * 3;
        const twoFifths = (this.canvas.width / 5) * 2;

        // Define the path of the left shape
        this.pathLeft = new Path2D(); // New path each frame in case of resize
        this.pathLeft.lineTo(threeFifths, 0);
        this.pathLeft.lineTo(twoFifths, this.canvas.height);
        this.pathLeft.lineTo(0, this.canvas.height);
        this.pathLeft.lineTo(0, 0);
        this.pathLeft.closePath();

        // Save the normal context clip (none), clip to the path, draw the image, then restore the normal context clip
        this.context.save();
        this.context.clip(this.pathLeft);
        this.context.drawImage(this.backgroundLeft, 0, 0); // Here we could calculate sx, sy values from the mouse position see: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        this.context.restore();

        // Define the path of the right shape
        this.pathRight = new Path2D(); // New path each frame in case of resize
        this.pathRight.moveTo(threeFifths, 0);
        this.pathRight.lineTo(this.canvas.width, 0);
        this.pathRight.lineTo(this.canvas.width, this.canvas.height);
        this.pathRight.lineTo(twoFifths, this.canvas.height);
        this.pathRight.lineTo(threeFifths, 0);
        this.pathRight.closePath();

        // Save the normal context clip (none), clip to the path, draw the image, then restore the normal context clip
        this.context.save();
        this.context.clip(this.pathRight);
        this.context.drawImage(this.backgroundRight, 0, 0); // Here we could calculate sx, sy values from the mouse position see: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        this.context.restore();
    }
}

new TrapezoidCanvas();