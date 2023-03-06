let config = new Config();
let bird = new Bird(config);
let env = new GameEnvironment(config);

let boardCvs = document.getElementById('game');
let context = boardCvs.getContext('2d');

boardCvs.tabIndex = 1;
boardCvs.addEventListener("click", () => {
      bird.flap();
}
);

boardCvs.onkeydown = function keyDown(e) {
  if (e.keyCode == 32 || e.keyCode == 87 || e.keyCode == 38) {
        bird.flap();
  }
};

let frame = 0;
function gameLoop() {
    env.update(frame, "Play");
    let pipe = env.getPipeInfo();
    bird.update(frame, "Play", pipe);

    
    env.draw(context);
    bird.draw(context);
    frame++;
  }

setInterval(gameLoop, 20);