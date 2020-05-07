import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes';
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    if(to.matched.some(record => record.meta.requiresAuth)){   

        if(store.getters['account/isLoggedIn'] && to.meta.roles.some(a => a.toLowerCase() === store.getters['account/userType'].toLowerCase())){
            return next()   
        }
        next('/account/login')
    }else{
        next()
    }
})
export default router