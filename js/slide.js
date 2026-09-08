/**
 * Arcphilia - slide
 *
 * @copyright  Arcphilia Inc.
 * @since      2014-04-09
 * @author     Kenta Shindo
 */


/************************************************************************
 * slide
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
	console.log('on');
	content = $('.Slide');
	auto = content.data('auto');

	//要素の初期設定
 	content.find('li').each(function(i){
 		//masterWにitemWを足していく
 		var itemW = parseInt($(this).outerWidth(true));
 		masterW += itemW

 		//繰り返しのラストで行う処理
		if( i == content.find('li').length - 1 ){
			content.css({'width': masterW + 'px'});
			//ulの値を変更
			$(this).parents('ul').css({
				'width': masterW + 'px',
				'margin-left' : 10 + 'px'
			});


			//マウスアクションの起動
			mouseAction();

		}
	});
}

function mouseAction(){
	$('.slide_block').find('.slide_btn_left').on({
		'click' : function(){
			move('left');
		}
	});

	$('.slide_block').find('.slide_btn_right').on({
		'click' : function(){
			move('right');
		}
	});
}

function move(type){
	var marginL = parseInt(content.find('ul').css('margin-left'));
	var slideW  = parseInt($('.slide_block').width());

	if(type == 'left'){
		if(marginL + slideW < 10){
			$('.slide_block').find('.slide_btn_right').stop().fadeIn(moveSpeed);
			content.find('ul').stop().animate({'margin-left' : marginL + slideW * 0.6 + 'px'}, moveSpeed, easing);
		}else{
			$('.slide_block').find('.slide_btn_right').stop().fadeIn(moveSpeed);
			$('.slide_block').find('.slide_btn_left').stop().fadeOut(moveSpeed);
			content.find('ul').stop().animate({'margin-left' : 10 + 'px'}, moveSpeed, easing);
		}
	}
	if(type == 'right'){
		if(marginL - slideW > -masterW + slideW){
			$('.slide_block').find('.slide_btn_left').stop().fadeIn(moveSpeed);
			content.find('ul').stop().animate({'margin-left' : marginL - slideW * 0.6 + 'px'}, moveSpeed, easing);
		}else{
			$('.slide_block').find('.slide_btn_left').stop().fadeIn(moveSpeed);
			$('.slide_block').find('.slide_btn_right').stop().fadeOut(moveSpeed);
			content.find('ul').stop().animate({'margin-left' : -masterW + slideW + 'px'}, moveSpeed, easing);
		}
	}
}