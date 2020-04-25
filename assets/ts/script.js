var TrapezoidCanvas = /** @class */ (function () {
    function TrapezoidCanvas() {
        var _this = this;
        this.canvas = document.getElementById("trapezoid-canvas");
        this.angle = 20;
        this.tanAngle = Math.tan(this.angle * Math.PI / 180);
        this.extraWidth = 0;
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
            leftContext.lineTo((_this.canvas.width / 2) + _this.extraWidth, 0);
            leftContext.lineTo((_this.canvas.width / 2) - _this.extraWidth, _this.canvas.height);
            leftContext.lineTo(0, _this.canvas.height);
            leftContext.closePath();
            leftContext.stroke();
            leftContext.fillStyle = "blue";
            leftContext.fill();
        };
        this.drawRightTrapezoid = function () {
            var rightContext = _this.canvas.getContext("2d");
            rightContext.beginPath();
            rightContext.lineCap = 'round';
            rightContext.moveTo(_this.canvas.width, 0);
            rightContext.lineTo((_this.canvas.width / 2) + _this.extraWidth, 0);
            rightContext.lineTo((_this.canvas.width / 2) - _this.extraWidth, _this.canvas.height);
            rightContext.lineTo(_this.canvas.width, _this.canvas.height);
            rightContext.closePath();
            rightContext.stroke();
            rightContext.fillStyle = "red";
            rightContext.fill();
        };
        // If the screen proportions change we need to redraw the content
        window.addEventListener("resize", this.redrawCanvas);
        this.setupCanvas();
        this.drawCanvas();
        console.log(this);
    }
    return TrapezoidCanvas;
}());
new TrapezoidCanvas();
