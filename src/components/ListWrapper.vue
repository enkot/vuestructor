<template>
    <Popper
        ref="popper"
        :options="{ placement: 'top' }"
    >
        <div 
            ref="popoverArea"
            class="vuestructor-popper"
        >
            <!-- <button @click="addItem">Add</button> -->
        </div>
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
    </Popper>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Popper from './Popper.vue'

const { mapMutations } = createNamespacedHelpers('vs_store')

export default {
    name: 'ListWrapper',
    components: {
        Popper,
    },
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
    methods: {
        ...mapMutations({
            addBlockItem: 'addBlockItem',
        }),
        // addItem() {
        //     this.addBlockItem({ 
        //         id: this.$vs_id, 
        //         listName: this.listName, 
        //         schema: this.$vs_schema[this.listName][0],
        //     })
        // },
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


