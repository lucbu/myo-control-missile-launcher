var Myo = require('myo');

Myo.connect('com.stolksdorf.myAwesomeApp', require('ws'));

Myo.on('wave_out', function(){
	console.log('Hello Myo!');
	this.vibrate();
});

Myo.on('connected', function(){
  this.vibrate();
})
