var Sides;
(function (Sides) {
    Sides[Sides["Left"] = 0] = "Left";
    Sides[Sides["Right"] = 1] = "Right";
})(Sides || (Sides = {}));
var TrapezoidCanvas = /** @class */ (function () {
    function TrapezoidCanvas() {
        var _this = this;
        this.canvas = document.getElementById("trapezoid-canvas");
        this.offsetX = this.canvas.getBoundingClientRect().left;
        this.offsetY = this.canvas.getBoundingClientRect().top;
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
        this.runCanvas = function () {
            _this.canvas.addEventListener("mousemove", function (event) {
                if (typeof _this.leftContext !== "undefined" && typeof _this.rightContext !== "undefined") {
                    var mouseX = event.clientX - _this.offsetX;
                    var mouseY = event.clientY - _this.offsetY;
                    if (_this.leftContext.isPointInPath(mouseX, mouseY)) {
                        console.log("left");
                    }
                    if (_this.rightContext.isPointInPath(mouseX, mouseY)) {
                        console.log("right");
                    }
                }
            });
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
            // Make sure the image will at least cover the side it is on
            var displayWidth = (background.width > tempCanvasDisplayWidth) ? background.width : tempCanvasDisplayWidth;
            var displayHeight = (background.height > _this.canvas.height) ? background.height : _this.canvas.height;
            // If both dimensions of the asset are bigger we need to proportionally shrink it down
            var widthDifference = displayWidth - tempCanvasDisplayWidth;
            var heightDifference = displayHeight - _this.canvas.height;
            if (widthDifference > 0 && heightDifference > 0) {
                var ratioToResize = 1;
                // Figure out in which dimension the asset is larger
                // If the width is larger scale by the height
                // If the height is larger scale by the width
                // So calculate the percentage amount we need to remove from the dimension and convert that to a ratio
                if (widthDifference > heightDifference) {
                    ratioToResize = 1 - (heightDifference / displayHeight);
                }
                else {
                    ratioToResize = 1 - (widthDifference / displayWidth);
                }
                // Resize the asset
                displayWidth *= ratioToResize;
                displayHeight *= ratioToResize;
            }
            // Set where on the canvas it needs to be drawn from (ie left or from the start of the right side)
            var displayXOffset = -((displayWidth - tempCanvasDisplayWidth) / 2);
            var tempCanvasDisplayX = (side == Sides.Left) ? displayXOffset : _this.canvas.width - tempCanvasDisplayWidth + displayXOffset;
            // For the Y we just need to vertically centre the image
            var tempCanvasDisplayY = -((displayHeight - _this.canvas.height) / 2);
            // Draw the image into the canvas
            tempContext.drawImage(background, 0, 0, background.width, background.height, tempCanvasDisplayX, tempCanvasDisplayY, displayWidth, displayHeight);
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
            context.fill();
            if (side == Sides.Left) {
                _this.leftContext = context;
            }
            else {
                _this.rightContext = context;
            }
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
        this.runCanvas();
        window.addEventListener("resize", this.redrawCanvas);
    }
    return TrapezoidCanvas;
}());
new TrapezoidCanvas();
