class Config{
	constructor(){
		let game = document.getElementById(this.canvas.id);
		game.height = this.canvas.height;
		game.width = this.canvas.width;
		Sprite.setImage(this.spritesheet.src);

		Config.#groundHeight = this.canvas.height - this.bottom.h;
	}
	gravity = 0.120 

	static speed = 3
	
	setSpeed(newSpeed=1){
		Config.speed = newSpeed;
	}

	canvas = {
		id: 'game',
		height: 400, 
		width: 300,

	}

	spritesheet = {
		width: 606,
		height: 428, 
		src: 'assets/spritesheet.png',
	}

	audio = {
		start: "",
		flap: "",
		score: "",
		hit: "",
		die: ""
	}

	bird = {
		x: 50, 
		y: 100,
		width: 34,
		height: 26,  

		flapSpeed: 1, 

		frames: [
		{
			x: 276,
			y: 112 
		},
		{
			x: 276,
			y: 139  
		},
		{
			x: 276,
			y: 164  
		},
		{
			x: 276,
			y: 139  
		}
		]
	}

	pipe = {
		gap:80,
		bottom:{
			x:502,
			y:0,
			h:400,
			w:52
		},
		top:{
			x:554,
			y:0,
			h:400,
			w:52
		}
	}

	background = {
		x:0,
		y:0,
		w: 275,
		h: 227
	}

	bottom = {
		x:276,
		y:0,
		w: 224,
		h: 112
	}

	static #groundHeight = 0;
	static getGroundHeight () {
		return Config.#groundHeight;
	}
}