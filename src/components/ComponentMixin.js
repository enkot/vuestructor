import ListWrapper from './ListWrapper.vue'

export default {
    inject: [
        '$vs_id', 
        '$vs_schema', 
        '$vs_slots',
    ],
    components: {
        'vs-list': ListWrapper,
    },
}
