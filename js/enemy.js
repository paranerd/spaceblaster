var Enemy = Class.extend({
	init: function(x, y) {
		this.height = 28;
		this.width = 28;
		this.top = y;
		this.left = x;
		this.bottom = this.top + this.height;
		this.right = this.left + this.width;
		this.posChange = 0;
		this.dir = 1;
		this.alive = true;
		this.remove = false;
		this.dieCount = 5;
		this.shootAvailable = true;
		this.sound = new SoundManager();
		this.moving = {up: false, left: false, down: false, right: false};
		this.collision = {top: false, left: false, bottom: false, right: false};
		this.speed = 2;
		this.points = 100;
	},
	
	updatePos: function (multi) {
		if(this.posChange >= 200) {
			this.dir = -1;
			this.top += 20;
		}
		else if(this.posChange <= -200) {
			this.dir = 1;
			this.top += 20;
		}
		this.left += this.speed * multi * this.dir;
		this.right = this.left + this.width;
		this.bottom = this.top + this.height;
		this.posChange += this.speed * multi * this.dir;
	},
	
	die: function() {
		if(this.alive) {
			this.sound.playSound("explosion");
			this.alive = false;
		}
		else {
			this.dieCount--;
		}
		
		if(this.dieCount == 0) {
			this.remove = true;
		}
	},
	
	getPos: function() {
		return {left: this.left, right: this.right, top: this.top, bottom: this.bottom};
	},
	
	shoot: function() {
		var bull = new Beam(this.left + this.width / 2, this.bottom, -1);
		return bull;
	},
	
	draw: function(ctx) {
		if(this.alive) {
			// Circle
			ctx.fillStyle = "grey";
			ctx.beginPath();
			ctx.arc(this.left + this.width / 2, this.top + this.height / 2, this.width / 2, 0, 2 * Math.PI);
			ctx.fill();
		}
		else {
			// Star
			var rot = Math.PI / 2 * 3;
			var innerRadius = this.width / 2 - this.width / 4;
			var outerRadius = this.width / 2;
			var spikes = 8;
			var step = Math.PI / spikes;
			
			var cX = this.left + this.width / 2; // Center x
			var cY = this.top + this.height / 2; // Center y
			
			ctx.strokeStyle = "red";
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.moveTo(cX, cY - outerRadius);
			
			for(var i = 0; i < spikes; i++) {
				spikeX = cX + Math.cos(rot) * outerRadius;
				spikeY = cY + Math.sin(rot) * outerRadius;
				ctx.lineTo(spikeX, spikeY);
				rot += step;
				
				spikeX = cX + Math.cos(rot) * innerRadius;
				spikeY = cY + Math.sin(rot) * innerRadius;
				ctx.lineTo(spikeX, spikeY);
				rot += step;
			}
			ctx.lineTo(cX, cY - outerRadius);
			ctx.fillStyle = "orange";
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		}
	}
});
