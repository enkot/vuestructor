<template>
    <div 
        slot="reference"
        :class="`wrapper ${className}`"
    >
        <template
            v-for="item in itemList"
        >
            <slot 
                :item="item" 
            />
        </template>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapMutations } = createNamespacedHelpers('vs_store')

export default {
    name: 'ListWrapper',
    inject: [
        '$vs_id', 
        '$vs_slots',
    ],
    props: {
        listName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            itemList: [],
            className: '',
        }
    },
    created() {
        this.className = this.$vnode.data.staticClass
        this.itemList = this.$vs_slots[this.listName]
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    &:hover {
        outline: 1px solid rgba(204,204,204,.4);
    }
}
</style>


