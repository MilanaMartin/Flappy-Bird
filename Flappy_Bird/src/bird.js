class Bird {
    rotatation = 0;
    thrust = 3.6;
    frame = 0;

    flapAudio = new Audio();
    hitAudio = new Audio();
    dieAudio = new Audio();
    scoreAudio = new Audio();

    constructor(config = new Config()) {
        let birdConfig = config.bird;
        this.animations = [];

        this.hitAudio.src = config.audio.hit;
        this.flapAudio.src = config.audio.flap;
        this.dieAudio.src = config.audio.die;
        this.scoreAudio.src = config.audio.score;

        for (let i = 0; i < birdConfig.frames.length; i++) {
            let frame = birdConfig.frames[i];
            this.animations.push({
                x: frame.x,
                y: frame.y
            });
        }
        this.x = 50;
        this.y = 100;
        this.sprite = new Sprite();
        this.sprite.setSize(birdConfig.height, birdConfig.width);
        this.sprite.setImageInRect({
            x: this.animations[0].x,
            y: this.animations[0].y,
            h: birdConfig.height,
            w: birdConfig.width
        });
        this.sprite.setOutPoint(this.x, this.y);
        this.sprite.needRotate = true;

        this.flapSpeed = birdConfig.flapSpeed;
        this.width = birdConfig.width;
        this.height = birdConfig.height;
        this.gravity = config.gravity;
    }

    draw(sctx) {
        this.sprite.setImageInPoint(this.animations[this.frame]);
        this.sprite.setOutPoint(this.x, this.y);
        this.sprite.setRotation(this.rotatation);
        this.sprite.draw(sctx);
    }

    update(gameFrames = 0, state = "Play", pipe = {}) {
        let r = parseFloat(this.width) / 2;
        switch (state) {
            case "Ready":
                this.rotatation = 0;
                this.y += gameFrames % 10 == 0 ? Math.sin(gameFrames * RAD) : 0;
                this.frame += gameFrames % 10 == 0 ? 1 : 0;
                break;
            case "Play":
                this.frame += gameFrames % 5 == 0 ? 1 : 0;
                if (this.y >= Config.getGroundHeight() - this.sprite.height * 2 && this.flapSpeed > 0) {
                    break;
                }
                this.y += this.flapSpeed;
                this.setRotation();
                this.flapSpeed += this.gravity;
                if (this.y >= Config.getGroundHeight() || this.collisioned(pipe)) {
                    state = "GameOver";
                }
                break;

            case "GameOver":
                this.frame = 1;
                if (this.y + r < gnd.y) {
                    this.y += this.flapSpeed;
                    this.setRotation();
                    this.flapSpeed += this.gravity * 2;
                } else {
                    this.flapSpeed = 0;
                    this.y = gnd.y - r;
                    this.rotatation = 90;
                    if (!Game.isAudioPlayed) {
                        //this.dieAudio.play();
                        Game.isAudioPlayed=true;
                    }
                }
                break;
        }
        this.frame = this.frame % this.animations.length;
    }

    flap() {
        if (this.y > 0) {
            //this.flapAudio.play();
            this.flapSpeed = -this.thrust;
        }
    }
    setRotation() {
        if (this.flapSpeed <= 0) {
            this.rotatation = Math.max(-25, (-25 * this.flapSpeed) / (-1 * this.thrust));
        } else if (this.flapSpeed > 0) {
            this.rotatation = Math.min(90, (90 * this.flapSpeed) / (this.thrust * 2));
        }
    }

    collisioned(pipe = {}) {
        if (!pipe.length) return;

        let bh = this.height / 2;
        let bw = this.width / 2;

        let x = pipe.x;

        let roof = pipe.y;
        let floor = roof + pipe.gap;
        let w = pipe.w;

        if (this.x + bw >= x) {
            if (this.x + bw < x + w) {
                if (this.y + bh <= roof || this.y + bh >= floor) {
                    //this.hitAudio.play();
                    //TODO: временное решение для удара о трубу
                    Config.speed=0;
                    return true;
                }
            }
            //TODO: Перенести в проверку игры на коллизии
            if (pipe.moved) {
                
                Game.score.update();
                //this.scoreAudio.play();
            }
            return false;
        }
    }
};