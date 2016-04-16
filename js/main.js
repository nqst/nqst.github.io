$(function(){
  if($('article').length) {
    $('article').fitVids({ customSelector: "iframe[src^='http://embed.ted.com']"});
  };
  

  // if($('.footer-reveal').length) {
  //   $('.footer-reveal').footerReveal({
  //     shadow: false
  //   });
  // }
});
