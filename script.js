Myo.connect('com.stolksdorf.myAwesomeApp');

var vectors = {'right': {x: 0, y: 0, t: 0}, 'left': {x: 0, y: 0, t: 0}};
Myo.plugins.snap = {
    max : 2.8,
    min : 0.122070312,
    blip_threshold : -0.1098632808,
};
jQuery(function($){
  $info = $('#info');
  $emg = $('#emg');
  $controls = $('#controls');

  Myo.on('emg', function(data){
    var element = getElement(this, $emg);
    element.text(data);
  });
  Myo.on('hard_tap', function(){
    document.location.reload();
  })

  Myo.on('connected', function(armband){
    Myo.setLockingPolicy('none');

    // Always unlocked
    this.unlock(true);
    var armband = this;
    setInterval(function(){
      armband.unlock(true);
    }, 100);

    this.streamEMG(true);

    // Reset orientation then vibrate (everything is ready)
    setTimeout(function(){
      resetOrientation();
      armband.vibrate();
    }, 2000);
  });
});

// better read of vector
function vectorToString(vector){
  return 'X: ' + vector.x + '; Y: ' + vector.y + '; T: ' + vector.t;
}

// return string "left" or "right" depending on name of armband given
function leftOrRight(armband){
  return armband.name.toLowerCase();
}

// GET THE ELEMENT IN HTML
function getElement(armband, $row){
  switch(leftOrRight(armband)){
    case 'right':
      return $row.find('.right');
      break;
    case 'left':
      return $row.find('.left');
      break;
  }
}
