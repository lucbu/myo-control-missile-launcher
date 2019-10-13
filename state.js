jQuery(function($){
  $state = $('#state');

  Myo.on('fist', function(){
    var element = getElement(this, $state);
    element.text('fist');
  });
  Myo.on('wave_in', function(){
    var element = getElement(this, $state);
    element.text('wave_in');
  });
  Myo.on('wave_out', function(){
    var element = getElement(this, $state);
    element.text('wave_out');
  });
  Myo.on('fingers_spread', function(){
    var element = getElement(this, $state);
    element.text('spread');
  });

  // Myo.on('snap', function(){
  //   var element = getElement(this, $state);
  //   element.text('snap');
  // });

  Myo.on('rest', function(){
    var element = getElement(this, $state);
    element.text('rest');
  });
})
