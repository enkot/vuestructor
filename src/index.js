import localStore from './store/index'
import componentMixin from './mixins/componentMixin'
import Artboard from './components/Artboard.vue'
import ComponentsList from './components/ComponentsList.vue'
import BlocksList from './components/BlocksList.vue'

export const ComponentMixin = componentMixin
export const VSComponents = ComponentsList
export const VSSections = BlocksList

const GLOBAL = {
    components: [],
}

class Vuestructor {
    static register(config) {
        GLOBAL.components.push((ctx) => ctx.builder.register(config))
    }

    static install(Vue, options) {
        const { store } = options
        if (!store) {
            throw new Error('Please provide vuex store.')
        }
        const builder = new Vuestructor()

        store.registerModule('vs_store', localStore)

        Vue.prototype.$vsChangeTheme = function(components, data) {
            store.commit('vs_store/setComponents', components)
            store.commit('vs_store/setData', data)
        }

        Vue.set(builder, 'blocks', builder.blocks)
        Vue.component('VSArtboard', Vue.extend(Artboard).extend({
            provide: {
                options,
            },
        }))
        Vue.component('VSComponents', ComponentsList)
        Vue.component('VSSections', BlocksList)
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
    }
}

export default Vuestructor
