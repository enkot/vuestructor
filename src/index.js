import Vue from 'vue'
import Artboard from './components/Artboard.vue'
import localStore from './store/index'
import mixin from './components/ComponentMixin'
import LoadingComponent from './components/Loading.vue'

export const ComponentMixin = mixin

const GLOBAL = {
    components: [],
}

class Vuestructor {
    static register(config) {
        GLOBAL.components.push((ctx) => ctx.builder.register(config))
    }

    static install(Vue, options) {
        if (!options.store) {
            throw new Error('Please provide vuex store.')
        }
        options.store.registerModule('vs_store', localStore)

        const builder = new Vuestructor()

        Vue.set(builder, 'blocks', builder.blocks)
        Vue.component('VuestructorArtboard', Vue.extend(Artboard).extend({
            beforeCreate() {
                this.$builder = builder
            },
            provide: {
                options,
            },
        }))
    }

    constructor() {
        this.components = []
        this.installComponents()
    }

    installComponents() {
        GLOBAL.components.forEach((plugin) => plugin({ builder: this }))
    }

    register({ name, component }) {
        this.components.push({
            name,
            component: component(),
        })
        // Vue.component(name, () => ({
        //     component: component(),
        //     loading: LoadingComponent,
        //     delay: 0,
        // }))
    }
}

export default Vuestructor
