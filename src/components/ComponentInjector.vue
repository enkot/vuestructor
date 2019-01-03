<template>
    <component 
        :is="asyncComponent"
        class="component-block"
    >
        <template slot-scope="{ val, className }">
            <Editor
                :class-name="className"
                :data="block.data[val]"
                @change="editorChanged(val, $event)"
            />
        </template>
    </component>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { generateID } from '../utils/index'

import Editor from './Editor.vue'
import Loading from './Loading.vue'

const { mapState, mapMutations } = createNamespacedHelpers('vs_store')

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
        component: {
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
        ...mapState({
            placeholders: 'placeholders',
        }),
    },
    async created() {
        const component = await this.component.component
        
        // Fill block data if empty
        if (!this.block.data) {
            this.fillBlockData(component.schema)
        }

        this.asyncComponent = component
    },
    provide() {
        // return reactive object
        return this.provideValues
    },
    methods: {
        ...mapMutations({
            setBlockData: 'setBlockData',
        }),
        fillBlockData(schema) {
            const { id } = this.block
            const { slots, data } = generateBlockData(schema, this.placeholders)

            this.setBlockData({ id, data, slots, schema })
            this.provideValues.$vs_slots = slots
        },
        editorChanged(uid, values) {
            this.$emit('change', { uid, ...values })
        },
    },
}

function generateBlockData(schema, placeholders, data = {}) {
    return {
        slots: getFilledSlots(schema),
        data,
    }

    function getFilledSlots(schema, root = true) {
        if (root) return getFilledSchemaItem(schema)
        if (schema.type === 'list') {
            schema = schema.items
            
            return [...Array(3)].map(() => getFilledSchemaItem(schema))
        }

        return getFilledDataId(schema)
    }
    function getFilledSchemaItem(schema) {
        return Object.keys(schema).reduce((acc, name) => {
            acc[name] = getFilledSlots(schema[name], false)
            return acc
        }, {})
    }
    function getFilledDataId({ type }, id = generateID()) {
        data[id] = { type, ...placeholders[type] }

        return id
    }
}
</script>

<style lang="scss" scoped>
</style>

