<template>
    <DynamicElement
        ref="editArea"
        slot="reference"
        :value="blockData.content"
        :type="elementType"
        :class="`editor ${className}`"
        @change="update('content', $event)"
        @click="showPopover"
    />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { EventBus } from '../event-bus.js'

import DynamicElement from './DynamicElement.vue'

const { mapState, mapMutations, mapGetters } = createNamespacedHelpers('vs_store')

export default {
    name: 'Editor',
    components: {
        DynamicElement,
    },
    inject: ['contentWindow', 'contentDocument'],
    props: {
        uid: {
            type: String,
            required: true,
        },
        block: {
            type: Object,
            required: true,
        },
        className: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            linkEdit: false,
        }
    },
    computed: {
        blockData() {
            return this.block.data[this.uid]
        },
        elementType() {
            return this.blockData.link ? 'a' : 'div'
        },
    },
    methods: {
        ...mapMutations(['updateBlockData']),
        showPopover() {
            EventBus.$emit('show-popover', {
                reference: this.$refs.editArea.$el,
                uid: this.uid,
                block: this.block,
            })
        },
        update(type, value) {
            const { id } = this.block
            this.updateBlockData({ 
                id, 
                data: { uid: this.uid, type, value },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.block {
    background-color: #202034;
    padding: 20px;
    color: #fff;
}
.editor {
    outline: none;
    cursor: text;

    &:hover {
        outline: 1px solid rgba(204,204,204,.4);
    }
}
</style>
