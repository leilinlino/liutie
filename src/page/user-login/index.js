'use strict'

require('./index.css');

require('@/common/nav-simple/index.js');
require('node_modules/font-awesome/css/font-awesome.min.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
// 错误提示的对象
var formError = {
	show: function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);

	},
	hide: function(){
		$('.error-item').hide().find('.err-msg').text(errMsg);
	}
}

var page = {
	init: function () {
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13) {
				_this.submit()
			}
		})
	},
	submit: function(){
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		// 表单验证结果
		var validateResult = this.formValiDate(formData);
		// 如果前端验证成功
		if(validateResult.status) {
			console.log('表单验证成功，继续服务端验证...');
			// 提交数据到服务器
			_user.login(formData,function(res){
				// 对encodeURIComp
			           window.location.href  = decodeURIComponent(_mm.getUrlParam('redirect')) || './index.html'
			           // console.log(_mm.getUrlParam('redirect'))
				// window.location.href = './index.html'
			},function(errMsg){
				// 错误提示
				formError.show(errMsg);
			});
		}else{
			// 前端认证失败
			formError.show(validateResult.msg);
		}
	},
	formValiDate: function(formData) {
		var result = {
			status: false,
			msg: ' '
		};
		// 验证用户名
		if ( !_mm.validate(formData.username,'require')) {
			result.msg = '用户名不能为空';
			return result;

		}
		// 验证密码
		if ( !_mm.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
			return result;

		}
		// 如果通过验证，则返回正确的提示
		result.status = true;
		result.msg = '验证通过';
		// 返回验证的结果对象
		return result;
	}
};
$(function(){
   page.init();
});
