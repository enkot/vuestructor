import Editor from './Editor.vue'

export default {
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
    render() {
        const { component, data } = this.block
        const DynamicComponent = component.name

        return <DynamicComponent
            {...{
                scopedSlots: {
                    default: ({ uid, className }) => {
                        return <Editor
                            className={className}
                            data={data[uid]}
                            onChange={values => {
                                this.$emit('change', { uid, ...values })
                            }}
                        />
                    },
                },
            }}
        />
    },
}
