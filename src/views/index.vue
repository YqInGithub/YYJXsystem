<template>
	<a-layout id="components-layout-demo-custom-trigger">
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
			<div class="logo" />
			<a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark" :inline-collapsed="collapsed">
				<router-link to="/">
					<a-menu-item key="1">
						<HomeOutlined />
						<span>首页</span>
					</a-menu-item>
				</router-link>
				<a-sub-menu key="sub1">
					<template #title>
						<span>
							<PieChartOutlined /><span>统计</span></span>
					</template>
					<router-link to="/statistics/cancelRecord">
						<a-menu-item key="5">优惠券核销</a-menu-item>
					</router-link>
				</a-sub-menu>
				<a-sub-menu key="sub2">
					<template #title>
						<span>
							<TrademarkCircleOutlined />
							<span>审核</span></span>
					</template>
					<router-link to="/audit/audit">
						<a-menu-item key="6">审核</a-menu-item>
					</router-link>
				</a-sub-menu>
<!-- 				<a-menu-item key="4">
					<AppstoreOutlined />
					<span>全部</span>
				</a-menu-item> -->
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header style="background: #fff; padding: 0">
				<menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
				<menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
			</a-layout-header>
			<a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
				<div style="min-height: 100vh;">
					<div>
						<router-view />
					</div>
				</div>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script>
	import {
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		PieChartOutlined,
		HomeOutlined,
		// AppstoreOutlined,
		TrademarkCircleOutlined
	} from '@ant-design/icons-vue';

	export default {
		components: {
			MenuUnfoldOutlined,
			MenuFoldOutlined,
			PieChartOutlined,
			HomeOutlined,
			// AppstoreOutlined,
			TrademarkCircleOutlined
		},
		data() {
			return {
				selectedKeys: ['1'],
				collapsed: false,
				//默认打开有子选项的？
				openKeys: [],
				preOpenKeys: [],
			};
		},
		watch: {
			openKeys(val, oldVal) {
				this.preOpenKeys = oldVal;
			},
		},
		methods: {
			// toggleCollapsed() {
			// 	this.collapsed = !this.collapsed;
			// 	this.openKeys = this.collapsed ? [] : this.preOpenKeys;
			// },
		},
	};
</script>
<style>
	#components-layout-demo-custom-trigger .trigger {
		font-size: 18px;
		line-height: 64px;
		padding: 0 24px;
		cursor: pointer;
		transition: color 0.3s;
	}

	#components-layout-demo-custom-trigger .trigger:hover {
		color: #1890ff;
	}

	#components-layout-demo-custom-trigger .logo {
		height: 32px;
		background: rgba(255, 255, 255, 0.2);
		margin: 16px;
	}
</style>
