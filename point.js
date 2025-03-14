export class point {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(point) {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  subtract(point) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  reduce(value) {
    this.x *= value.x;
    this.y *= value.y;
    return this;
  }

  collide(point, width, height) {
    if (
      this.x >= point.x &&
      this.x <= point.x + width &&
      this.y >= point.y &&
      this.y <= point.y + height
    ) {
        return true;
      } else {
        return false;
      }
    }

  clone() {
    return new point(this.x, this.y);
  }
}