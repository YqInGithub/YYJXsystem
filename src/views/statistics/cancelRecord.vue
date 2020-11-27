<template>

	<div class="cationter">
		
			<div class="row">
				<div class="mar-rg-20">
					<a-dropdown>
						<template #overlay>
							<a-menu @click="handleMenuClic">
								<div v-for="(person,i) in couponList" :key="i">
									<a-menu-item>
										<UserOutlined />{{person.couponName}}</a-menu-item>
								</div>
							</a-menu>
						</template>
						<a-button style="margin-left: 8px"> {{nowCoupon}}
							<DownOutlined />
						</a-button>
					</a-dropdown>
				</div>
				<div class="mar-rg-20">
					<a-range-picker v-model:value="value3" @change="onChange" />
				</div>
				<div>
					<a-button type="primary" @click="examine">
						确定
					</a-button>
				</div>
				<div class="f-i-1 row-re">
					<div>
						<a-button type="primary" @click="showModal">
							打印
						</a-button>
						<!-- <a-button type="primary" @click="showModal">
						Open Modal with async logic
					</a-button> -->
						<a-modal title="提示" v-model:visible="visible" :confirm-loading="confirmLoading" @ok="handleOk">
							<p>{{ ModalText }}</p>
						</a-modal>
					</div>
				</div>
			</div>
			<div class="mar-tp-32">
				<a-table :columns="columns" :data-source="data" :loading="loading" @change="handleTableChange">
					<template #name="{text}">
						<a>{{ text }}</a>
					</template>
				</a-table>
			</div>

	</div>
</template>

