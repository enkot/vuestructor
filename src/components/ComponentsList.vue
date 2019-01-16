<template>
    <draggable
        class="dragArea"
        :list="componentsList"
        :options="{ group: { name: 'vs-blocks', pull: 'clone', put: false }, sort: false }"
    >
        <slot :components="componentsList" />
    </draggable>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import draggable from 'vuedraggable'

const { mapState } = createNamespacedHelpers('vs_store')

export default {
    name: 'VSComponents',
    components: {
        draggable,
    },
    computed: {
        ...mapState(['components']),
        componentsList() {
            return [...this.components]
        },
    },
}
</script>