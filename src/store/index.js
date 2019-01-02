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
        blocks: [
            {
                id: '_id_1',
                name: 'HeaderBlock',
                data: {
                    '_id_1': { type: 'title', content: 'First' },
                    '_id_2': { type: 'title', content: 'Second' },
                    '_id_3': { type: 'link', content: 'Read More', link: '/more' },
                    '_id_4': { type: 'link', content: 'Home', link: '/home' },
                    '_id_5': { type: 'link', content: 'About', link: '/about' },
                    '_id_6': { type: 'link', content: 'More', link: '/more' },
                },
                slots: {
                    title: '_id_1',
                    subtitle: '_id_2',
                    button: '_id_3',
                    buttonTop: '_id_6',
                    links: [
                        { link: '_id_4' },
                        { link: '_id_5' },
                    ],
                },
                schema: {
                    title: { name: 'Title', type: 'title' },
                    subtitle: { type: 'title' },
                    button: { type: 'link' },
                    links: [{ 
                        link: { type: 'link'},
                    }],
                    buttonTop: { type: 'link' },
                },
            },
            {
                id: '_id_2',
                name: 'BenefitsBlock',
                data: {
                    '_id_1': { type: 'title', content: 'First' },
                    '_id_2': { type: 'title', content: 'Second' },
                    '_id_3': { type: 'text', content: 'First text' },
                    '_id_4': { type: 'text', content: 'Second text' },
                },
                slots: {
                    benefits: [
                        { title: '_id_1', text: '_id_3' },
                        { title: '_id_2', text: '_id_4' },
                    ],
                },
                schema: {
                    benefits: [{
                        title: { type: 'title' },
                        text: { type: 'text' },
                    }],
                },
            },
        ],
    },
    mutations: {
        initComponents(state, components) {
            state.components = components
        },
        addBlockItem(state, { block, listName }) {
            const schema = block.schema[listName][0]
            const newBlockItem = Object.keys(schema).reduce((acc, name) => {
                const id = generateID()
                const { type } = schema[name]

                Vue.set(block.data, id, {
                    type,
                    ...state.placeholders[type],
                })
                acc[name] = id

                return acc
            }, {})

            block.slots[listName].push(newBlockItem)
        },
        updateBlocks(state, blocks) {
            state.blocks = blocks
        },
        updateBlockData(state, { id, data }) {
            const item = state.blocks.find(item => item.id === id)
            const { uid, type, value } = data
            item.data[uid][type] = value
        },
        setBlockData(state, { id, data, slots }) {
            const item = state.blocks.find(item => item.id === id)
            item.data = data
            item.slots = slots
        },
    },
    getters: {
        componentByName: (state) => (name) => {
            return state.components.find(item => item.name === name)
        },
    },
}
