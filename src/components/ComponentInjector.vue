<template>
    <component :is="component.name">
        <template slot-scope="{ uid, className }">
            <Editor
                :class-name="className"
                :data="block.data[uid]"
                @change="editorChanged(uid, $event)"
            />
        </template>
    </component>
</template>

<script>
import Editor from './Editor.vue'

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
    provide() {
        const { component, slots } = this.block
        const { schema } = this.component
        return {
            $vs_id: component.id,
            $vs_schema: schema,
            $vs_slots: slots,
        }
    },
    methods: {
        editorChanged(uid, values) {
            this.$emit('change', { uid, values })
        },
    },
}
</script>
