var Sides;
(function (Sides) {
    Sides[Sides["Left"] = 0] = "Left";
    Sides[Sides["Right"] = 1] = "Right";
})(Sides || (Sides = {}));
/**
 * A basic class for initialising two trapezoids tessellating with each other
 */
var TrapezoidCanvas = /** @class */ (function () {
    function TrapezoidCanvas() {
        var _this = this;
        // Mouse position
        this.mPos = {
            x: 0,
            y: 0
        };
        this.canvas = document.getElementById("trapezoid-canvas");
        this.offsetX = this.canvas.getBoundingClientRect().left;
        this.offsetY = this.canvas.getBoundingClientRect().top;
        this.backgroundLeft = new Image();
        this.backgroundRight = new Image();
        /**
         * We want animation at 60fps, so we set up one draw method that handles:
         *  - clearing
         *  - redrawing
         *  - resizing
         * Then calls request animation frame
         */
        this.draw = function () {
            _this.context = _this.canvas.getContext("2d");
            _this.canvas.width = _this.canvas.clientWidth;
            _this.canvas.height = _this.canvas.clientHeight;
            _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.drawTrapezoids();
            _this.context.fillStyle = 'rgba(21,21,21,0.5)';
            // hover left
            if (_this.context.isPointInPath(_this.pathLeft, _this.mPos.x, _this.mPos.y)) {
                _this.context.fill(_this.pathLeft);
            }
            // hover right
            if (_this.context.isPointInPath(_this.pathRight, _this.mPos.x, _this.mPos.y)) {
                _this.context.fill(_this.pathRight);
            }
            window.requestAnimationFrame(_this.draw);
        };
        /**
         * Draw the trapezoids
         *
         * This currently splits the frame at two fifths and three fiths
         *  - the ratios will remian the same on resize, but the angle will change
         *
         * This behaviour could be reversed, you'd just change the maths behind the
         * path.lineTo() calls
         */
        this.drawTrapezoids = function () {
            var threeFifths = (_this.canvas.width / 5) * 3;
            var twoFifths = (_this.canvas.width / 5) * 2;
            // Define the path of the left shape
            _this.pathLeft = new Path2D(); // New path each frame in case of resize
            _this.pathLeft.lineTo(threeFifths, 0);
            _this.pathLeft.lineTo(twoFifths, _this.canvas.height);
            _this.pathLeft.lineTo(0, _this.canvas.height);
            _this.pathLeft.lineTo(0, 0);
            _this.pathLeft.closePath();
            // Save the normal context clip (none), clip to the path, draw the image, then restore the normal context clip
            _this.context.save();
            _this.context.clip(_this.pathLeft);
            _this.context.drawImage(_this.backgroundLeft, 0, 0); // Here we could calculate sx, sy values from the mouse position see: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
            _this.context.restore();
            // Define the path of the right shape
            _this.pathRight = new Path2D(); // New path each frame in case of resize
            _this.pathRight.moveTo(threeFifths, 0);
            _this.pathRight.lineTo(_this.canvas.width, 0);
            _this.pathRight.lineTo(_this.canvas.width, _this.canvas.height);
            _this.pathRight.lineTo(twoFifths, _this.canvas.height);
            _this.pathRight.lineTo(threeFifths, 0);
            _this.pathRight.closePath();
            // Save the normal context clip (none), clip to the path, draw the image, then restore the normal context clip
            _this.context.save();
            _this.context.clip(_this.pathRight);
            _this.context.drawImage(_this.backgroundRight, 0, 0); // Here we could calculate sx, sy values from the mouse position see: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
            _this.context.restore();
        };
        this.backgroundLeft.src = "assets/img/landscape1.jpeg";
        this.backgroundRight.src = "assets/img/landscape2.jpeg";
        // Set up mouse listener on canvas
        this.canvas.addEventListener('mousemove', function (e) {
            _this.mPos.x = e.clientX;
            _this.mPos.y = e.clientY;
        });
        // Call the draw for the first time
        this.draw();
    }
    return TrapezoidCanvas;
}());
new TrapezoidCanvas();
