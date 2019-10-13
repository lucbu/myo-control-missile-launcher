jQuery(function($){
  $direction = $('#direction');
  $vector = $('#vector');

  Myo.on('vector', function(vector){
      var arm = leftOrRight(this);
      vectors[arm]['x'] = vector.x.toFixed(2);
      vectors[arm]['y'] = vector.y.toFixed(2);
      vectors[arm]['t'] = vector.theta.toFixed(2);
      triggerDirection(this);
  });

  // Event triggered in function triggerDirection
  Myo.on('movement', function(data){
    var strX = data.x > 0 ? 'RIGHT ' : (data.x < 0 ? 'LEFT' : '-');
    var strY = data.y > 0 ? 'DOWN' : (data.y < 0 ? 'UP' : '-');

    var $directionEl = getElement(this, $direction);
    var $vectorEl = getElement(this, $vector);
    $directionEl.text(strX + ' ; ' + strY);
    $vectorEl.text(vector.x + ' ; ' + vector.y);

  })

  $controls.on('click', '.reset', function(e){
    resetOrientation();
    console.log('Orientation on zero')
  });
});


var offsetDirection = 0.4;


// Setup direction and trigger movement
function triggerDirection(armband){
  vector = vectors[leftOrRight(armband)];
  var directionX = 0;
  var directionY = 0;

  if(vector.x > offsetDirection){
    directionX = 1
  } else if (vector.x < -offsetDirection){
    directionX = -1
  }
  if(vector.y > offsetDirection){
    directionY = -1
  } else if (vector.y < -offsetDirection){
    directionY = 1
  }

  armband.trigger('movement', {x: directionX, y: directionY});
}

// reset orientation of all armband
function resetOrientation(armband){
  if(typeof armband == 'undefined'){
      for(var i= 0; i < Myo.myos.length; i++) {
        var myo = Myo.myos[i];
        myo.zeroOrientation();
      }
  } else {
    console.log(armband.connectIndex)
    Myo.myos[armband.connectIndex].zeroOrientation();
  }
}
