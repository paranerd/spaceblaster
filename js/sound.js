var SoundManager = Class.extend({
	init: function() {
		this.audioPath = "sound/";
		this.sounds = {};
		this.soundNames = ["laser", "missile", "explosion", "gameover"];
		this.pauseStates = {};

		for(var i = 0, max = this.soundNames.length; i < max; i += 1) {
			this.loadSound(this.soundNames[i]);
			this.pauseStates[this.soundNames[i]] = 0;
		}
	},

	loadSound: function(soundName) {
		var path = this.audioPath + soundName + ".ogg";
		var sound = document.createElement('audio');
		sound.preload = "auto";
		sound.autobuffer = true;
		sound.src = path;
		sound.load();

		this.sounds[soundName] = sound;
	},

	getSound: function(soundName) {
		// var sound = this.sounds[soundName].paused();
		// return sound;
		return this.sounds[soundName];
	},

        playSound: function(soundName) {
		var sound = this.getSound(soundName);
		if(sound) {
			sound.pause();
			sound.currentTime = this.pauseStates[soundName];
			sound.play();
		}
	},

	pauseSound: function(soundName) {
		var sound = this.getSound(soundName);
		if(sound) {
			this.pauseStates[soundName] = sound.currentTime;
			sound.pause();
		}
	},

	stopSound: function(soundName) {
		var sound = this.getSound(soundName);
		if(sound) {
			sound.pause();
			sound.currentTime = 0;
		}
	}
});
