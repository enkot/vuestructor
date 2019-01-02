<template>
    <div>
        <div
            v-for="(slot, slotKey) in block.slots"
            :key="slotKey"
        >
            <input 
                v-if="!Array.isArray(slot)" 
                :value="block.data[slot].content"
                type="text"
                @input="$emit('change', { uid: slot, type: 'content', value: $event.target.value})"
            >
            <div v-else>
                <h4 class="title is-5">Subtitle</h4>
                <div
                    v-for="(slotGroup, slotGroupKey) in slot"
                    :key="slotGroupKey"
                >
                    <div
                        v-for="(subSlot, subSlotKey) in slotGroup"
                        :key="subSlotKey"
                    >
                        <input 
                            :value="block.data[subSlot].content"
                            type="text"
                            @input="$emit('change', { uid: subSlot, type: 'content', value: $event.target.value})"
                        >
                    </div>
                </div>
                <button
                    @click="addBlockItem({ 
                        block, 
                        listName: slotKey,
                    })"
                >Add block</button>
            </div>
        </div>
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
    computed: {
        ...mapGetters({
            blockSlotValue: 'blockSlotValue',
        }),
    },
    methods: {
        ...mapMutations({
            addBlockItem: 'addBlockItem',
        }),
    },
}
</script>
