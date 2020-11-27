<template>
	<div class="cationter col-bg-man cent">
		<div class="cent login-b b-show col-bg-pro rad-5">
			<div class="col-sb l-b-i ">
				<div class="row">
					<div>账号：</div>
					<div>
						<a-input placeholder="账号" v-model:value="username" />
					</div>
				</div>
				<div class="row">
					<div>密码：</div>
					<div>
						<a-input type="password" placeholder="密码" v-model:value="password" @keyup.enter="login" />
					</div>
				</div>
				<a-button type="primary" @click="login">
					登陆
				</a-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		post
	} from "../utils/http.js"
	import {
		add,
		getDataByKey
	} from "../utils/utils.js"
	export default {
		name: 'login',
		data() {
			return {
				username: "",
				password: ""
			}
		},
		created() {
			const this_ = this
			getDataByKey(this.$store.state.db, this.$api.store.userInfo, "login").then((res) => {
				if (res != undefined) {
					this_.$router.push("/")
				}
			})
		},
		methods: {
			login() {
				if(this.username == ""){
					alert("请检查账号")
					return
				}else if(this.password == ""){
					alert("请检查密码")
					return
				}
				const this_ = this
				post(this_.$api.request.login, {
					// str: "admi",
					// pwd: "123456",
					str: this_.username,
					pwd: this_.password,
					token: ""
				}).then((res) => {
					console.log(this_.$api.request.login, res);
					if (res.data.length > 0) {
						//将登陆成功的信息储存到本地数据库
						this_.$store.state.token = res.data[0].token
						this_.$store.state.user_code = res.data[0].user_code
						add(this_.$store.state.db, this_.$api.store.userInfo, {
							name: "login",
							data: res.data[0]
						}).then(()=>{
							//成功后跳转到主页
							this_.$router.push("/")
						},(err)=>{
							console.log("登陆信息写入错误",err);
						})
					}else if(res.data =="-1"){
						alert("登陆失败，请刷新重试")
					}else if(res.data =="-2"){
						alert("账户名或密码错误")
					}

				}, (err) => {
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss">
	.cationter {
		width: 100vw;
		height: 100vh;

		.login-b {
			height: 15rem;
			width: 20rem;
			padding: 1rem;

			.l-b-i {
				height: 7rem;
			}
		}
	}
</style>
