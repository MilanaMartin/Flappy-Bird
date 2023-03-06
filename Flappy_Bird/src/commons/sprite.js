const RAD = Math.PI / 180;

class Sprite {
    static #image = new Image();
    static setImage(path = "") {
        Sprite.#image.src = path;
    }

    needRotate = false;
    rotatation = 0

    constructor() {
        this.height = 0;
        this.width = 0;
        this.x = 0;
        this.y = 0;

        this.imageInRect = {
            x: 0,
            y: 0,
            h: 0,
            w: 0
        };
    }

    setSize(height=0, width=0) {
        this.height = height;
        this.width = width;
    }

    setImageInPoint(point={x:0,y:0}){
        this.imageInRect.x = point.x;
        this.imageInRect.y = point.y;
    }

    setImageInRect(rect={x:0, y:0, h:0, w:0}) {
        this.imageInRect = rect;
    }

    setOutPoint(dx=0, dy=0) {
        this.x = dx;
        this.y = dy;
    }

    setRotation(rotatation = -1) {
        this.rotatation = rotatation;
    }

    draw(sctx = {}) {
        let drawF = () => {
            sctx.save();
            let x = this.x;
            let y = this.y;
            if (this.needRotate) {
                sctx.translate(this.x, this.y+this.height/2);
                sctx.rotate(this.rotatation * RAD);
                x=0;
                y=0;
            }

            sctx.drawImage(Sprite.#image,
                this.imageInRect.x,
                this.imageInRect.y,
                this.imageInRect.w,
                this.imageInRect.h,

                x,
                y,
                this.width,
                this.height,
            );
            sctx.restore();
        }
        if (Sprite.#image.complete) {
            drawF();
        } else {
            Sprite.#image.onload = drawF;
        }
    }
}