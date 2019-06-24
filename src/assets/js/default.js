/*页面默认js*/
import Vue from 'vue'
import axios from 'axios';
// //VConsole配置
import VConsole from 'vconsole'

var sis = true
axios.get("http://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web&code=2Vi7kc9K99nW2D1pX97")
.then(res=>{
	console.log(res)
	console.log(JSON.parse(decodeURIComponent(res.data.data.content.info)).custom.is_consolelog.val)
	sis = JSON.parse(decodeURIComponent(res.data.data.content.info)).custom.is_consolelog.val
	if(sis=='true'){
		if (process.env.NODE_ENV == 'development'){ const vConsole = new VConsole() }
	}
})


//const vConsole = new VConsole()
//腾讯统计
var _mtac = {"senseQuery":1}; (function() { var mta = document.createElement("script"); mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4"; mta.setAttribute("name", "MTAH5"); mta.setAttribute("sid", "500684993"); mta.setAttribute("cid", "500684994"); var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(mta, s);;})(); 
document.body.addEventListener('touchmove', function(e){
	// e.preventDefault();
	e.stopPropagation();
}, { passive: false });
document.getElementById('app').addEventListener('touchmove', function(e){
	// e.preventDefault();
	e.stopPropagation();
}, { passive: false });
//获取app token			
// window.webkit.messageHandlers.webViewApp.destroyPage()

