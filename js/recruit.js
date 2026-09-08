/**
 * Arcphilia - event
 *
 * @copyright  Arcphilia Inc.
 * @since      2014-04-30
 * @author     Yuki Noda
 */

/************************************************************************
 * recruitページ
 * エントリーフォーム調整
 *
 * 
 ***********************************************************************/
$(function(){
//  textBox は テキストボックス全てを指定。
var textBox = jQuery("input:text");

//  条件は テキストボックスにフォーカスされたら。
textBox.focus(function(){
	//  class名 "textFocus" を追加。（文字色を濃くする）
	jQuery(this).addClass("textFocus");
	
	//  if条件は HTMLで設定した初期値（value）のままかどうか
	if(this.value == this.defaultValue){
		//  trueなら テキストボックスを 空 にする
		jQuery(this).val('');
	}
//  逆に テキストボックスからフォーカスが失われたとき。
}).blur(function(){

	//  if条件は テキストボックスの数値が 空（０文字）のとき
	if(jQuery(this).val() == ''){
		//  テキストボックスの中身を 元の初期値（value）にする
		//  classも外す（文字色を元の薄い色に戻す）
		jQuery(this).val(this.defaultValue).removeClass("textFocus");
	}
});
//スキルチェックボックス
    var w = $(window).width();
    var x = 779;
    if (x <= w) {
        $('#Skill span:nth-child(3n)').after("<br>");
    }
});
