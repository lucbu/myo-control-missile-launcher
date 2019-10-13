
var timeoutOffset = 700;

var $baseUrlInput = $('#base-url');
var unlockTimeout;

var MODE = "WAITING";
var DIRECTIONX = "CENTER";
var DIRECTIONY = "CENTER";

jQuery(function($){


  var $mode = $('#mode');
  setInterval(function(){
    $mode.text(MODE);
  }, 1)

  Myo.on('fingers_spread', function(){
    if(MODE == 'WAITING'){
      MODE = "WAITING2";
      unlockTimeout=setTimeout(function(){
        MODE = "WAITING";
      }, 2000);
    }
  });
  Myo.on('fist', function(){
    if(MODE == 'WAITING2'){
      MODE = "READY_MOVE";
      clearTimeout(unlockTimeout);
      this.vibrate('short');
      this.vibrate('short');
    }
  });
  Myo.on('wave_out', function(){
    MODE= "WAITING";
    this.vibrate('short');
    clearTimeout(timeoutOffset);
    clearTimeout(unlockTimeout);
  });

  Myo.on('movement', function(data){
    if(MODE == 'READY_MOVE'){
      var movement = '';
      //console.log(data);
      if(data.y != 0){
        if(data.y > 0){
          MODE = 'WILL_MOVE';
          // GO DOWN
          movement = 'DOWN';
        } else if (data.y < 0){
          MODE = 'WILL_MOVE';
          // GO UP
          movement = 'UP';
        }
      } else {
        if(data.x != 0){
          if(data.x > 0){
            MODE = 'WILL_MOVE';
            // GO RIGHT
            movement = 'RIGHT';
          } else if (data.x < 0){
            MODE = 'WILL_MOVE';
            // GO LEFT
            movement = 'LEFT';
          }
        }
      }

      if(MODE == 'WILL_MOVE'){
        MODE = 'MOVING_'+movement;
        callMovement(movement);
        setTimeout(function(){
          MODE = "READY_MOVE";
        }, timeoutOffset);
      }
    }
  });

  Myo.on('wave_in', function(){
    if(MODE == 'READY_MOVE'){
      MODE = 'READY_FIRE';
      this.vibrate('short');
    }
  });

  Myo.on('fist', function(){
    if(MODE == 'WAITING') {
      resetOrientation();
    }
    if(MODE == 'READY_FIRE'){
        MODE = 'FIRE';
        callFire();
        // FIRE
        setTimeout(function(){
          MODE = "WAITING";
        }, 2000)
    }
  });
  Myo.on('snap', function(){
    if(MODE == 'READY_FIRE'){
        MODE = 'FIRE';
        callFire();
        // FIRE
        setTimeout(function(){
          MODE = "WAITING";
        }, 2000)
    }
  });

});

function callMovement(movement){
  var url = 'http://192.168.1.44:9999/';
  switch(movement){
    case 'RIGHT':
      url += 'right';
      break;
    case 'LEFT':
      url += 'left';
      break;
    case 'DOWN':
      url += 'down';
      break;
    case 'UP':
      url += 'up';
      break;
  }
  $.ajax(url+'?length=1');
}
function callFire(){
  var url = 'http://192.168.1.44:9999/' + 'fire';
  $.ajax(url+'?length=1');
}
