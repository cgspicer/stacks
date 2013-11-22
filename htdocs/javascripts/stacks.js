//making a global function for dev sake, will wrap in a plugin later
function stacks() {

  /**
  * Stacks script
  */
  var $navItems = $('.nav-items a');
  var $pageStack = $('.page.stack');
  var contentContainerClass = 'page-content';
  var contentDirectory = 'content-partials/';

  //initialize SnapJS
  var snapper = new Snap({
    element: $('.stack.page')[0]
  });

  //set up navigation passthrough for url (based on http://css-tricks.com/rethinking-dynamic-page-replacing-content/ && http://diveintohtml5.info/history.html )
  if (Modernizr.history) {
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
    var newPageContent = $('<div/>',{ 'class':contentContainerClass })
    .load(contentDirectory + _href, function() { // load the contents of whatever href is
      //add the content "behind" the current page
      $pageStack.prepend(newPageContent);
      //handle the animation reveal
      $pageStack.find('.'+contentContainerClass).last().fadeOut(500,function(){$(this).remove();});
    });
  }

}