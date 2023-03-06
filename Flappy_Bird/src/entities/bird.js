class Bird extends Entity{
	construstor(params){
		super(params)
	const {frames, spriteSheet, flapSpeed, physicsEngine, drawEngine, game } = params
	
	this._flapSpeed = params.flapSpeed
	this._physicsEngine = params.physicsEngine
	this.falling = true
	}

	update(delta) {
		super.update(delta)

		this._physicsEngine.update(this, delta)

		if(this.y <0) {
			this.y =0
		}

		if(this.y + this.height >= this._game.height) {
			this._game.gameOver()
		}

	}
	flap() {
		this.speed = -this._flapSpeed
	}
}

/flapSpeed - насколько высоко птичка подлетает
physicsEngine - обрабатывает логику физики 
drawEngine - чтобы птичка отображалась на любом движке
game - объект экрана 
flap - метод, который подбрасывает птичку, выставляет скорость птички наверх, равную flapSpeed  
update -  метод обновления, который обновляет данные птички 
дальше идет проверка if, чтобы птичка не улетала за пределы экрана/
