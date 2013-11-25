(function( $ ){
	/**
	 * stacks.js
	 * A jQuery plugin that facilitates Stacks, a boilerplate for HTML5 mobile app featuring fixed navigation, obscured side menus, and dynamic page content loading
	 * http://www.codekaiju.com
	 *
	 * Copyright 2013, Coran Spicer
	 * Free to use under the MIT license.
	 *
	 * Date: Wed Nov 20 2013
	 */
	var methods = {
		init : function( options ) {
			var settings = $.extend( {
				'navItems' : '.nav-items a',
				'pageStack' : '.stack.page',
        'contentContainerClass' : 'page-content',
        'contentDirectory' : '/',
        'ajaxLoading' : true,
        'snapjsOptions' : {},
        'snapOn' : []
			}, options);

      $this = $(this);

      //initialize SnapJS
      var snapperOptions = Collect({ element: $(settings.pageStack)[0] },settings.snapjsOptions);
      snapper = new Snap(snapperOptions);
      if (settings.snapOn){
        for(var i=0;i<settings.snapOn.length;i++){
          $.each(settings.snapOn[0],function(hook,handler){
            snapper.on(hook,handler);
          });
        }
      }

      //set up navigation passthrough for url (based on http://css-tricks.com/rethinking-dynamic-page-replacing-content/ && http://diveintohtml5.info/history.html )
      if (Modernizr.history && settings.ajaxLoading ) {
        var $navItems = $(settings.navItems);
        $navItems.on('click', function(e) {
          e.preventDefault();
          _href = $(this).attr('href');
          $navItems.each(function(){$(this).removeClass('active');});
          $(this).addClass('active');
          // change the url without a page refresh and add a history entry.
          // for more about the history API: (https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)
          history.pushState(null, null, _href);
          // handle the content change
          handleContentChange(_href);
        });
      } else { } //regular page loads

      function handleContentChange(_href) {
        var $pageStack = $(settings.pageStack);
        var newPageContent = $('<div/>',{ 'class':settings.contentContainerClass })
        .load(settings.contentDirectory + _href, function() { // load the contents of whatever href is
          //add the content "behind" the current page
          $pageStack.prepend(newPageContent);
          //handle the animation reveal
          $pageStack.find('.'+settings.contentContainerClass).last().fadeOut(500,function(){$(this).remove();});
        });
      }
      return $this;

		}
	};

  $.fn.stacks = function( method ) {
    // Method calling logic
  	if ( methods[method] ) {
  		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
  	} else if ( typeof method === 'object' || ! method ) {
  		return methods.init.apply( this, arguments );
  	} else {
  		$.error( 'Method ' +  method + ' does not exist on jQuery.stacks' );
  	}
  };

})( jQuery );

//collect function from https://gist.github.com/nfreear/5107307
function Collect(ob1, ob1) {
    var ret = {},
    len = arguments.length,
    arg,
    i = 0,
    p;

    for (i = 0; i < len; i++) {
      arg = arguments[i];
      if (typeof arg !== "object") {
        continue;
      }
      for (p in arg) {
        if (arg.hasOwnProperty(p)) {
          ret[p] = arg[p];
        }
      }
    }
    return ret;
}