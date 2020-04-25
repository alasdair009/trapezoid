var TrapezoidCanvas = /** @class */ (function () {
    function TrapezoidCanvas() {
        var _this = this;
        this.canvas = document.getElementById("trapezoid-canvas");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.angle = 20;
        this.extraWidth = (Math.cos(this.angle) * this.canvasHeight) / 2;
        this.runCanvas = function () {
        };
        this.drawCanvas = function () {
            _this.drawLeftTrapezoid();
            _this.drawRightTrapezoid();
        };
        this.drawLeftTrapezoid = function () {
            var leftContext = _this.canvas.getContext("2d");
            leftContext.beginPath();
            leftContext.lineCap = 'round';
            leftContext.moveTo(0, 0);
            leftContext.lineTo((_this.canvasWidth / 2) + _this.extraWidth, 0);
            leftContext.lineTo((_this.canvasWidth / 2) - _this.extraWidth, _this.canvasHeight);
            leftContext.lineTo(0, _this.canvasHeight);
            leftContext.closePath();
            leftContext.stroke();
            leftContext.fillStyle = "blue";
            leftContext.fill();
        };
        this.drawRightTrapezoid = function () {
            var rightContext = _this.canvas.getContext("2d");
            rightContext.beginPath();
            rightContext.lineCap = 'round';
            rightContext.moveTo(_this.canvasWidth, 0);
            rightContext.lineTo((_this.canvasWidth / 2) + _this.extraWidth, 0);
            rightContext.lineTo((_this.canvasWidth / 2) - _this.extraWidth, _this.canvasHeight);
            rightContext.lineTo(_this.canvasWidth, _this.canvasHeight);
            rightContext.closePath();
            rightContext.stroke();
            rightContext.fillStyle = "red";
            rightContext.fill();
        };
        window.addEventListener("resize", this.drawCanvas);
        this.drawCanvas();
    }
    return TrapezoidCanvas;
}());
new TrapezoidCanvas();
