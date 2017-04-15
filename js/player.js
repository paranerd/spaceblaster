var Player = Class.extend({
	init: function(x, y) {
		this.height = 28;
		this.width = 28;
		this.top = y;
		this.left = x;
		this.bottom = this.top + this.height;
		this.right = this.left + this.width;
		this.shootAvailable = true;
		this.sound = new SoundManager();
		this.moving = {up: false, left: false, down: false, right: false};
		this.collision = {top: false, left: false, bottom: false, right: false};
		this.speed = 4;
	},
	
	updatePos: function () {
		if(this.moving.left && !this.collision.left) {
			this.left -= this.speed;
		}
		if(this.moving.right && !this.collision.right) {
			this.left += this.speed;
		}
		if(this.moving.up && !this.collision.top) {
			this.top -= this.speed;
		}
		if(this.moving.down && !this.collision.bottom) {
			this.top += this.speed;
		}
		this.right = this.left + this.width;
		this.bottom = this.top + this.height;
		this.collision = {top: false, left: false, bottom: false, right: false};
	},
	
	getBullets: function() {
		return this.bullets;
	},
	
	shootRocket: function() {
		if(this.shootAvailable) {
			var bull = new Rocket(this.left + this.width / 2, this.top, 1);
			this.shootAvailable = false;
			this.sound.playSound("missile");
			return bull;
		}
		else {
			this.shootAvailable = true;
		}
	},
	
	shootLaser: function() {
		if(this.shootAvailable) {
			var laserOne = new Laser(this.left, this.top, 1);
			var laserTwo = new Laser(this.right, this.top, 1);
			this.shootAvailable = false;
			this.sound.playSound("laser");
			return [laserOne, laserTwo];
		}
		else {
			this.shootAvailable = true;
		}
	},
	
	getPos: function() {
		return {left: this.left, right: this.right, top: this.top, bottom: this.bottom};
	},
	
	draw: function(ctx) {
		// Player triangle
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.moveTo(this.left, this.top + this.height);
		ctx.lineTo(this.left + this.width / 2, this.top);
		ctx.lineTo(this.left + this.width, this.top + this.height);
		ctx.fill();
	}
});