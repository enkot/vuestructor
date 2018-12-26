<template>
    <component
        :is="type"
        contenteditable="true"
        @blur="update"
        @click="$emit('click')"
    />
</template>

<script>
export default {
    name: 'DynamicElement',
    props: {
        type: {
            type: String,
            default: 'div',
        },
        value: {
            type: String,
            default: '',
        },
    },
    mounted() {
        this.$el.innerHTML = this.value
    },
    methods: {
        update(event) {
            this.$emit('change', event.target.innerHTML)
        },
    },
}
</script>

