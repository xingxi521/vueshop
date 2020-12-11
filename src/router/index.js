import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../views/Layout'

import Login from '../views/Login'
import Product from '../views/Product'
import Params from '../views/Params'
import Classified from '../views/Classified'
import AddShop from '../views/AddShop'
import EditorShop from '../views/EditorShop'
import AddParams from '../views/Params/ParamsList/AddParams'
import store from '../store'
Vue.use(VueRouter)

const routes = [
	{
		path:'/login',
		name:'login',
		component:Login,
		meta:{
			needLogin:false
		}
	},
	{
		path:'/',
		component:Layout,
		children:[
			{
				path:'/',
				redirect: '/product'
			},
			{
				path:'product',
				name:'product',
				component:Product,
				meta:{
					needLogin:true
				}
			},
			{
				path:'params',
				name:'params',
				component:Params,
				meta:{
					needLogin:true
				}
			},
			{
				path:'classified',
				name:'classified',
				component:Classified,
				meta:{
					needLogin:true
				}
			},
			{
				path:'addshop',
				name:'addshop',
				component:AddShop,
				meta:{
					needLogin:true
				}
			},
			{
				path:'editorshop/:id',
				name:'editorshop',
				component:EditorShop,
				meta:{
					needLogin:true
				}
			},
			{
				path:'addparams/:cid',
				name:'addparams',
				component:AddParams,
				meta:{
					needLogin:true
				}
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

//设置全局路由导航守卫
router.beforeEach((to, from, next) => {
	if(to.matched.some(item=>item.meta.needLogin)){//先判断当前页面需不需要登陆 meta里的needLogin
		const token = store.state.LoginModule.token;//获取vuex里存的token
		if(token){
			next();
		}else{
			next({
				path:'/login'
			});
		}
	}else{
		next();
	}
});
export default router
