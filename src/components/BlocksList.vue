<template>
    <draggable
        class="dragArea"
        :list="blocksList"
        :options="{ animation: 150 }"
        @change="onBlockListChange"
    >
        <slot :sections="blocksList" />
    </draggable>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import draggable from 'vuedraggable'

const { mapState, mapMutations } = createNamespacedHelpers('vs_store')

export default {
    name: 'VSSections',
    components: {
        draggable,
    },
    computed: {
        ...mapState(['blocks']),
        blocksList() {
            return [...this.blocks]
        },
    },
    methods: {
        ...mapMutations([
            'moveBlock',
        ]),
        onBlockListChange({ moved }) {
            const { newIndex, oldIndex } = moved
            this.moveBlock({ newIndex, oldIndex })
        },
    },
}
</script>