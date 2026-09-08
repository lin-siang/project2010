$(function(){
	$('#Page_top').on({
		'click' : function(){
  		$("html, body").animate({scrollTop:0}, 900);
  		return false;
		}
	})
});