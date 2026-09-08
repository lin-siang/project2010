/**
 * Arcphilia - company
 *
 * @copyright  Arcphilia Inc.
 * @since      2014-04-23
 * @author     Kenta Shindo
 */


var animateSpeed;
var initFlag = true;
var sFlag = false;
$(function() {
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

	/************************************************************************
	 * companyページスマホ表示
	 ***********************************************************************/
	layoutChange('init');
	$(window).resize(function(){
		layoutChange()
	});

	/************************************************************************
	 * ページ内リンク動作
	 * PC -> スクロール移動
	 * SP -> タブ切り替え
	 *
	 * var sFlag スマホ表示か確認するフラグ
	 ***********************************************************************/
	$('#Contents_header ul li').on({
		'click' : function(){
			if(sFlag){
				tabChange($(this));
			}else{
				scrollMove($(this));
			}

			return false;
		}
	});


	/************************************************************************
	 * company
	 * 各アイテムのクリックイベント
	 *
	 * var animateSpeed   一覧切り替え時のスピード
	 * var cFlag          クリック制御フラグ
	 ***********************************************************************/
	animateSpeed = 550;
	cFlag    = true;
	$('.staff_box').on({
		'mouseenter' : function(){
			var self = $(this);
			var targetName = self.attr('id');
			imageChange('show',targetName);
			if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0 && cFlag) {
				cFlag = false;
				if(!$('#' + targetName + '_faq').hasClass('active')){
					detailShow(targetName);
					//self.addClass('active');
				}else{
					detailHidden(targetName);
				}
			}
		},
		'mouseleave' : function(){
			var self = $(this);
			var targetName = self.attr('id');
			imageChange('hidden',targetName);
		},
		'click'      : function(){
			var self = $(this);
			var targetName = self.attr('id');
			if(cFlag){
				cFlag = false;
				if(!$('#' + targetName + '_faq').hasClass('active')){
					detailShow(targetName);
					//self.addClass('active');
				}else{
					detailHidden(targetName);
				}
			}
		}
	}, 'li');

	$(document).on({
		'click' : function(){
			detailHidden();
		}
	},'.close');

});

function layoutChange(type){
	var w = $(window).width();
	var x = 625;
	if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {

			sFlag = true;
			initFlag = false;
			$('#Staff .faq').each(function(){
			 	var targetName = $(this).attr('id').replace('_faq','');
			 	$(this).insertAfter('#' + targetName);
			});
			if(type){
				tabChange($('[data-type="Philosophy"]'));
				$('.slide_btn_left, .slide_btn_right').css({'display':'none'});
			}


	}else{

		if (w <= x) {
			sFlag = true;
			initFlag = false;
			$('#Staff .faq').each(function(){
			 	var targetName = $(this).attr('id').replace('_faq','');
			 	$(this).insertAfter('#' + targetName);
			});
			tabChange($('[data-type="Philosophy"]'));
			$('.slide_btn_left, .slide_btn_right').css({'display':'none'});
		} else {
			sFlag = false;
			$('#Staff .faq').each(function(){
			 	var targetName = $(this).attr('id').replace('_faq','');
			 	$(this).insertAfter($(this).parents('.staff_block').find('.staff_faq'));
			});
			$('#Container > div').not('#Contents_header').css({'display':'block'});
			if(!initFlag){
				initFlag = false;
				$('.slide_btn_left, .slide_btn_right').css({'display':'block'});
				$('#Btn > li').removeClass('active');
			}
		}

	}
}

var latlng = null; //googlemap resize用初期値
function tabChange(target){
	var self = target;
	$('#Btn > li').removeClass('active');
	self.addClass('active');
	$('#Container > div').not('#Contents_header,#' + target.data('type')).css({'display':'none'});
	$('#' + target.data('type')).css({'display':'block'});
	if(latlng){
    google.maps.event.trigger(map, 'resize');
    map.setCenter(latlng);
  }
}

function scrollMove(target){
	var self = target;
	var position = $('#' + target.data('type')).offset().top;
	var offset = null;
	var w = $(window).width();
	var x = 1100;
	if(w < 1100){ offset = -90;}
  $("html, body").animate({scrollTop:position + offset}, animateSpeed);
}

function detailHidden(targetName){
	$('.faq').stop().slideUp(animateSpeed).removeClass('active');
	$('#' + targetName).removeClass('active');
	cFlag = true;
}

function detailShow(targetName){

	if($('.faq.active').length > 0){
		$('.faq.active').stop().slideUp(animateSpeed,function(){
			$('.faq').removeClass('active');
			$('.staff_box').find('li').removeClass('active');
			//テキストを透過
			faqTextAnimate('hidden', targetName);
			$('#' + targetName + '_faq').stop().delay(300).slideDown(animateSpeed,function(){
				cFlag = true;

				//.activeを変更
				$(this).addClass('active');
				$('#' + targetName).addClass('active');
				imageChange('hidden');

				//テキストを表示
				faqTextAnimate('show', targetName);

				//スクロール
				scrollPositionSet(targetName);
			});
		});
	}else{
		//テキストを透過
		faqTextAnimate('hidden', targetName);
		$('#' + targetName + '_faq').stop().slideDown(animateSpeed,function(){
				cFlag = true;

				//.activeを変更
				$(this).addClass('active');
				$('#' + targetName).addClass('active');

				//テキストを表示
				faqTextAnimate('show', targetName);

				//スクロール
				scrollPositionSet(targetName);
		});
	}
}

function imageChange(type, targetName){
	if(type == 'show'){
		var activeImage = '<img src="../images/company/' + targetName + '_on.jpg" alt="" style="opacity:0;" class="active_img" />'
		$('#' + targetName).find('.staff_img').append(activeImage);
		$('.active_img').stop(true,true).animate({'opacity':1},animateSpeed,function(){
		});
	}else{
		$('.staff_box').find('li').not('.active').find('.active_img').stop().animate({'opacity':0},animateSpeed,function(){
			$(this).remove();
		});
	}
}

function faqTextAnimate(type, targetName){
	if(type == 'show'){
		//テキストを表示
		$('#' + targetName + '_faq').find('.faq_wrap').children().stop().delay(100).animate({opacity:1},animateSpeed);
	}else{
		//テキストを透過
		if(!isIE6 && !isIE7 && !isIE8){
			$('#' + targetName + '_faq').find('.faq_wrap').children().not('.current_01, .current_02, .current_03').css({opacity:0});
		}
	}
}


function scrollPositionSet(targetName){
	var w = $(window).width();
	var x = 1100;
	if (w <= x) {
		var offsetT = $('#' + targetName).offset().top;
		$('html,body').animate({ scrollTop: offsetT - parseInt($('#Header').height()) }, animateSpeed * 1.5);
	}
}
