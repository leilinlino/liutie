//请求Nodejs提供的path模块
//path有一个方法：resolve(参数1，参数2)
//参数1：_dirnmae表示当前目录的路径
//参数2：需要追加的目录名，不需要写/，resolve方法会帮我们自动追加/
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var str = new Buffer('aHR0cDovL3Rlc3QuaGFwcHltbWFsbC5jb20v', 'base64');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
var getHtmlConfig = function (name, title) {
     return{
 	template : './src/view/' + name +'.html',
	filename:'view/' + name +'.html',
	title:title,
	inject:  true,
	hash: true,
	chunks:['common', name]
 	}
 }

var config =  {
	entry: {
           'common': ['./src/page/common/index.js'],
	'index': './src/page/index/index.js',
	'user-login': './src/page/user-login/index.js',
	'user-result':'./src/page/user-result/index.js',
	'user-register':'./src/page/user-register/index.js',
	'user-pass-reset':'./src/page/user-pass-reset/index.js',
            },

	output:{
	path:path.resolve(__dirname,'dist'),
	publicPath: '/dist',
	filename:'js/[name].js'
	},
	externals: {
	'jquery'   :   'window.jQuery'
	},

	/*optimization: {
		//抽取公共模块的对象
		splitChunks: {
			//缓存组
			cacheGroups: {
				//commons表示公共模块
				commons:  {
					name: 'base',
					chunks: 'initial',
					minChunks: 2,
					minSize: 0
				}
			}
		}
	},*/
	module: {
	rules:
	 [
	     {
		test : /\.css$/,
		loader:ExtractTextPlugin.extract({
		fallback:"style-loader",
		use:"css-loader",

		})
	        },
		 

	 //        {
		// test:/\.(git|png|jpg|woff|svg|eot|ttf).??.*$/,
		// loader: 'url-loader?limit=100&name=resource/[name].[ext]'
	 //        }
	        {
		
		  test:/\.(gif|png|jpg|woff|svg|eot|ttf).??.*$/,
		   loader: 'url-loader?limit=100&name=resource/[name].[ext]'
	       },
	       {
	       	test:/\.string$/,
	       	loader: "html-loader"
	       }
         ]
},

	plugins: [
	new ExtractTextPlugin("css/[name].css"),
	new  HtmlWebpackPlugin(getHtmlConfig('index','首页')),
	new  HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
	new  HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
	new  HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
	new HtmlWebpackPlugin(getHtmlConfig('user-result','操作结果')),
	
	],
	resolve: {
	        alias: {
	        	util : path.resolve( __dirname , 'src/util'),
	        "@" :  path.resolve( __dirname , 'src/page'),
	        	node_modules: path.resolve(__dirname,'node_modules'),
	        	service : path.resolve( __dirname , 'src/service')
	        }
	},
	devServer: {
		port: 8088,
		inline: true,
		proxy: {
			"**/*.do": {
				target: str.toString(),
				changeOrigin: true
			}
		}
	}
}

if ('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}
module.exports  =  config;