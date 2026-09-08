$(function(){
	$('#Btn').find('li').find('a').on('click',function(){
		scrollMove($(this));
		return false;
	});
});
function scrollMove(target){
	var self = target;
	var position = $(target.attr('href')).offset().top;
	var offset = self.data('offset');
	var windowOffset = 0;
	var w = $(window).width();
	var x = 1100;
	if(w < 1100){ windowOffset = -90;}
	if(w < 779){ windowOffset = 0;}
  $("html, body").animate({scrollTop:position - offset + windowOffset}, 800);
}