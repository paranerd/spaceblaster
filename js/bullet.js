var Bullet = Class.extend({
	init: function(x, y, dir) {
		this.left = x;
		this.right = this.left + this.width;
		this.top = y;
		this.bottom = this.top + this.height;
		this.dir = dir;
		this.collision = {top: false, left: false, bottom: false, right: false};
	},

	updatePos: function() {
		this.top -= this.velocity * this.dir;
		this.bottom = this.top + this.height;
	},

	getPos: function() {
		return {left: this.left, right: this.right, top: this.top, bottom: this.bottom};
	},
	
	shoot: function() {
		
	}
});

var Rocket = Bullet.extend({
	init: function(x, y, dir) {
		this.height = 40;
		this.width = 7;
		this._super(x, y, dir);
		this.velocity = 6;
	},
	
	draw: function(ctx) {
		ctx.fillStyle = "red";
		ctx.fillRect(this.left, this.top, this.width, this.height);
	}
});

var Laser = Bullet.extend({
	init: function(x, y, dir) {
		this.height = 25;
		this.width = 7;
		this._super(x, y, dir);
		this.velocity = 8;
	},
	
	draw: function(ctx) {
		ctx.fillStyle = "lightblue";
		ctx.fillRect(this.left, this.top, this.width, this.height);
	}
});

var Beam = Bullet.extend({
	init: function(x, y, dir) {
		this.height = 25;
		this.width = 7;
		this._super(x, y, dir);
		this.velocity = 8;
	},
	
	draw: function(ctx) {
		ctx.fillStyle = "green";
		ctx.fillRect(this.left, this.top, this.width, this.height);
	}
});
