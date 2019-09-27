'use strict'

require('./index.css');
require('../common/nav-simple/index.js');
/*var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') | | 'default'
	$element = $('.' +  type  + '-success');
	$element.show();
})*/
var _mm = require('util/mm.js');

$(function(){
	//通过浏览器地址栏获取参数拼接成一个class,再把class丢进$()里面进行元素标签选择，结果是一个【jquery对象】
	var type = _mm.getUrlParam('type') || 'default',
	$element = $('.'+ type + '-success');
	//显示对应的显示元素
	$element.show();
})
