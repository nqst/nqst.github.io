$(function(){

  // Open share modals
  var $shareLink = $('.js-share-link');
  $shareLink.click(function (e) {
    e.preventDefault();
    var $link = $(this);
    var href = $link.attr('href');
    var website = $link.attr('data-website');

    var websites = {
      facebook: { width: 600, height: 300 },
      twitter:  { width: 600, height: 254 },
      vk:       { width: 600, height: 300 }
    }

    var modal = function (website) {
      var options = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,'
      window.open(href, '', options + 'height=' + websites[website].height + ',width=' + websites[website].width)
    }

    modal(website);
  });

});
