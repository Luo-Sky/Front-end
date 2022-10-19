import VueRouter from 'vue-router'

import ObjExtract from '../pages/ObjExtract.vue'
import ObjChange from '../pages/ObjChange.vue'
import ObjDetection from '../pages/ObjDetection.vue'
import ObjClassification from '../pages/ObjClassification.vue'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Personal from '../pages/Personal'
import Maillogin from '../pages/Maillogin'
import Search from '../pages/Search'
import History from '../pages/History'
import About from '../pages/About'
import Help from '../pages/Help'
import Work from '../pages/Work'

const router = new VueRouter({
	mode:"history",
	routes: [{
			name: 'extract',
			path: '/extract',
			component: ObjExtract,

		},
		{
			name: 'change',
			path: '/change',
			component: ObjChange,

		},
		{
			name: 'detection',
			path: '/detection',
			component: ObjDetection,

		},
		{
			name: 'classification',
			path: '/classification',
			component: ObjClassification,

		},

		{
			path: '/home',
			component: Home,
			meta: {
				footerShow: true
			}
		},
		{
			path: '/login',
			component: Login,
			meta: {
				footerShow: false
			}
		},
		{
			path: '/register',
		 component: Register,
			meta: {
				footerShow: false
			}
		},
		{
		 path: '/maillogin',
			component: Maillogin,
			meta: {
				footerShow: false
			}
		},
		{
			path: '/search',
			component: Search,
			meta: {
				footerShow: false
			}
		},
		{
			path: '/history',
			component: History,
			meta: {
				footerShow: false
			}
		},
		
		{
			path: '/about',
			component: About,
			meta: {
				footerShow: false
			}
		},
		{
			path: '/help',
			component: Help,
		 meta: {
				footerShow: false
			}
		},
		{
			path: '/work',
			component: Work,
			meta: {
				footerShow: false
			}
		},
		{
			path: '/personal',
			component: Personal,
			meta: {
				footerShow: false
			},
		},
		// 重定向
		{
			path: '*',
			redirect: '/Home',
			meta: {
				footerShow: false
			}

		}
	]
})


export default router
