import {
	createRouter,
	createWebHistory
} from 'vue-router'

const routes = [{
		path: '/:id',
		name: 'index',
		// 携带参数，用作是否需要登陆
		meta: {
			auth: true
		},
		component: () => import('../views/index.vue'),
		children: [{
			path: '/',
			component: () => import('../views/indexContent.vue')
		},{
			path: '/statistics/cancelRecord',
			component: () => import('../views/statistics/cancelRecord.vue')
		},{
			path: '/audit/audit',
			component: () => import('../views/audit/audit.vue')
		}]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	}
	// , {
	// 	path: '/',
	// 	name: 'film',
	// 	component: () => import('../views/indexContent.vue')
	// }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
