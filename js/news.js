/**
 * Arcphilia - News
 *
 * @copyright  Arcphilia Inc.
 * @since      2014-04-09
 * @author     Kenta Shindo
 */


/************************************************************************
 * Newsページ
 * グリッド,リスト切り替え
 *
 * var fadeSpeed   一覧切り替え時のスピード
 ***********************************************************************/

var fadeSpeed = 300;


$(function(){

	//グリッド,リスト切り替え
	$('.switch').on({
		'click' : function(){
			var self = $(this);
			var listType = self.data('type');
			viewTypeChange(self , listType);
		}
	},'li');

	//jquery masonry　を起動
	initMasonry();

	itemFadeIn('#News_box > li');
});

/************************************************************************
 * 配置
 * プラグイン jquery masonry を利用
 * URL http://masonry.desandro.com/
 ***********************************************************************/
function initMasonry(){
	msnry = new Masonry( '#News_box', {
		columnWidth : 10,      //余白
		transitionDuration: 0  //移動アニメーション -> フェードを使うためオフ
	});
}

/************************************************************************
 * グリッド,リスト切り替え
 ***********************************************************************/
function viewTypeChange(self , type){
	//初期化,切り替え
	$('.switch').find('li').removeClass('active');
	self.addClass('active');
	$('#News_box').find('li').stop().animate({'opacity' : 0 }, fadeSpeed, function(){
		$('#News_box').removeClass('block , list').addClass(type);
		//レイアウト調整
		msnry.layout();
		//表示
		$(this).stop().animate({'opacity' : 1 }, fadeSpeed);
	});
}



/************************************************************************
 * スマホ表示
 ***********************************************************************/

$(function() {
    var w = $(window).width();
    var x = 625;
    if (w <= x) {
        $('#Sort').insertAfter('.switch');
		$('#News_box').removeClass('block');
		$('#News_box').addClass('list');
		msnry.layout();
    } else {
    }
});

/* 2014-05-12 Kenta Shindo モバイル端末でリロードが多発するためコメントアウト
var timer = false;
$(window).resize(function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        var w = $(window).width();
		var x = 779;
		if (w <= x) {
			$('#Sort').insertAfter('.switch');
			$('#News_box').removeClass('block');
			$('#News_box').addClass('list');
			msnry.layout();
		} else if(w > x){
			$('#Sort').insertAfter('h2');
		}
    }, 200);
});
*/
