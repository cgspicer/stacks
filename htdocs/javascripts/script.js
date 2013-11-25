$(window).ready(function() {

  /**
  * Stacks initialization
  */
  var stacks = $().stacks({
    'contentDirectory':'content-partials/',
    'snapOn':[
      {'animated':function(){
        console.log(snapper.state());
      }}
    ]
  });

  /*
  * Write your custom application specific script here
  */

});