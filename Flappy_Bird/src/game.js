class Game {
	static isAudioPlayed = false;
	state="Ready";
	frame = 0;

	constructor() {
		this._config = new Config();

		this.boardCvs = document.getElementById(this._config.canvas.id);
		this.context = this.boardCvs.getContext('2d');

		this._env = new GameEnvironment(this._config);
		this._bird = new Bird(this._config);

		this._inputHandler = new MouseInputHandler({
			eventHandlerMap: {
				left: ({
					x,
					y
				}) => {
					this._bird.flap();
				}
			}
		})
	}

	update() {
		this._env.update(this.frame, this.state);
		let pipe = this._env.getipeInfo();
		this._bird.update(this.frame, this.state, pipe);
	}

	draw() {
		
		this._env.draw(this.context)
		this._bird.draw(this.context)
	}

	_loop() {
		this.update();
		this.draw();

		this.frame++;
	}

	start() {
		setInterval(this._loop(), 20);
	}

	gameOver() {
		alert('Game over: ${this._score}')
	}

}

const game = new Game();
game.start();