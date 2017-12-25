class CanvasSketch {
  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    const {x, y} = canvasElement.getBoundingClientRect();
    this.canvasStartPosition = {x, y};
    this.startPoint = {x: 0, y: 0};
    this.currentPoint = {x: 0, y: 0};
    this.isDrawing = false;
  }
  startDraw() {
    this.isDrawing = true;
  }
  stopDraw() {
    this.isDrawing = false;
  }
  setStartPoint(mouseEventPageX, mouseEventPageY) {
    this.startPoint = {
      x: mouseEventPageX - this.canvasStartPosition.x,
      y: mouseEventPageY - this.canvasStartPosition.y,
    };
  }
  setCurrentPoint(mouseEventPageX, mouseEventPageY) {
    this.currentPoint = {
      x: mouseEventPageX - this.canvasStartPosition.x,
      y: mouseEventPageY - this.canvasStartPosition.y,
    };
  }
  drawLine() {
    const {ctx, startPoint, currentPoint} = this;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();
  }
  switchCurrentPointToStartPoint() {
    this.startPoint = this.currentPoint;
  }
  changeSetting(key, value) {
    this.ctx[key] = value;
  }
  eraseAll() {
    const {ctx, canvasElement} = this;
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  }
}

const canvas = document.querySelector('#my-canvas');
const canvasSketch = new CanvasSketch(canvas);

canvas.addEventListener(
  'mousedown',
  e => {
    canvasSketch.startDraw();
    canvasSketch.setStartPoint(e.pageX, e.pageY);
  },
  false
);

canvas.addEventListener(
  'mousemove',
  e => {
    if (!canvasSketch.isDrawing) return;
    canvasSketch.setCurrentPoint(e.pageX, e.pageY);
    canvasSketch.drawLine();
    canvasSketch.switchCurrentPointToStartPoint();
  },
  false
);

canvas.addEventListener(
  'mouseup',
  () => {
    canvasSketch.stopDraw();
  },
  false
);

canvas.addEventListener(
  'mouseleave',
  () => {
    canvasSketch.stopDraw();
  },
  false
);

document.querySelector('#penColor').addEventListener(
  'change',
  e => {
    const {options} = e.target;
    canvasSketch.changeSetting(
      'strokeStyle',
      options[options.selectedIndex].value
    );
  },
  false
);

document.querySelector('#penWidth').addEventListener(
  'change',
  e => {
    const {options} = e.target;
    canvasSketch.changeSetting(
      'lineWidth',
      options[options.selectedIndex].value
    );
  },
  false
);

document.querySelector('#erase').addEventListener(
  'click',
  () => {
    canvasSketch.eraseAll();
  },
  false
);
