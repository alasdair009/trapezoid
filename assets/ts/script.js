var Sides;
(function (Sides) {
    Sides[Sides["Left"] = 0] = "Left";
    Sides[Sides["Right"] = 1] = "Right";
})(Sides || (Sides = {}));
var TrapezoidCanvas = /** @class */ (function () {
    function TrapezoidCanvas() {
        var _this = this;
        this.canvas = document.getElementById("trapezoid-canvas");
        this.angle = 20;
        this.tanAngle = Math.tan(this.angle * Math.PI / 180);
        this.backgroundLeft = new Image();
        this.backgroundRight = new Image();
        /**
         * Ensures we have the right amount of canvas pixels and clear any previous
         */
        this.setupCanvas = function () {
            _this.canvas.width = _this.canvas.clientWidth;
            _this.canvas.height = _this.canvas.clientHeight;
            _this.extraWidth = (_this.tanAngle * _this.canvas.height) / 2;
        };
        this.redrawCanvas = function () {
            _this.canvas.getContext("2d").clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.setupCanvas();
            _this.drawCanvas();
        };
        this.drawCanvas = function () {
            _this.drawTrapezoid(Sides.Left);
            _this.drawTrapezoid(Sides.Right);
        };
        /**
         * Setup a background canvas to generate a background pattern for the shape
         * @param background the HTML background image
         * @param side the side one which the background will be drawn
         */
        this.generateBackgroundCanvasPattern = function (background, side) {
            // Create a temporary virtual canvas
            var tempCanvas = document.createElement("canvas");
            tempCanvas.width = _this.canvas.width;
            tempCanvas.height = _this.canvas.height;
            var tempContext = tempCanvas.getContext("2d");
            // Get the width an image would need to cover
            var tempCanvasDisplayWidth = (_this.canvas.width / 2) + _this.extraWidth;
            // Set where on the canvas it needs to be drawn from (ie left or from the start of the right side)
            var tempCanvasDisplayX = (side == Sides.Left) ? 0 : _this.canvas.width - tempCanvasDisplayWidth;
            // Make sure the image will at least cover the side it is on
            var displayWidth = (background.width > tempCanvasDisplayWidth) ? background.width : tempCanvasDisplayWidth;
            var displayHeight = (background.height > _this.canvas.height) ? background.height : _this.canvas.height;
            // Draw the image into the canvas
            tempContext.drawImage(background, 0, 0, background.width, background.height, tempCanvasDisplayX, 0, displayWidth, displayHeight);
            return tempCanvas;
        };
        /**
         * Draw the trapezoid for the given side
         * @param side
         */
        this.drawTrapezoid = function (side) {
            // Setup the canvas context ready for draw
            var context = _this.canvas.getContext("2d");
            // Define the coordinates for the trapezoid
            var topMiddle = (_this.canvas.width / 2) + _this.extraWidth;
            var bottomMiddle = (_this.canvas.width / 2) - _this.extraWidth;
            var xCoordinates = (side == Sides.Left) ? [0, topMiddle, bottomMiddle, 0] : [topMiddle, _this.canvas.width, _this.canvas.width, bottomMiddle];
            var yCoordinates = [0, 0, _this.canvas.height, _this.canvas.height];
            // Get the background image
            var background = (side == Sides.Left) ? _this.backgroundLeft : _this.backgroundRight;
            // Create a temporary canvas to scale it to the right size
            var tempCanvas = _this.generateBackgroundCanvasPattern(background, side);
            context.fillStyle = context.createPattern(tempCanvas, "no-repeat");
            context.beginPath();
            xCoordinates.forEach(function (xCoordinate, index) {
                if (index > 0) {
                    context.lineTo(xCoordinate, yCoordinates[index]);
                }
                else {
                    context.moveTo(xCoordinate, yCoordinates[index]);
                }
            });
            context.closePath();
            context.stroke();
            //context.fillStyle=(side == Sides.Left)? "red" : "blue";
            context.fill();
        };
        this.backgroundLeft.src = "assets/img/landscape1.jpeg";
        this.backgroundRight.src = "assets/img/landscape2.jpeg";
        this.setupCanvas();
        this.backgroundLeft.onload = function () {
            _this.drawTrapezoid(Sides.Left);
        };
        this.backgroundRight.onload = function () {
            _this.drawTrapezoid(Sides.Right);
        };
        window.addEventListener("resize", this.redrawCanvas);
    }
    return TrapezoidCanvas;
}());
new TrapezoidCanvas();
