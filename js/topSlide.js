/**
 * Arcphilia - Top
 *
 * @copyright  Arcphilia Inc.
 * @since      2014-04-09
 * @author     Kenta Shindo
 */
/************************************************************************
 * メインビジュアルのカルーセル
 *
 * var cFlag                クリック制御フラグ
 * var mainSlideTimer       タイマー関数で利用
 * var mainMoveSpeed        スライドアニメーション
 * var mainEasing           イージング -> jquery.easing を利用
 ***********************************************************************/
var cFlag = true;
var mainSlideTimer = null;

var mainMoveSpeed = 1000;
var mainEasing    = 'easeInOutCubic';

//---------------
// ブラウザ判定
//---------------
var ua = navigator.userAgent;
	  isIE      = ua.match(/msie/i),
    isIE6     = ua.match(/msie [6.]/i),
    isIE7     = ua.match(/msie [7.]/i),
    isIE8     = ua.match(/msie [8.]/i),
    isIE9     = ua.match(/msie [9.]/i),
    isIE10    = ua.match(/msie [10.]/i),
    isChrome  = ua.match(/chrome/i),
    isSafari  = ua.match(/safari/i),
    isfireFox = ua.match(/firefox/i),
    isOpera   = ua.match(/opera/i);


$(function(){
	init();
	$(window).resize(function(){
		resize();
	});

	//クリックイベント
	$('#Top_slide_btn').find('.slide_btn_right').on({
		'click' : function(){
			if(cFlag) mainNext();
		},
		'mouseenter' : function(){
			clearInterval(mainSlideTimer);
		},
		'mouseleave' : function(){
			autoMainSlideTimer();
		}
	});

	$('#Top_slide_btn').find('.slide_btn_left').on({
		'click' : function(){
			if(cFlag) mainBack();
		},
		'mouseenter' : function(){
			clearInterval(mainSlideTimer);
		},
		'mouseleave' : function(){
			autoMainSlideTimer();
		}
	});

	$('#Main_object li').on({
		'mouseenter' : function(){
			clearInterval(mainSlideTimer);
		},
		'mouseleave' : function(){
			autoMainSlideTimer();
		}
	})

});

function init(){
	//初期設定
	var areaW = parseInt($(window).width());
	var firstClone = $('#Main_object').find('li').first().clone();
	var lastClone = $('#Main_object').find('li').last().clone();
	var offset = -180;
	if(areaW < 1100) offset = null;
	$('#Main_object').append(firstClone).prepend(lastClone);
	$('#Main_object').css({
		'width':areaW * $('#Main_object').find('li').length + 'px',
		'margin-left' : -(areaW + offset) + 'px'
	});
	$('#Main_object').find('li').css({'width':areaW + offset + 'px'});

	autoMainSlideTimer();
}

function resize(){
	var areaW = parseInt($(window).width());
	var offset = -180;
	if(areaW < 1100) offset = null;
	$('#Main_object').stop().animate({
		'width':areaW * $('#Main_object').find('li').length + 'px',
		'margin-left' : -(areaW + offset) + 'px'
	},0,function(){
			cFlag = true;
			//contentFadeIn();
			$('#Main_object li p').css({'display':'block'});
	});
	$('#Main_object').find('li').css({'width':areaW + offset + 'px'});
}

function mainNext(){
	cFlag = false;
	contentFadeOut();
	var mainLength = $('#Main_object').find('li').length;
	var moveMargin = parseInt($('#Main_object').find('li').width());
	var nowMargin  = parseInt($('#Main_object').css('margin-left'));
	if(nowMargin - moveMargin <= (moveMargin * mainLength - moveMargin) * -1 ){
		$('#Main_object').css({'margin-left' : 0 + 'px'});
		$('#Main_object').stop().animate({'margin-left' : 0 - moveMargin + 'px'},mainMoveSpeed,mainEasing,function(){
			cFlag = true;
			contentFadeIn();
		});
	}else{
		$('#Main_object').stop().animate({'margin-left' : nowMargin - moveMargin + 'px'},mainMoveSpeed,mainEasing,function(){
			cFlag = true;
			contentFadeIn();
		});
	}
}

function mainBack(){
	cFlag = false;
	contentFadeOut();
	var mainLength = $('#Main_object').find('li').length;
	var moveMargin = parseInt($('#Main_object').find('li').width());
	var nowMargin  = parseInt($('#Main_object').css('margin-left'));
	if(nowMargin + moveMargin >= moveMargin ){
		$('#Main_object').css({'margin-left' : (moveMargin * (mainLength - 2)) * -1 + 'px'});
		$('#Main_object').stop().animate({'margin-left' : (moveMargin * (mainLength - 2)) * -1 + moveMargin + 'px'},mainMoveSpeed,mainEasing,function(){
			cFlag = true;
			contentFadeIn();
		});
	}else{
		$('#Main_object').stop().animate({'margin-left' : nowMargin + moveMargin + 'px'},mainMoveSpeed,mainEasing,function(){
			cFlag = true;
			contentFadeIn();
		});
	}
}

