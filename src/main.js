import {
	createApp
} from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './utils/api.js'
import {
	getDataByKey
} from './utils/utils.js'
const app = createApp(App)





// 将所有 api 全局挂载
app.config.globalProperties.$api = api
app.use(Antd).use(VueAxios, axios).use(store).use(router).mount('#app')





// router.beforeEach((to, from, next) => {
// 	if (to.meta.auth==true) {
		
// 		next()
// 		// next("/login");
// 		// if (store.state.loginStatus === 1) {
// 		// 	next();
// 		// } else {
// 		// 	next("/login");
// 		// }
// 	} else {
// 		next();
// 	}
// })















// 创建 indexedDB 储存所有数据
let request = indexedDB.open('localhostData');
//数据库
var db;
// err
request.onerror = e => {
	console.log('数据库打开/创建报错', e)
}
// success
request.onsuccess = e => {
	console.log('数据库打开/创建成功', e)
	db = request.result;
	//将数据库提升至 vuex
	store.state.db = db
	
	getDataByKey(db, "userInfo", "login").then((res) => {
		console.log("已创建本地缓存", res);
		store.state.token = res.data.token
		store.state.user_code = res.data.user_code
		store.state.Company = res.data.Company
		if (res == undefined) {
			// 没有登陆跳转 login 
			router.push('/login')
		}
	}, (err) => {
		console.log("未登录", err);
		router.push('/login')
	})
}

/**
 * 创建 数据库仓库/表
 * 主键 name 作用：储存用户信息类型的标识
 * 字段 data 储存的数据
 * @param {Object} e
 */
request.onupgradeneeded = function(e) {
	db = e.target.result;
	//数据表
	var objectStore;
	if (!db.objectStoreNames.contains('userInfo')) {
		// 第一次打开时跳转到 login 
		router.push('/login')
		objectStore = db.createObjectStore('userInfo', {
			keyPath: 'name'
		});
		objectStore.createIndex('data', 'data', {
			unique: false
		});
		console.log("本地第一次登陆", objectStore);
	}
}
