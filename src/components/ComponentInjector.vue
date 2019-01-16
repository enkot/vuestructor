<template>
    <component 
        :is="asyncComponent"
        class="component-block"
    >
        <template slot-scope="{ val, className }">
            <Editor
                :class-name="className"
                :uid="val"
                :block="block"
            />
        </template>
    </component>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { generateID, generateBlockData } from '../utils'

import Editor from './Editor.vue'
import Loading from './Loading.vue'

const { mapState, mapMutations, mapGetters } = createNamespacedHelpers('vs_store')

export default {
    name: 'ComponentInjector',
    components: {
        Editor,
    },
    props: {
        block: {
            type: Object,
            required: true,
        },
    },
    data() {
        const { id, slots } = this.block

        return {
            asyncComponent: Loading,
            provideValues: {
                $vs_id: id,
                $vs_slots: slots,
            },
        }
    },
    computed: {
        ...mapState(['placeholders']),
        ...mapGetters(['componentByName']),
    },
    watch: {
        block() {
            this.updateComponent()
        },
    },
    created() {
        this.updateComponent()
    },
    provide() {
        // return reactive object
        return this.provideValues
    },
    methods: {
        ...mapMutations([
            'setBlockData',
        ]),
        async updateComponent() {
            const { name, data } = this.block
            const componentData = this.componentByName(name)
            const component = await componentData.component()

            // Fill block data if empty
            if (!data) this.fillBlockData(component.schema)
            this.asyncComponent = component
        },
        fillBlockData(schema) {
            const { id } = this.block
            const { slots, data } = generateBlockData(schema, this.placeholders)

            this.setBlockData({ id, data, slots, schema })
            this.provideValues.$vs_slots = slots
        },
    },
}
</script>

<style lang="scss" scoped>
</style>

