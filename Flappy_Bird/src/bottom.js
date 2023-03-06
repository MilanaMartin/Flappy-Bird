class Bottom extends MoveObject{
    animation = new Sprite();

    constructor(config = new Config()){
        super();
        let bottomConf = config.bottom;

        this.animation.setSize(bottomConf.h, config.canvas.width+bottomConf.w);
        this.canvasWidth = config.canvas.width;

        this.animation.setImageInRect( bottomConf );
        
        this.animation.setOutPoint(0,
            config.canvas.height-this.animation.height
            );
    }

    update() {
        this.animation.x -= this.dx();
        this.animation.x = this.animation.x % (this.canvasWidth / 2);
      }

    draw(context={}){
        this.animation.draw(context);
    }
}