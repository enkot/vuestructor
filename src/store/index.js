import Vue from 'vue'
import { generateID } from '../utils/index'

export default {
    namespaced: true,
    state: {
        placeholders: {
            title: { content: 'Title here' },
            link: { content: 'Link', link: '/link' },
            button: { content: 'Button', link: '/button-link' },
            text: { content: 'Text content here' },
        },
        components: [],
        blocks: [],
    },
    mutations: {
        setComponents(state, components) {
            state.components = [...components]
        },
        setData(state, data) {
            state.blocks = [...data]
        },
        addNewBlock({ blocks }, { index, block }) {
            blocks.splice(index, 0, block)
        },
        moveBlock({ blocks }, { newIndex, oldIndex }) {
            blocks.splice(newIndex, 0, blocks.splice(oldIndex, 1)[0])
        },
        addBlockItem({ placeholders }, { block, listName }) {
            const schema = block.schema[listName].items
            const newBlockItem = Object.keys(schema).reduce((acc, name) => {
                const id = generateID()
                const { type } = schema[name]

                Vue.set(block.data, id, {
                    type,
                    ...placeholders[type],
                })
                acc[name] = id

                return acc
            }, {})

            block.slots[listName].push(newBlockItem)
        },
        removeBlockItem(_, { block, index, listName }) {
            block.slots[listName].splice(index, 1)
        },
        updateBlockData(state, { id, data }) {
            const item = state.blocks.find(item => item.id === id)
            const { uid, type, value } = data
            item.data[uid][type] = value
        },
        setBlockData(state, { id, title, data, slots, schema }) {
            const item = state.blocks.find(item => item.id === id)
            item.title = title
            item.data = data
            item.slots = slots
            item.schema = schema
        },
        removeBlock(state, id) {
            state.blocks = state.blocks.filter(item => item.id !== id)
        },
    },
    getters: {
        componentByName: (state) => (name) => {
            return state.components.find(item => item.name === name)
        },
    },
}
