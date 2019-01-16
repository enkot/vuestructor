import ListWrapper from '../components/ListWrapper.vue'

export default {
    inject: [
        '$vs_id', 
        '$vs_slots',
    ],
    components: {
        'vs-list': ListWrapper,
    },
}
