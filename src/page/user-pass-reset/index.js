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
		$('.error-item').hide().find('.err-msg').text('');
	}
}

var page = {
             //备用
	data: {
		username: ' ',
		question: ' ',
		answer: ' ',
		token: ' '
	},
	init: function () {
		// 为了显示第一步
		this.onLoad();
		this.bindEvent();
	},
	// 默认加载
	onLoad: function(){
		// 加载输入用户名
		this.loadStepUsername();
	},
	// 加载用户名的一步
	loadStepUsername: function(){
		$('.step-username').show();

	},
	// 加载输入密码提示问题的一步
	loadStepQuestion: function(){
		// 清除错误的提示
		formError.hide();
		// 做容器的切换
		$('.step-username').hide()
		.siblings('.step-question').show()
		.find('.question').text(this.data.question)

	},
	// 加载输入密码的一步
	loadStepPassword: function(){
		// 清除错误的提示
		formError.hide();
		// 做容器的切换
		$('.step-question').hide()
		      .siblings('.step-password').show();
		
	},
	// 绑定事件的参数
	bindEvent: function(){
		var _this = this;
		$('#submit-username').click(function(){
			var  username = $.trim($('#username').val());
			// 如果已经输入了用户名
			if(username) {
				// 判断用户名是否存在
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
                                                      // 加载下一步的问题
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			else{
				formError.show('请输入用户名');
			}
		});

		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if (answer){
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				}, function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					// 下一步
					_this.loadStepPassword();
				}, function(errMsg){
					formError.show(errMsg);
				})

			}else{
				formError.show('请输入用户问题的答案');
			}
		});
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			if(password && password.length >= 6 ){
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				}, function(res){
					window.location.href = './user-result.html?type=pass-reset'

				}, function(errMsg){
					formError.show(errMsg);

				});
			}
			else{
				formError.show('请输入不少于6位的新密码');
			}
		});
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
