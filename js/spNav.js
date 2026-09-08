
$(function() {
   var i =0;
   $("#sp_nav").click(function(){
	   if(i==0){
		   $("#Header div").stop().fadeIn();
	   	   i =1;
	   }else{
		   $("#Header div").stop().fadeOut();
		   i =0;
	   }
   });
});
$(window).resize(function(){
    var w = $(window).width();
    var x = 625;
    if (w > x) {
        $("#Header div").show();
    }else if(w < x){
			$("#Header div").hide();
		}
});