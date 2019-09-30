'use strict'

var _mm = require('util/mm.js');

var _user ={
	// 1、登出
	logout: function (resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	// 2、核对用户信息
	checkLogin: function (resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	// 3、登录
	// 从客户端的from表单中获取userinfo,提交到服务器进行验证
	// 如果验证通过，则执行resolve回调函数；如果验证没通过，则执行
	// reject回调函数
	login: function (userInfo,resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/login.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		})
	},
	// 4、验证用户名
	
	checkUsername: function (username,resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/check_valid.do'),
			data: username,
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	// 5、用户注册
	register: function (userInfo,resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/register.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	// 6、获取用户密码提示问题
	getQuestion: function (username,resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_get_question.do'),
			data: {
				username: username
			},
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
            // 7、重置密码
	resetPassword: function (userInfo,resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_reset_password.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	// 8、核对问题的答案
	checkAnswer: function (userInfo,resolve,reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_check_answer.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	}
	

     
}

module.exports = _user;