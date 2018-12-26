import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vuestructor from '../src/index'
import 'bulma/css/bulma.css'

Vue.config.productionTip = false

Vuestructor.register({
    name: 'HeaderBlock', 
    component: () => import('./blocks/Header.vue'),
    schema: {
        title: { type: 'title' },
        subtitle: { type: 'title' },
        button: { type: 'link' },
        links: [{ 
            link: { type: 'link'},
        }],
        buttonTop: { type: 'link' },
    },
})
Vuestructor.register({
    name: 'BenefitsBlock', 
    component: () => import('./blocks/Benefits.vue'),
    schema: {
        benefits: [{
            title: { type: 'title' },
            text: { type: 'text' },
        }],
    },
})
Vuestructor.register({
    name: 'DishesBlock', 
    component: () => import('./blocks/Dishes.vue'),
    schema: {
        dishes: [{
            title: { type: 'title' }, 
            links: { type: 'links' },
        }],
    },
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