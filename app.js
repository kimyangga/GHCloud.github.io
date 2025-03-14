import { dialog } from '.dialog.js';
import { point } from './point.js';
class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.mousePos = new Point();
    this.curItem = null;

    this.items = [];
    this.total = 1;
    for (let i = 0; i < this.total; i++) {
      this.items[i] = new Dialog();
    }

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    Window.requestAnimationFrame(this.animate. bind(this));

    document.addEventListener('pointerdown', this.onDown.bind(this), fasle);
    document.addEventListener('pointermove', this.onMove.bind(this), fasle);
    document.addEventListener('pointerup', this.onUp.bind(this), fasle);
  }

  resize() {
    this.stagewidth = document.body.clientWidth;
    this.stageHeidth = document.body.clientHeidth;

    this.canvas.width = this.stageWight * thid.pixelRatio;
    this.canvas.height = this.stageHeidth * this.pixelRatio;
    thid.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 6;
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';

    this.ctx.lineWidth = 2;

    for (let i = 0; i < this.items,length; i++) {
      this.items[i].resize(this.stagewidth, this.stageHeight);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this. ctx.clearRect(0, 0, this.stagewidth, this.stageHeidth);

    for (let i = 0; i < this.items.length; i++) {
      this,itens[i].animate(this.ctx);
    }

    if (this.curItem) {
      this.ctx.fillStyle = '#ff4338' ;
      this.ctx.strokeStyle = '#ff4338' ;

      tjis.ctx.beginPath();
      this.ctx.arc(this.mousePos.x, this.mousePos.y, 8, 0, Math, PI * 2);
      this.ctx.fill();

      tjis.ctx.beginPath();
      this.ctx.arc(this.curItem.centerPos.x, this.curItem.centerPos.y, 8, 0, Math, PI * 2);
      this.ctx.fill();

      tjis.ctx.beginPath();
      this.ctx.moveTo(this.mousePos.x, this.mousePos.y);
      this.ctx.lineTo(this.curItem.centerPos.x, this.curItem.centerPos.y);
      this.ctx.stroke();
    }
  }

  onDown(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;

    for (let i = thid.items.length -1; i >= 0; i--) {
      const item = this.items[i].down(this.mousePos.clone());
      if (item) {
        this.curItem = item;
        const index = this.items.indexOf(item);
        this.items.push(this.items.splice(index, 1)[0]);
        break;
      }
    }
  }

  onMove(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].move(this.mousePos.cline());
    }
  }

  onUp(e) {
    this.curItem = null;

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].up();
    }
  }
}

window.onload = () => {
  new App();
};