<script>
	import {
		UserOutlined,
		DownOutlined
	} from '@ant-design/icons-vue';
	import {
		post
	} from "../../utils/http.js"
	import qee from "qf-export-excel"


	// 表头
	let columnsType = [
		[],
		[],
		[],
		[{
				title: '优惠券',
				dataIndex: '优惠券',
				key: '优惠券',
				slots: {
					customRender: '优惠券'
				},
			},
			{
				title: '单位',
				dataIndex: '核销单位',
				key: '核销单位',
			},
			{
				title: '核销员',
				dataIndex: '核销员',
				key: '核销员',
				ellipsis: true,
			},
			{
				title: '电话',
				dataIndex: '核销员电话',
				key: '核销员电话',
				ellipsis: true,
			},
			{
				title: '用户名称',
				dataIndex: '被核销用户昵称',
				key: '被核销用户昵称',
				ellipsis: true,
			},
			{
				title: '金额',
				dataIndex: '支付金额',
				key: '支付金额',
				ellipsis: true,
			}, {
				title: '时间',
				dataIndex: '核销时间',
				key: '核销时间',
				ellipsis: true,
			}
		]
	];
	// columns =[]
	export default {
		data() {
			return {
				
				// 查看优惠券的第几页
				pageNum: 1,
				// 打印时从第几页开始查找
				numO: 1,
				// 当前查看的内容一共有多少页？？
				pageSun: 0,
				// 默认日期
				value3: [],
				nowCoupon: "请选择",
				//所有优惠券
				couponList: [],
				// 当前选择的优惠券
				couponID: "",
				//开始时间
				startDate: "",
				//结束时间
				endDate: "",
				//优惠券核销的数据
				data: [],
				//表格列数据
				columns: null,
				columnsType: columnsType,
				//表格加载数据时的等待图标
				loading: false,
				//对话框
				ModalText: '将打印此单位的所选时间段所有的核销数据。',
				visible: false,
				confirmLoading: false,
				//对话框
				//现在处于什么状态 1. look 2.print
				nowType: "look",
				// 需要打印的数据
				printData: [],
				// 当前打印是否完成
				nowPrint: false,
				// 当前查看的类型总共有多少数据
				dataSum:0
			}
		},
		components: {
			UserOutlined,
			DownOutlined,
		},
		created() {
			this.GetCouponOfAll()
		},
		methods: {
			//打开提示框
			showModal() {
				this.nowType = "print"
				if (this.examine() == "ok") {
					this.ModalText = "将打印此单位的所选时间段"+ this.nowCoupon+"所有的核销数据。"
					this.visible = true;
				}
			},
			// 点击确定开始收集所有需要打印的数据
			handleOk(e) {
				console.log("点击了确定", e);
				if (this.nowPrint == false) {
					this.nowType = "print"
					if (this.examine() == "ok") {
						this.GetCouponRecord()
					}
					this.ModalText = "正在打印数据，请等待。"
					this.confirmLoading = true;
				} else {
					this.ModalText = "将打印此单位的所选时间段"+ this.nowCoupon+"所有的核销数据。"
					this.visible = false;
					this.confirmLoading = false;
				}
			},
			//导出 表格
			exportExcel() {
				var titleList = this.columns
				var dataSource = this.printData
				var fileName = this.nowCoupon + "核销数据"
				this.ModalText = "已打印" + this.printData.length + "条数据。"
				qee(titleList, dataSource, fileName)
				// 数据加载完成时，将所有打印信息初始化
				this.printData = []
				this.confirmLoading = false;
				this.nowType = "check"
				this.numO = 1
				this.nowPrint = true
			},
			//检查
			examine() {
				if (this.couponID == "") {
					alert("请选择查找的优惠券")
					return
				} else if (this.startDate == "") {
					alert("请选择开始时间")
					return
				} else if (this.endDate == "") {
					alert("请选择结束时间")
					return
				}
				if (this.nowType != "print") {
					this.GetCouponRecord()
				}
				return "ok"
			},
			//获取记录
			GetCouponRecord() {
				const this_ = this
				if (this.nowType != "print") {
					this.loading = true;
				}
				post(this_.$api.request.GetCancelStatisticsByCoupon, {
					StartTime: this_.startDate,
					EndTime: this_.endDate,
					couponType: this_.couponID,
					Company: this_.$store.state.Company,
					page: this_.nowType == "print" ? this_.numO : this_.pageNum,
					size: this_.nowType == "print" ? 100000 : 100,
					token: this_.$store.state.token,
					userCode: this_.$store.state.user_code
				}).then((res) => {
					console.log(this_.$api.request.GetCancelStatisticsByCoupon, res);
					this_.loading = false;
					if (this_.nowType == "print") {
						if (res.data.length > 0) {
							// console.log(res.data[0]);
							// this_.dataSum = res.data[0][0].总数
							this_.printData.push.apply(this_.printData, res.data);
							this_.numO = ++this_.numO
							console.log("第几", this_.numO);
							this_.GetCouponRecord()
						} else {
							this_.exportExcel()
						}
					} else {
						if (res.data.length > 0) {
							// this_.dataSum = res.data[0].总数
							this_.pageNum = ++this_.pageNum
							this_.data.push.apply(this_.data, res.data);
						}
					}
				})
			},
			// 确定当前查看的是第几页，在最后一页的时候触发加载。
			handleTableChange(e, ee, eee, i) {
				this.pageSun = i.currentDataSource.length / e.pageSize
				if (this.pageSun == e.current) {
					this.examine()
				}
			},
			// 日期选择框返回内容
			onChange(date, dateString) {
				this.startDate = dateString[0]
				this.endDate = dateString[1]
			},
			//确定当前查看的优惠券
			handleMenuClic(e) {
				this.couponID = this.couponList[e.key].id
				this.nowCoupon = this.couponList[e.key].couponName
				this.nowPrint = false
				this.columns = this.columnsType[e.key]
			},
			//获得所有优惠券
			GetCouponOfAll() {
				const this_ = this
				post(this_.$api.request.GetCouponOfAll, {
					pageindex: 1,
					pagesize: 10,
					token: this_.$store.state.token,
					userCode: this_.$store.state.user_code
				}).then((res) => {
					console.log(this_.$api.request.GetCouponOfAll, res);
					this_.couponList = res.data
				})
			},
		},
	};
</script>

<style lang="scss">
	.cationter {
		// border: 1px solid #000;
	}
</style>