function contentFadeIn(){
	if(!isIE6 && !isIE7 && !isIE8){
		$('#Main_object li p').stop().fadeIn(500);
	}else{
		$('#Main_object li p').css({'display':'block'});
	}
}

function contentFadeOut(){
	if(!isIE6 && !isIE7 && !isIE8){
		$('#Main_object li p').stop().fadeOut(500);
	}else{
		$('#Main_object li p').css({'display':'block'});
	}
}
function autoMainSlideTimer(){
	//タイマーイベント
	mainSlideTimer = setInterval(function(){
		if(cFlag) mainNext();
	},5000);
}


/************************************************************************
 * slide
 * トップ 下部にあるクリエィブのスライダー
 * ニュースページにあるものとは仕様が異なります
 *
 * var mFlag            クリック制御フラグ
 * var masterW          基準となる幅 -> slideInit() で設定される
 * var content          スライドコンテンツ -> slideInit() で設定される
 * var moveSpeed        スライドアニメーション
 * var easing           イージング -> jquery.easing を利用
 * var TimerNormalSlide タイマー関数で利用
 ***********************************************************************/
var mFlag = true;
var masterW = 0;
var content = $('.Slide');

var moveSpeed = 1000;
var easing    = 'easeInOutCubic';
var auto      = null;
var TimerNormalSlide = null;

function slideInit(){
	content = $('.Slide');
	auto = content.data('auto');

	var appendClone = content.find('ul').find('li').clone();
	var prependClone = content.find('ul').find('li').clone();
	content.find('ul').append(appendClone);
	content.find('ul').prepend(prependClone);

	//要素の初期設定
	setTimeout(function(){
	 	content.find('li').each(function(i){
	 		//masterWにitemWを足していく
	 		var itemW = parseInt($(this).outerWidth(true));
	 		masterW += itemW

	 		//繰り返しのラストで行う処理
			if( i == content.find('li').length - 1 ){
				//alert(masterW);
				content.css({'width': masterW + 'px'});
				//ulの値を変更
				//alert(masterW);
				$(this).parents('ul').css({
					'width': masterW + 'px',
					'margin-left' : -(masterW / 3 + 10) + 'px'
				});



				//タイマー
				if(auto) autoNormalSlideTimer();

				//マウスアクションの起動
				mouseAction();

			}
		});
		$('.slide_block').find('.slide_btn_left').css({'display':'block'});

	},1000);
}

function mouseAction(){
	$('.slide_block').find('.slide_btn_left').on({
		'click' : function(){
			if(mFlag) move('left');
		}
	});

	$('.slide_block').find('.slide_btn_right').on({
		'click' : function(){
			if(mFlag) move('right');
		}
	});

	$('.slide_block').on({
		'mouseenter' : function(){
			clearInterval(TimerNormalSlide);
		},
		'mouseleave' : function(){
			autoNormalSlideTimer();
		}
	});
}

function move(type){
	mFlag = false;
	var marginL = parseInt(content.find('ul').css('margin-left'));
	var slideW  = parseInt($('.slide_block').width());
	if(type == 'left'){
		if(marginL + slideW < 10){
			content.find('ul').stop().animate({'margin-left' : marginL + slideW * 0.6 + 'px'}, moveSpeed, easing,function(){
				mFlag = true;
			});
		}else{
			//自然な位置にmargin-leftを移動
			content.find('ul').css({'margin-left' : - (masterW / 3) + marginL + 'px'});
			//margin-leftを再取得
			marginL = parseInt(content.find('ul').css('margin-left'));
			content.find('ul').stop().animate({'margin-left' : marginL + slideW + 'px'}, moveSpeed, easing,function(){
				mFlag = true;
			});
		}
	}
	if(type == 'right'){
		if(marginL - slideW > -masterW + slideW){
			content.find('ul').stop().animate({'margin-left' : marginL - slideW * 0.6 + 'px'}, moveSpeed, easing,function(){
				mFlag = true;
			});
		}else{
			//自然な位置にmargin-leftを移動
			content.find('ul').css({'margin-left' : marginL + (masterW / 3)  + 'px'});
			//margin-leftを再取得
			marginL = parseInt(content.find('ul').css('margin-left'));
			content.find('ul').stop().animate({'margin-left' : marginL - slideW + 'px'}, moveSpeed, easing,function(){
				mFlag = true;
			});
		}
	}
}

function autoNormalSlideTimer(){
	//タイマーイベント
	TimerNormalSlide = setInterval(function(){
		var marginL = parseInt(content.find('ul').css('margin-left'));
		var slideW  = parseInt($('.slide_block').width());
		if(mFlag) move('right');
	},5000);
}