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
                        :options="{ group: { name: 'blocks' }, delay: 100 }"
                    >
                        <ComponentInjector
                            v-for="block in blockList"
                            :key="block.component.id"
                            :block="block"
                            :component="componentByName(block.component.name)"
                            style="position: relative;"
                            @change="updateData(block.component.id, $event)"
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

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('vs_store')

export default {
    name: 'Artboard',
    components: {
        draggable,
        ComponentInjector,
        ViewFrame,
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
            placeholders: 'placeholders',
            blocks: 'blocks',
            components: 'components',
        }),
        ...mapGetters({
            componentByName: 'componentByName',
        }),
        blockList: {
            get() {
                return this.blocks
            },
            set(value) {
                console.log(value)
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
            this.updateBlockData({
                id,
                data,
            })
        },
        cloneItem(component) {
            const { name, schema } = component
            
            return this.fillBlockData(name, schema)
        },
        fillBlockData(name, schema) {
            const data = {}
            const fillSlots = (slot, single) => {
                if (Array.isArray(slot)) {
                    const slots = slot[0]
                    const n = 3
                    
                    return single
                        ? generatePropsFromFunc(slots, fillSlots)
                        : [...Array(n)].map(() => generatePropsFromFunc(slots, fillSlots))
                } else {
                    const id = generateID()
                    const { type } = slot

                    data[id] = {
                        type,
                        ...this.placeholders[type],
                    }

                    return id
                }
            }

            const slots = fillSlots([schema], true)

            return {
                component: { 
                    id: generateID(),
                    name,
                },
                data,
                slots,
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
    .content-container {
        &:hover {

        }
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
