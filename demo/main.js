import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vuestructor from '../src/index'
import 'bulma/css/bulma.css'

Vue.config.productionTip = false

Vuestructor.register({
    name: 'HeaderBlock', 
    component: () => import('./blocks/Header.vue'),
})
Vuestructor.register({
    name: 'BenefitsBlock', 
    component: () => import('./blocks/Benefits.vue'),
})
Vuestructor.register({
    name: 'DishesBlock', 
    component: () => import('./blocks/Dishes.vue'),
})
Vue.use(Vuestructor, { 
    store,
    css: [
        '/client.css',
    ],
})

new Vue({
    el: '#app',
    store,
    render: h => h(App),
})