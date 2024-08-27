// @ts-check
(() => {
  class Sketch {
    #uid;
    #width = 0;
    #height = 0;
    #canvas;
    ctx;
    #fillColour = "#ff0";
    #strokeColour = "#00f";
    #gridColour = "#00000099";
    #gridSpacing = 12;
    #gridDotSize = 2;
    #aspectRatio = 0.75;

    #elements = [];

    constructor() {
      const rndId = Math.random().toString(32).substring(5);
      this.#uid = `sketch_${rndId}`;
      this.#canvas = document.createElement("canvas");
      this.#canvas.classList.add("demo");
      this.#canvas.setAttribute("id", this.#uid);

      this.ctx = this.#canvas.getContext("2d");
      if (!this.ctx) {
        console.error("Missing context");
        return;
      }

      this.ctx.strokeStyle = "#00f";
      this.ctx.lineWidth = 2;

      this.injectElementIntoPage(this.#canvas);
      this.updateDimensions();
      this.setupCanvas();
    }

    setupCanvas = () => {
      this.#canvas.setAttribute("width", this.#width.toString());
      this.#canvas.setAttribute("height", this.#height.toString());
    };

    /**
     * @returns {void}
     */
    updateDimensions = () => {
      const dimensions = this.#canvas.parentElement?.getBoundingClientRect();
      if (dimensions) {
        const { width } = dimensions;
        this.#width = width;
        this.#height = width * this.#aspectRatio;
      }
    };

    drawGrid = () => {
      if (!this.ctx) return;

      for (let rowIndex = 0; rowIndex < this.#width; rowIndex++) {
        for (let columnIndex = 0; columnIndex < this.#height; columnIndex++) {
          if (rowIndex % this.#gridSpacing === 0) {
            if (columnIndex % this.#gridSpacing === 0) {
              this.ctx.fillStyle = this.#gridColour;
              this.ctx.fillRect(
                rowIndex,
                columnIndex,
                this.#gridDotSize,
                this.#gridDotSize
              );
            }
          }
        }
      }
    };

    /**
     *
     * @param {Element} element Element to inject into DOM
     * @returns {void}
     */
    injectElementIntoPage = (element) => {
      const randomId = Math.random().toString(32).substring(5);
      const wrapperId = `temp_${randomId}`;
      document.write(`<div class="temp" id="${wrapperId}"></div>`);
      const tempElement = document.getElementById(wrapperId);
      if (!tempElement) {
        return console.error("Missing demo wrapper DOM element");
      }

      tempElement.parentNode?.replaceChild(element, tempElement);
    };

    draw = () => {
      if (!this.ctx) return;

      for (const element of this.#elements) {
        element.update(this.#width, this.#height);
        element.draw(this.#width, this.#height);
      }

      this.ctx.beginPath();
      this.ctx.moveTo(this.#width / 2, 0);
      this.ctx.lineTo(this.#width, this.#height / 2);
      this.ctx.lineTo(this.#width / 2, this.#height / 2);
      this.ctx.lineTo(this.#width / 2, 0);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.ellipse(200, 200, 100, 100, 0, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.stroke();
    };

    addElement = (el) => {
      this.#elements.push(el);
    };
  }

  class Element {
    sketchWidth;
    sketchHeight;
    x;
    y;
    strokeStyle = "#0ff";
    fillStyle = "#f00";
    xSpeed = 0;

    ySpeed = 0;
    ctx;

    constructor({ ctx, draw }) {
      this.ctx = ctx;
      this.draw = draw;
    }

    update = (sketchWidth, sketchHeight) => {
      this.sketchWidth = sketchWidth;
      this.sketchHeight = sketchHeight;
    };
  }

  const sketch = new Sketch();
  const circle = new Element({
    ctx: sketch.ctx,
    draw(sketchWidth, sketchHeight) {
      this.ctx.beginPath();
      this.ctx.ellipse(
        sketchWidth / 2,
        sketchHeight / 2,
        100,
        100,
        0,
        0,
        Math.PI * 2
      );
      this.ctx.closePath();
      this.ctx.stroke();
    },
  });

  sketch.addElement(circle);

  sketch.draw();
})();
