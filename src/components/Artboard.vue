<template>
    <div style="height: 100%; display: flex; flex-direction: row;">
        <div 
            class="sidebar" 
            style="display: flex; flex-direction: column;"
        >
            <draggable
                class="dragArea"
                :list="components"
                :options="{ group: { name: 'blocks', pull: 'clone', put: false }}"
                :clone="cloneItem"
            >
                <div
                    v-for="component in components"
                    :key="component.name"
                    class="element"
                >{{ component.name }}</div>
            </draggable>
            <draggable
                class="dragArea"
                :list="blockList"
                :options="{
                    animation: 150,
                }"
            >
                <div
                    v-for="block in blockList"
                    :key="block.id"
                >
                    <h4 class="title is-4">{{ block.name }}</h4>
                    <BlockEditor 
                        :block="block" 
                        @change="updateData(block.id, $event)"
                    />
                    <br>
                </div>
            </draggable>
        </div>
        <div class="artboard">
            <div 
                :style="`width:${viewport}`"
                class="fake-browser"
            >
                <ViewFrame 
                    ref="frame" 
                    class="i-frame"
                >
                    <h1 
                        v-if="!blockList.length"
                        class="drag-placeholder"
                    >Drag blocks here</h1>
                    <draggable
                        v-model="blockList"
                        class="drag-area"
                        style="height: 100%;"
                        :options="{ 
                            group: { name: 'blocks' }, 
                            delay: 100,
                            animation: 150,
                        }"
                    >
                        <ComponentInjector
                            v-for="block in blockList"
                            :key="block.id"
                            :block="block"
                            :component="componentByName(block.name)"
                            style="position: relative;"
                            @change="updateData(block.id, $event)"
                        />
                    </draggable>
                </ViewFrame>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import draggable from 'vuedraggable'
import { generatePropsFromFunc, generateID } from '../utils/index'

import ComponentInjector from './ComponentInjector.vue'
import ViewFrame from './ViewFrame.vue'
import ListWrapper from './ListWrapper.vue'
import BlockEditor from './BlockEditor.vue'

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('vs_store')

export default {
    name: 'Artboard',
    components: {
        draggable,
        ComponentInjector,
        ViewFrame,
        BlockEditor,
    },
    props: {
        viewport: {
            type: String,
            default: '100%',
        },
    },
    data() {
        return {
            fakeBrowserWidth: '400px',
            samples: 3,
        }
    },
    computed: {
        ...mapState({
            blocks: 'blocks',
            components: 'components',
        }),
        ...mapGetters({
            componentByName: 'componentByName',
            blockSlotValue: 'blockSlotValue',
        }),
        blockList: {
            get() {
                return this.blocks
            },
            set(value) {
                this.updateBlocks(value)
            },
        },
    },
    created() {
        this.initComponents(this.$builder.components)
    },
    methods: {
        ...mapMutations({
            initComponents: 'initComponents',
            updateBlocks: 'updateBlocks',
            updateBlockData: 'updateBlockData',
        }),
        updateData(id, data) {
            this.updateBlockData({ id, data })
        },
        cloneItem(component) {
            const { name } = component
            
            return this.fillBlockData(name)
        },
        fillBlockData(name) {
            return {
                id: generateID(),
                name,
                title: null,
                schema: null,
                data: null,
                slots: null,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.sidebar {
    width: 300px;
    height: 100%;
    padding: 16px;
    border-right: 1px solid #ccc;
}
.artboard {
    background-color: #eff4f6;
    flex-grow: 1;
    padding: 20px;
    display: flex;
    justify-content: center;

    .container {
        width: 90%;
    }
    .i-frame {
        width: 100%;
        height: 100%;
    }
    .fake-browser {
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0,0,0,.08);
    }
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
.element {
    padding: 20px;
    border: 1px solid #ccc;
    background: #fff;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px;
}
</style>
