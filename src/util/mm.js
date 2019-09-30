'use strict'

var Hogan = require('hogan.js');

var  conf = {
   serverHost : ' '
}
 //$ <==>  jquery 这里的ajax方法是jquery自带的方法
var _mm = {
	request : function(param){
		var _this = this;
		$.ajax({
                              type  :  param.method  || 'get',
                              url     : param.url  ||   ' '  ,
                              dataType  :  param.type  ||    'json',
                              data  : param.data   ||  ' ' ,
                              //请求成功 返回200
                              success : function (res)  {
                              	  if (0 === res.status)  {
                              	        typeof param.success === 'function' && param.success(res.data,res.msg);

                              	}else if (10 === res.status)  {
                              		//没有登录状态，统一去登录
                              	       _this.doLogin();
                                    }else if  (1 === res.status)  {
                                           typeof param.error === 'function'  &&  param.error(res.msg);
                                     }
                              	
                              },
                              //返回404 503
                              error : function(err)  {
                              typeof param.error === 'function'  &&  param.error(res.statusText);
                                     
                              }
		});
	},
	//统一跳到登录页面
	doLogin: function(){
                     window.location.href = './user-login.html?redirect='  + 
                     encodeURIComponent( window.location.href);
	},

   getServerUrl: function(path){
      return conf.serverHost + path;
   },
   getUrlParam : function(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var result = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : null;
   },
   renderHtml : function(htmlTemplate,data){
      var template = Hogan.compile(htmlTemplate);
      var result = template.render(data);
      return result;
   },
   successTips: function(msg){
      alert(msg || '操作成功');

   },

   errorTips: function(msg){
      alert(msg || '哪里不对了！');
   },

   validate : function(value,type){
      var value = $.trim(value);

      if('require' === type) {
         return !!value;
      }

      if ('phone' === type){
         return /^1\d{10}$/.test(value);
      }

      if('email' === type) {
         return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
      }
   },

   goHome: function(){
      window.location.href='./index.html';
   }
};
module.exports = _mm;