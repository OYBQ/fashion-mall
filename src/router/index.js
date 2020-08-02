import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载
const Home = () => import ('../views/home/Home.vue')
const Cart = () => import ('../views/cart/Cart.vue')
const Category = () => import ('../views/category/Category.vue')
const Profile = () => import ('../views/profile/Profile.vue')
const Detalil = () => import ('../views/detail/Detail.vue')


//安装插件
Vue.use(VueRouter)

//创建router

const routes = [
    {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/category',
        component: Category
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/profile',
        component: Profile
      },
      {
        path:'/detail/:iid',
        component: Detalil
      }


]
const router = new VueRouter({
    routes,
    mode:'history'



})

//导出
export default router