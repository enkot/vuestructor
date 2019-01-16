<template>
    <div class="browser">
        <ViewFrame 
            ref="frame" 
            class="frame"
        >
            <Popover ref="popper" />
            <h1 
                v-if="!blocksList.length"
                class="drag-placeholder"
            >Drag blocks here</h1>
            <draggable
                :list="blocksList"
                class="drag-area"
                style="height: 100%;"
                :options="{ 
                    group: { name: 'vs-blocks' }, 
                    delay: 100,
                    animation: 150,
                }"
                @change="onBlockListChange"
            >
                <ComponentInjector
                    v-for="block in blocksList"
                    :key="block.id"
                    :block="block"
                    style="position: relative;"
                />
            </draggable>
        </ViewFrame>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import draggable from 'vuedraggable'
import { generateID } from '../utils/index'

import ComponentInjector from './ComponentInjector.vue'
import ViewFrame from './ViewFrame.vue'
import Popover from './Popover.vue'

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('vs_store')

export default {
    name: 'Artboard',
    components: {
        draggable,
        ComponentInjector,
        ViewFrame,
        Popover,
    },
    data() {
        return {
            samples: 3,
        }
    },
    computed: {
        ...mapState(['blocks']),
        ...mapGetters(['blockSlotValue']),
        blocksList() {
            return [...this.blocks]
        },
    },
    methods: {
        ...mapMutations([
            'addNewBlock',
            'moveBlock',
            'updateBlocks',
        ]),
        onBlockListChange({ added, moved }) {
            if (added) {
                const { newIndex, element } = added
                const { name } = element
                this.addNewBlock({
                    index: newIndex,
                    block: {
                        id: generateID(),
                        name,
                        schema: null,
                        data: null,
                        slots: null,
                    },
                })
            }
            if (moved) {
                const { newIndex, oldIndex } = moved
                this.moveBlock({ newIndex, oldIndex })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.browser {
    height: 100%;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0,0,0,.08);
}
.frame {
    width: 100%;
    height: 100%;
}
.drag-placeholder {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #ccc;
    font-size: 1.5rem;
    top: 20%;
}
.block {
    cursor: pointer;
}
</style>
