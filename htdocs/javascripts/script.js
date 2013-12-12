$(window).ready(function() {

  /**
  * Stacks initialization
  */
  var stacks = $().stacks({
    'contentDirectory':'content-partials/',
    'snapOn':[
      {'animated':function(){
        snapperState = snapper.state();
        setTimeout( function(){if ( snapperState.state === 'left' || snapperState.state === 'right' ) snapper.close()},100);
      }}
    ]
  });

  /*
  * Write your custom application specific script here
  */

});