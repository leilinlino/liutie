'use strict'
require('./index.css');

var _mm = require('util/mm.js');

var header = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		$('.search-btn').click(function(){
			_this.searchSubmit();
		})
		$('.search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		})

	},
	onLoad: function(){
		var keyword = _mm.getUrlParam('keyword');
		if (keyword) {
			$('.search-input').val(keyword);
		}
	},
	searchSubmit: function(){

		var keyword = $.trim($('#search-btn').val());
		if (keyword){
			alert("哈哈");
			window.location.href = './list.html?keyword='  + keyword;

		}else{
			alert("玫瑰");
			_mm.goHome();

		}

	}
}

header.init();