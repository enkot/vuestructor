<template>
    <iframe 
        id="i-frame" 
        @load="renderChildren" 
    />
</template>

<script>
import Vue from 'vue'

export default {
    name: 'ViewFrame',
    inject: ['options'],
    beforeUpdate() {
        // freezing to prevent unnessessary Reactifiation of vNodes
        this.FrameApp.children = Object.freeze(this.$slots.default)
    },  
    methods: {
        renderChildren() {
            const { contentWindow, contentDocument } = this.$el
            const { store, css } = this.options
            const children = this.$slots.default
            const el = document.createElement('div') // mount nested app to this element
            contentDocument.body.appendChild(el)
            contentDocument.head.innerHTML = css.map((link) => {
                return `<link rel="stylesheet" href="${link}">`
            }).join('')

            const FrameApp = new Vue({
                name: 'FrameApp',
                store,
                provide: {
                    contentWindow,
                    contentDocument,
                },
                // freezing to prevent unnessessary Reactifiation of vNodes
                data: {
                    children: Object.freeze(children),
                }, 
                render(h) {
                    return h('div', this.children)
                },
            })

            FrameApp.$mount(el) // mount into iframe

            this.FrameApp = FrameApp // cache instance for later updates
        },
    },
}
</script>
