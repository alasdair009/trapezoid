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
        this.generateBackgroundCanvasPattern = function (background, side) {
            var tempCanvas = document.createElement("canvas");
            var tempContext = tempCanvas.getContext("2d");
            var tempCanvasDisplayX = (side == Sides.Left) ? 0 : (_this.canvas.width / 2) - _this.extraWidth;
            tempCanvas.width = _this.canvas.width;
            tempCanvas.height = _this.canvas.height;
            tempContext.drawImage(background, 0, 0, background.width, background.height, tempCanvasDisplayX, 0, _this.canvas.width, _this.canvas.height);
            return tempCanvas;
        };
        this.drawTrapezoid = function (side) {
            var context = _this.canvas.getContext("2d");
            var topMiddle = (_this.canvas.width / 2) + _this.extraWidth;
            var bottomMiddle = (_this.canvas.width / 2) - _this.extraWidth;
            var xCoordinates = (side == Sides.Left) ? [0, topMiddle, bottomMiddle, 0] : [topMiddle, _this.canvas.width, _this.canvas.width, bottomMiddle];
            var yCoordinates = [0, 0, _this.canvas.height, _this.canvas.height];
            var background = new Image();
            background.src = (side == Sides.Left) ? "assets/img/landscape1.jpeg" : "assets/img/landscape2.jpeg";
            background.onload = function () {
                // Once we have the background create a temporary canvas to scale it to the right size
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
        };
        // If the screen proportions change we need to redraw the content
        window.addEventListener("resize", this.redrawCanvas);
        this.setupCanvas();
        this.drawCanvas();
    }
    return TrapezoidCanvas;
}());
new TrapezoidCanvas();
