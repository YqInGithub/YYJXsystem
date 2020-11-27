<template>
	<div>
		<a-config-provider :locale="locale">
			<router-view />
		</a-config-provider>
	</div>

</template>
<script>
	// import axios from "axios"
	
	
	
	// import { i18nRender } from '@/locales'
	import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
	import moment from 'moment';
	import 'moment/locale/zh-cn';
	moment.locale('zh-cn');
	export default {
		name: 'login',
		data() {
			return {
				locale: zh_CN,
				zhanghao: "",
				mima: ""
			}
		},
		setup() {
			function login() {
				// axios({
				// 	method: 'post',
				// 	url: 'http://192.168.0.188:8080/Data/Tback/Users/SysLogin.ashx',
				// 	data: {
				// 		str: "admin",
				// 		pwd: "123456",
				// 		token: ""
				// 	},
				// 	headers: {
				// 		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				// 	}
				// }).then((res) => {
				// 	console.log("登陆成功", res);
				// }).catch((err) => {
				// 	console.log("登陆错误", err);
				// })
			}
			return {
				login
			}
		},
		computed: {
			// locale() {
			// 	// 只是为了切换语言时，更新标题
			// 	const {
			// 		title
			// 	} = this.$route.meta
			// 	title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))

			// 	// 原先的en-US改成zh-CN即可
			// 	return this.$i18n.getLocaleMessage('zh-CN').antLocale
			// }
		}
	}
</script>


<style lang="scss">

</style>
