class GameEnvironment {
    background = new Sprite();
    canvas = {
        h: 0,
        w: 0
    };

    constructor(config = new Config()) {
        this.bottom = new Bottom(config);
        this.canvas.h = config.canvas.height;
        this.canvas.w = config.canvas.width;

        this.background.setImageInRect(config.background);
        this.background.setSize(Config.getGroundHeight(), config.canvas.width);

        this.pipe = new Pipe(config);
    }

    getPipeInfo(){
        return this.pipe.getPipeInfo();
    }

    update(frame = 0, state = "Play") {
        this.pipe.update(frame, state);
    }

    draw(sctx = {}) {
        sctx.fillStyle = "rgb(48,192,223)";
        sctx.fillRect(0, 0, this.canvas.w, this.canvas.h);
        this.background.draw(sctx);
        this.pipe.draw(sctx);
        this.bottom.draw(sctx);
    }
}