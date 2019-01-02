<template>
    <component
        :is="type"
        contenteditable="true"
        @input.prevent="update"
        @click="$emit('click')"
        @focus="isEditing = true"
        @blur="isEditing = false"
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
    data() {
        return {
            isEditing: false,
        }
    },
    watch: {
        value(val) {
            if (this.isEditing) return
            this.$el.innerHTML = val
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

