/**
 * Arcphilia - event
 *
 * @copyright  Arcphilia Inc.
 * @since      2014-04-09
 * @author     Kenta Shindo
 */

/************************************************************************
 * eventページ
 * 開催実績画像のループ
 *
 * var fadeSpeed   切り替え時のスピード
 ***********************************************************************/
var fadeSpeed = 5000;

$(function(){
	//初期設定
	$('.date_img.yhm').find('li').first().css({'display':'block'});
	$('.date_img.ad').find('li').first().css({'display':'block'});

	$(window).load(function(){
		setInterval(function(){
			imageSlideYHM();
			imageSlideAD();
		}, fadeSpeed);
	});
});

var cntYHM = 0;
var cntAD = 0;
function imageSlideYHM(){
		var imgLength = $('.date_img.yhm').find('li').length;
		$('.date_img.yhm').find('li').eq(cntYHM).fadeOut(500);
		if(cntYHM < imgLength - 1){
			cntYHM = cntYHM + 1;
		}else{
			cntYHM = 0;
		}
		$('.date_img.yhm').find('li').eq(cntYHM).css({"display":"block","opacity":"0"});
		$('.date_img.yhm').find('li').eq(cntYHM).animate({"opacity":"1"},500);
}
function imageSlideAD(){
		var imgLength = $('.date_img.ad').find('li').length;
		$('.date_img.ad').find('li').eq(cntAD).fadeOut(500);

		if(cntAD < imgLength - 1){
			cntAD = cntAD + 1;
		}else{
			cntAD = 0;
		}
		$('.date_img.ad').find('li').eq(cntAD).css({"display":"block","opacity":"0"});
		$('.date_img.ad').find('li').eq(cntAD).animate({"opacity":"1"},500);
}