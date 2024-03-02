
$(document).ready(function(){
  $(window).on('scroll', function(){
    $('.back-to-top').stop();
    if($(this).scrollTop() > 400){
      $('.back-to-top').animate({
        height:"50px"
      },1000)
    }else if ($(this).scrollTop() < 400){
      $('.back-to-top').hide()
    }
    else{
      $('back-to-top').animate({
        height:'0'
      },1000);
    }
  })
})

