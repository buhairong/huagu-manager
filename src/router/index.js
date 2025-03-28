import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
	routes
});

// 登录鉴权
router.beforeEach((to, from, next) => {
	if (to.path != '/login') {
		let token = localStorage.getItem('token');
		if (!token) {
			next('/login');
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
