export default {
	// 服务器
	server:{
		URL:"http://baidu.com",
		testURL:"http://192.168.0.188:8080"
	},
	// 请求类型
	request:{
		// 登陆
		login:"/Data/Tback/Users/SysLogin.ashx",
		// 得到所有的优惠券
		GetCouponOfAll:"/Data/Coupon/GetCouponOfAll.ashx",
		// 获取优惠券核销表
		GetCancelStatisticsByCoupon: "/Data/Tback/Coupon/GetCancelStatisticsByCoupon.ashx",
		// 查询申请核销权限列表
		GetCouponGet: "/Data/Tback/Coupon/GetCouponGet.ashx",
		// 审核权限放行
		ApplyCheck:"/Data/Tback/Coupon/ApplyCheck.ashx"
	},
	// 本地数据库的所有表
	store:{
		// 储存用户信息的表
		// 
		userInfo:"userInfo"
	}
}