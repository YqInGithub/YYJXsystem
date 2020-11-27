import axios from "axios"
// import QS from "qs"
import api from "./api.js"
// import store from '../store/index.js'


// 环境的切换，自动判断使用 测试服 或 正式服
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = api.server.testURL;
} else if (process.env.NODE_ENV == 'debug') {
	axios.defaults.baseURL = api.server.testURL;
} else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = api.server.URL;
}


//请求监听
axios.interceptors.request.use(
	config => {
		// 每次发送请求之前
		// console.log("发送了请求", config);
		// // console.log("????????", store);

		// if (config.method == "post") {
		// 	let headers = {
		// 		"Accept": "application/json, text/plain, */*",
		// 		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		// 		"token": store.state.token,
		// 		"user_code": store.state.user_code
		// 	};
		// 	console.log("!====",headers);
		// 	config['headers'] = headers;
		// 	return config
		// }


		// config['headers'] = headers;
		// const token = store.state.token;
		// token && (config.headers.Authorization = token);
		// config['headers'] = headers;
		return config;
	},
	error => {
		return Promise.error(error);
	})







/**
 * 
 * @param {Object} url 如需添加 api 请到 api.js 添加接口。api.js 已全局引用，使用 this.$api 即可调用。
 * @param {Object} data 参数
 */
export function post(url, params) {
	// let address = isTest==0?api.server.testURL+url:api.server.URL+url
	let address = axios.defaults.baseURL + url
	// console.log("地址：", address);
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: address,
			data: params,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then((res) => {
			resolve(res)
		}).catch((err) => {
			reject(err)
		})
	})
}
