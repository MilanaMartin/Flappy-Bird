class DrawEngine {
	drawImage(drawImage({ spriteSheet, image, x, y, width, height }) {}
	clear(){}
}

class CanvasDrawEngine extends DrawEngine {
	construstor({canvas}){
		super()
		this._canvas = canvas
	}

	drawImage({ spriteSheet, image, x, y, width, height })
	super.drawEngine ({spriteSheet, image, x, y, width, height}: {spriteSheet, image, x, y, width, height})
	this._canvas.drawImage(spriteSheet, image.x, image.y, image.w, image.h, x, y, width, height)
}

clear () {
	super.clear ()
	this._canvas.clearRect(x: 0, y: 0, this._canvas.width, this._canvas,height)
}
}