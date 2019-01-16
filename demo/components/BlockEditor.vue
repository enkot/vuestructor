<template>
    <div>
        <div
            v-for="(slot, slotKey) in block.slots"
            :key="slotKey"
        >
            <div v-if="block.schema[slotKey].type === 'list'">
                <h4 class="title is-5">{{ block.schema[slotKey].title }}</h4>
                <div
                    v-for="(slotList, slotListIndex) in slot"
                    :key="slotListIndex"
                >
                    <div
                        v-for="(slotItem, slotItemKey) in slotList"
                        :key="slotItemKey"
                    >
                        <input 
                            :value="block.data[slotItem].content"
                            class="input"
                            type="text"
                            @input="updateData({ uid: slotItem, type: 'content', value: $event.target.value})"
                        >
                    </div>
                    <button
                        class="button is-small"
                        @click="removeBlockItem({ 
                            block,
                            index: slotListIndex, 
                            listName: slotKey,
                        })"
                    >Remove</button>
                </div>
                <button
                    class="button is-small"
                    @click="addBlockItem({ 
                        block, 
                        listName: slotKey,
                    })"
                >Add block</button>
            </div>
            <input 
                v-else
                :value="block.data[slot].content"
                type="text"
                class="input"
                @input="updateData({ uid: slot, type: 'content', value: $event.target.value})"
            >
        </div>
        <button
            class="button is-small is-danger"
            @click="removeBlock(block.id)"
        >Remove block</button>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('vs_store')

export default {
    name: 'BlockEditor',
    props: {
        block: {
            type: Object,
            required: true,
        },
    },
    methods: {
        ...mapMutations([
            'updateBlockData',
            'addBlockItem', 
            'removeBlock', 
            'removeBlockItem',
        ]),
        updateData(data) {
            const { id } = this.block
            this.updateBlockData({ id, data })
        },
    },
}
</script>
