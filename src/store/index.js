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
                title: 'Header',
                data: {
                    '_id_1': { content: 'First' },
                    '_id_2': { content: 'Second' },
                    '_id_3': { content: 'Read More', link: '/more' },
                    '_id_4': { content: 'Home', link: '/home' },
                    '_id_5': { content: 'About', link: '/about' },
                    '_id_6': { content: 'More', link: '/more' },
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
                    title: { title: 'Title', type: 'title' },
                    subtitle: { title: 'Subtitle', type: 'title' },
                    button: { title: 'Main button', type: 'link' },
                    links: { 
                        title: 'Nav links',
                        type: 'list',
                        items: {
                            link: { title: 'Link', type: 'link'},
                        },
                    },
                    buttonTop: { title: 'Nav button', type: 'link' },
                },
            },
            {
                id: '_id_2',
                name: 'BenefitsBlock',
                title: 'Benefits',
                data: {
                    '_id_1': { content: 'First' },
                    '_id_2': { content: 'Second' },
                    '_id_3': { content: 'First text' },
                    '_id_4': { content: 'Second text' },
                },
                slots: {
                    benefits: [
                        { title: '_id_1', text: '_id_3' },
                        { title: '_id_2', text: '_id_4' },
                    ],
                },
                schema: {
                    benefits: {
                        title: 'Benefits',
                        type: 'list',
                        items: {
                            title: { title: 'Title', type: 'title' },
                            text: { title: 'Text', type: 'text' },
                        },
                    },
                },
            },
        ],
    },
    mutations: {
        initComponents(state, components) {
            state.components = components
        },
        addBlockItem(state, { block, listName }) {
            const schema = block.schema[listName].items
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
        setBlockData(state, { id, data, slots, schema }) {
            const item = state.blocks.find(item => item.id === id)
            item.data = data
            item.slots = slots
            item.schema = schema
        },
    },
    getters: {
        componentByName: (state) => (name) => {
            return state.components.find(item => item.name === name)
        },
    },
}
