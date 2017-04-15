var canvas = document.getElementById("canvas");
var player = new Player(canvas.width / 2, canvas.height - 50),
	canvas,
	bullets = [],
	beams = [],
	enemies = [],
	score = 0,
	enemySpeedMulti = 1,
	sound = new SoundManager(),
	frameCount = 0,
	blaster = {},
	lastRender = Date.now(),
	request,
	scoreCont = document.getElementById("score"),
	overlay = document.getElementById("overlay"),
	ctx = canvas.getContext('2d');

blaster.pressedKeys = [];

window.onload = function() {
	// Center playground
	canvas.style.top = (window.innerHeight - canvas.height) / 2 + 20 + "px";
	canvas.style.left = (window.innerWidth - canvas.width) / 2 + "px";
	overlay.style.top = (window.innerHeight - canvas.height) / 2 + 20 + "px";
	overlay.style.left = (window.innerWidth - canvas.width) / 2 + "px";

	// Create enemies
	for(var i = 0; i < 5; i++) {
		for(var j = 0; j < 10; j++) {
			enemies.push(new Enemy(j * 38 + 300, i * 38 + 100));
		}
	}

	animate();
};

/******************
 * Keyboard Input *
 ******************/

document.onkeydown = function(e) {
	switch(e.keyCode) {
		case 38: // UP
			player.moving.up = true;
			break;
		case 37: // LEFT
			player.moving.left = true;
			break;
		case 40: // DOWN
			player.moving.down = true;
			break;
		case 39: // RIGHT
			player.moving.right = true;
			break;
		case 32: // SPACE
			bullets.push(player.shootRocket());
			break;
		case 17: // CTRL
			var lasers = player.shootLaser();
			bullets.push(lasers[0]);
			bullets.push(lasers[1]);
			break;
	}
};

document.onkeyup = function(e) {
	switch(e.keyCode) {
		case 32: // SPACE
			player.shootRocket();
			break;
		case 37: // LEFT
			player.moving.left = false;
			break;
		case 39: // RIGHT
			player.moving.right = false;
			break;
		case 38: // UP
			player.moving.up = false;
			break;
		case 40: // DOWN
			player.moving.down = false;
			break;
		case 17: // CTRL
			player.shootLaser();
			break;
	}
};

function gameOver(won) {
	cancelRequestAnimFrame(request);
	if(won) {
		overlay.innerHTML = "You win!";
		overlay.className = "";
	}
	else {
		sound.playSound("gameover");
		overlay.innerHTML = "Game Over.";
		overlay.className = "";
	}
}

/*************
 * Game Loop *
 *************/

function animate() {
	var delta = (Date.now() - lastRender) / 1000;
	lastRender = Date.now();
	// Request a new animation frame using Paul Irish's shim
	request = requestAnimFrame(animate, document.getElementsByTagName('body'));
	update(delta);
	draw();
};

/**********
 * Update *
 **********/

function update(dt) {
	var whoShoots = Math.floor(Math.random() * enemies.length);
	// Collision Bullets | Enemies | Player
	for(var b in bullets) {
		var bull = bullets[b];
		if(bull.bottom < 0) {
			bullets.splice(b, 1);
		}
		else {
			bull.updatePos();
		}
	}
	
	// Update enemy beams
	for(var r in beams) {
		var beam = beams[r];
		if(beam.top > canvas.height) {
			beams.splice(r, 1);
		}
		else if(simpleCollision(beam, player)) {
			beams.splice(r, 1);
			gameOver(false);
		}
		else {
			beam.updatePos();
		}
	}

	for(var e in enemies) {
		var enm = enemies[e];
		inner:
		for(var b in bullets) {
			var bull = bullets[b];
			if(simpleCollision(bull, enm)) {
				enm.die();
				score += enm.points;
				bullets.splice(b, 1);
				break inner;
			}
		}
		if(enm.alive) {
			enm.updatePos(enemySpeedMulti);
			if(frameCount == 100 && e == whoShoots) {
				beams.push(enm.shoot());
			}
		}
		else {
			if(enm.remove) {
				enemies.splice(e, 1);
				enemySpeedMulti += 0.05;
				if(enemies.length == 0) {
					gameOver(true);
				}
			}
			else {
				enm.die();
			}
		}
	}

	// Collision Player | Canvas
	if(player.bottom >= canvas.height) {
		player.collision.bottom = true;
	}
	else if(player.left <= 0) {
		player.collision.left = true;
	}
	else if(player.right >= canvas.width) {
		player.collision.right = true;
	}
	else if(player.top <= 0) {
		player.collision.top = true;
	}
	
	player.updatePos();
	frameCount = (frameCount == 100) ? 0 : frameCount + 1;
};

/********
 * Draw *
 ********/
 
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw score
	scoreCont.innerHTML = score;

	// Draw bullets
	for(var b in bullets) {
		bullets[b].draw(ctx);
	}
	
	// Draw enemies
	for(var e in enemies) {
		enemies[e].draw(ctx);
	}

	// Draw enemy beams
	for(var r in beams) {
		beams[r].draw(ctx);
	}

	player.draw(ctx);
};
