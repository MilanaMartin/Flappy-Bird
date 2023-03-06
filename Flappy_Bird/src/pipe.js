class Pipe {
    topPipe = new Sprite();
    bottomPipe = new Sprite();
    speed = 0;
    gap = 85;
    moved = true;
    pipes = [];

    startX = 0;

    constructor(config = new Config()) {
        this.startX = config.canvas.width;
        this.gap=config.pipe.gap

        this.topPipe.setImageInRect(config.pipe.top)
        this.bottomPipe.setImageInRect(config.pipe.bottom)

        this.topPipe.setSize(config.pipe.top.h, config.pipe.top.w);
        this.bottomPipe.setSize(config.pipe.top.h, config.pipe.top.w);
    }

    count(){
        return this.pipes.length();
    }

    getPipeInfo(){
        return {
            length: this.pipes.length,
            x: this.pipes[0].x,
            y: this.pipes[0].y + this.topPipe.height,
            w: this.topPipe.width,
            gap: this.gap
        }
    }

    draw(sctx = new CanvasRenderingContext2D()) {
        for (let i = 0; i < this.pipes.length; i++) {
            let p = this.pipes[i];
            p.top.setOutPoint(p.x, p.y)
            p.top.draw(sctx);

            p.bottom.setOutPoint(p.x, 
                this.topPipe.height + this.gap + p.y);
            p.bottom.draw(sctx);
        }
    }

    update(frame = 0, state = "Play") {
        if (state != "Play") return;
        if (frame % 100 == 0) {
            this.pipes.push({
                x: this.startX + 30,
                y: -(this.topPipe.height/2+15) * Math.min(Math.random() + 1, 1.7),
                top: this.topPipe,
                bottom: this.bottomPipe
            });
        }
        this.pipes.forEach((pipe) => {
            pipe.x -= Config.speed;
        });

        if (this.pipes.length && this.pipes[0].x < -this.topPipe.width) {
            this.pipes.shift();
            this.moved = true;
        }
    }

}