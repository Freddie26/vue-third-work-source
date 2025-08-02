import { isAdmin } from "./guards";

export default [
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/LoginView.vue'),
		meta: { layout: 'AppLayoutDefault' }
	},
	{
		path: '/',
		name: 'HomeView',
		component: () => import('../views/HomeView.vue'),
		meta: { layout: 'AppLayoutMain' },
		children: [
			{
				path: '/:id',
				name: 'TaskView',
				component: () => import('../views/TaskView.vue'),
				meta: { layout: 'AppLayoutMain' }
			},
			{
				path: '/tasks/create',
				name: 'TaskCreate',
				component: () => import('../views/TaskCreate.vue'),
				meta: {
					layout: 'AppLayoutMain',
					guards: [isAdmin],
				}
			},
			{
				path: '/tasks/edit/:id',
				name: 'TaskEdit',
				component: () => import('../views/TaskEdit.vue'),
				meta: {
					layout: 'AppLayoutMain',
					guards: [isAdmin],
				}
			}
		]
	}
]
