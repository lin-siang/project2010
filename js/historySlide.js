/**
 * Arcphilia - Creative
 *
 * @copyright  Arcphilia Inc.
 * @since      2014-04-09
 * @author     Kenta Shindo
 */
/************************************************************************
 * 沿革のスライド
 *
 * var masterW          基準となる幅 -> slideInit() で設定される
 * var content          スライドコンテンツ -> slideInit() で設定される
 * var moveSpeed        スライドアニメーション
 * var easing           イージング -> jquery.easing を利用
 ***********************************************************************/

var masterW = 0;
var content = null;

var moveSpeed = 1000;
var easing    = 'easeInOutCubic';

function slideInit(){
	content = $('#History_inner');
	auto = content.data('auto');
	masterW = parseInt(content.find('dl').width());
	//マウスアクションの起動
	mouseAction();
}

function mouseAction(){
	$('#History_inner').find('.slide_btn_left').on({
		'click' : function(){
			move('left');
		}
	});

	$('#History_inner').find('.slide_btn_right').on({
		'click' : function(){
			move('right');
		}
	});
}

function move(type){
	var marginL = parseInt(content.find('dl').css('margin-left'));
	var slideW  = parseInt(content.width());

	if(type == 'left'){
		if(marginL + slideW < 10){
			$('#History_inner').find('.slide_btn_right').stop().fadeIn(moveSpeed);
			content.find('dl').stop().animate({'margin-left' : marginL + slideW * 0.6 + 'px'}, moveSpeed, easing);
		}else{
			$('#History_inner').find('.slide_btn_right').stop().fadeIn(moveSpeed);
			$('#History_inner').find('.slide_btn_left').stop().fadeOut(moveSpeed);
			content.find('dl').stop().animate({'margin-left' : 10 + 'px'}, moveSpeed, easing);
		}
	}
	if(type == 'right'){
		if(marginL - slideW > -masterW + slideW){
			$('#History_inner').find('.slide_btn_left').stop().fadeIn(moveSpeed);
			content.find('dl').stop().animate({'margin-left' : marginL - slideW * 0.6 + 'px'}, moveSpeed, easing);
		}else{
			$('#History_inner').find('.slide_btn_left').stop().fadeIn(moveSpeed);
			$('#History_inner').find('.slide_btn_right').stop().fadeOut(moveSpeed);
			content.find('dl').stop().animate({'margin-left' : -masterW + slideW + 'px'}, moveSpeed, easing);
		}
	}
}