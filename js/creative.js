/**
 * Arcphilia - creative
 *
 * @copyright  Arcphilia Inc.
 * @since      2014-04-09
 * @author     Kenta Shindo
 */

/************************************************************************
 * creativeページ
 * 各アイテムのホバー,クリックイベント
 * イメージスライド
 *
 * var fadeSpeed   一覧切り替え時のスピード
 ***********************************************************************/

var fadeSpeed = 500;
var easing    = 'easeInOutCubic';

$(function(){

	$('#Container').on({
		'mouseenter' : function(){
			$(this).find('.comment').stop().fadeIn(fadeSpeed);
			if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0 && cFlag) {
				var self = $(this);
				detailSet(self);
			}
		},
		'mouseleave' : function(){
			$(this).find('.comment').stop().fadeOut(fadeSpeed);
		},
		'click'      : function(){
			var self = $(this);
			detailSet(self);
		}
	}, '.creative_block li');

	$(document).on({
		'click' : function(){
			detailRemove();
		}
	},'.close');


	itemFadeIn('.creative_block > li');

	//ハッシュタグでのアクセスの場合対応する作品を展開
	$(window).load(function(){
		if(location.hash){
			hashAccess(location.hash);
			location.hash = '';
			//window.history.pushState(null, null, '/creative/');
		}
	});

});

function detailSet(target){
	var parent = target.parents('.contents_inner');

	//仕様によってajax等でデータを取得する必要あり。


	//初期化
	var objectHtml = target.next().html();
	var object = '<div class="creative_detail contents_beige">\
							 ' + objectHtml +'\
								</div>';

	if($('.creative_contents > .creative_detail').length > 0 && !target.is('.active')){

		$('.creative_contents > .creative_detail').stop().slideUp(fadeSpeed, easing,  function(){
			$(this).remove();
			detailShow(object, parent , target);
		});

	}else if($('.creative_contents > .creative_detail').length == 0 && !target.is('.active')){

		detailShow(object, parent, target);

	}else{

		detailRemove();

	}
}


function detailRemove(){
	$('.creative_contents > .creative_detail').stop().slideUp(fadeSpeed, function(){
		$(this).remove();
		$('.creative_block li').removeClass('active');
	});
}

function detailShow(object, parent, target){
	$(object).insertBefore(parent);

	//画像の読み込み後展開
	var img = $('.creative_contents > .creative_detail').find('img');

	// img.each(function(){
	// 	var imgsrc = $(this).attr("src");
	// 	$(this).attr("src",imgsrc+ "?" + new Date().getTime())
	// });

	if(img.last()[0].complete){
		$('.creative_contents > .creative_detail').stop().slideDown(fadeSpeed, easing, function(){
			detailSlideSet();
			scrollPositionSet();
		});
		$('.creative_block li').removeClass('active');
		target.addClass('active');
		//return false;
	}else{
		img.last().load(function(){
			$('.creative_contents > .creative_detail').stop().slideDown(fadeSpeed, easing, function(){
				detailSlideSet();
				scrollPositionSet();
			});
			$('.creative_block li').removeClass('active');
			target.addClass('active');
		});
	}
}

function scrollPositionSet(){
	var w = $(window).width();
	var x = 1100;
	console.log(w,x)
	if(w > x){
		var offsetT = $('.creative_contents > .creative_detail').offset().top;
		$('html,body').animate({ scrollTop: offsetT}, fadeSpeed * 1.5, easing);
	}else{
		var offsetT = $('.creative_contents > .creative_detail').offset().top;
		$('html,body').animate({ scrollTop: offsetT - parseInt($('#Header').height()) }, fadeSpeed * 1.5, easing);
	}
}

function detailSlideSet(){

	if($('.creative_contents > .creative_detail li').length > 1){
		$('.creative_contents > .creative_detail .slides').slider({
			autoplay : false,
			slideafter : function(){
				$('.creative_contents > .creative_detail .slider').animate({'opacity':1},fadeSpeed);
				$('.creative_contents > .creative_detail .jquery-slider-pages').css({'right': parseInt($('.creative_contents > .creative_detail .slides').width()) / 2 -  parseInt($('.creative_contents > .creative_detail .jquery-slider-pages').width()) / 2 + 'px'});
			}
		});
	}else{
		$('.creative_contents > .creative_detail .slider').animate({'opacity':1},fadeSpeed);
	}
}

function hashAccess(hash){
	if(hash.match('detail')){
		hash = hash.replace('#detail','');
		hash--;
		$('.creative_block > li').eq(hash).click();
	}
}