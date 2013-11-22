(function( $ ){
	/**
	 * focalCenter.js
	 * A jQuery plugin that takes an array of elements and assigns a class to the element nearest the viewport's center
	 * http://www.codekaiju.com
	 *
	 * Copyright 2013, Coran Spicer
	 * Free to use under the MIT license.
	 *
	 * Date: Mon Feb 11 2013
	 */
	var methods = {
		init : function( options ) {
			var settings = $.extend( {
				'direction'         : 'vertical',
				'classToAssign' : 'focal-center',
        'onChange' : function(sel,group){},
        'relativeContainer' : 'window' //unsupported stub
			}, options);

      $this = $(this);
      var $container = settings.relativeContainer == 'window' ? $(window) : $this.closest( $( settings.relativeContainer ) );

      var minWidth = $container.scrollLeft();
      var maxWidth = $container.width();
      var centerX = (maxWidth + minWidth) / 2;
      var minHeight = $container.scrollTop();
      var maxHeight = $container.height();
      var centerY = (maxHeight + minHeight)/2;

      var focalPoints = [];
      $this.each( function(target) {
          self = this;
          self.fromCenterX = Math.abs( centerX - ( $(self).offset().left + $(self).width() / 2 ) + minWidth / 2 );
          self.fromCenterY = Math.abs( centerY - ( $(self).offset().top + $(self).height() / 2 ) + minHeight / 2 );
          focalPoints.push(self);
      });
      for (var i=0;i<focalPoints.length;i++){
        focalPoints[i].originalIndex=i;
      }

      function assignClasses() {
          var lastFocalPoint = focalPoints.length - 1;
          if ( $( focalPoints[ lastFocalPoint ] ).hasClass( settings.classToAssign ) ) return false;
          for ( var f = 0; f < focalPoints.length; f++ ) {
              $( focalPoints[f] ).removeClass( settings.classToAssign );
          }
          $( focalPoints[ lastFocalPoint ] ).addClass( settings.classToAssign );
          settings.onChange(focalPoints[ lastFocalPoint ],focalPoints);
      }
      function getDistances() {
          minWidth = $container.scrollLeft();
          maxWidth = $container.width();
          centerX = (maxWidth + minWidth) / 2;
          minHeight = $container.scrollTop();
          maxHeight = $container.height();
          centerY = (maxHeight + minHeight) / 2;
          for ( var i = 0; i < focalPoints.length; i++ ) {
              self = focalPoints[i];
              self.fromCenterX = Math.abs( centerX - ( $(self).offset().left + $(self).width() / 2 ) + minWidth / 2 );
              self.fromCenterY =  Math.abs( centerY - ( $(self).offset().top + $(self).height() / 2 ) + minHeight / 2 );
          }

      }
      function sortFocalPoints(){
      	if ( settings.direction == 'horizontal' ) {
              focalPoints = focalPoints.sort(function(a, b) {
                  return b.fromCenterY - a.fromCenterY;
              });
      } else if ( settings.direction == 'vertical' ) {
            focalPoints = focalPoints.sort(function(a, b) {
                return b.fromCenterY - a.fromCenterY;
            });
      	} else {
        	$.error( 'unable to sort against: ' + settings.direction );
      	}
      }

      /* do the work */
      $(window).scroll( function() {
          getDistances();
          sortFocalPoints();
          assignClasses();
      });
      getDistances();
      sortFocalPoints();
      assignClasses();

		}
	};

  $.fn.focalCenter = function( method ) {

    // Method calling logic
	if ( methods[method] ) {
		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
		return methods.init.apply( this, arguments );
	} else {
		$.error( 'Method ' +  method + ' does not exist on jQuery.focalCenter' );
	}

  };

})( jQuery );
/*
$(document).ready( function(){
    $('.post').focalCenter();
});
*/