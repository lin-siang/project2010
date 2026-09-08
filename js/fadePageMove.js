/* Copyright (c) 2011 detelu (http://www.detelu.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * jquery.fademover.js
 * Version: 2012-02-06
*/
var loadFlag = true;
(function($){
	$.fn.fadeMover = function(options) {
		var defaults = {
			'effectType': 1,
			'inSpeed': 800,
			'outSpeed': 800,
			'inDelay' : '0',
			'outDelay' : '0',
			'nofadeOut' : 'nonmover'
        };
    var setting = $.extend(defaults, options);
		var cnt = $(this).length-1;
    this.each(function(i) {
			var pel = this;
			$(pel).css("opacity", 0);
			if(setting.effectType == 1 || setting.effectType == 2) {
				$(window).load(function(){
					if(loadFlag){
						loadFlag = false;
						$('#loadingMask').delay(1000).fadeOut(500);
						$(pel).delay(1000).animate({opacity: 1}, setting.inSpeed);
					}
				});
				setTimeout(function(){
					if(loadFlag){
						loadFlag = false;
						$('#loadingMask').delay(1000).fadeOut(300);
						$(pel).delay(1000).animate({opacity: 1}, setting.inSpeed);
					}
				},4000);
			}
			if(setting.effectType == 1 || setting.effectType == 3) {
				$('a').click(function(event) {
					var moveUrl = $(this).attr("href");
					if(!$(this).hasClass(setting.nofadeOut) && moveUrl.charAt(0) != "#"){
						event.preventDefault();
						$('#loadingMask').delay(i*setting.outDelay).fadeIn(500);
						$(pel).delay(i*setting.outDelay).animate({"opacity": 0}, setting.outSpeed, function(){
						if(cnt == i || setting.outDelay == '0')
							location.href = moveUrl;
						});
					}
				});
			}
		});
		return this;
	}
	window.onunload = function () {};
})(jQuery);

$(function(){
	//$('#loadingMask').remove();

	$('#Container').fadeMover({
		'inSpeed': 750,'outSpeed': 750,'nofadeOut' : 'nonmover'
	});
});