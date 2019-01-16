<template>
    <div 
        ref="popper"
        class="vuestructor-popper popper"
    >
        <div 
            x-arrow 
            class="popper__arrow" 
        />
        <div 
            v-if="linkEdit"
            class="group-block"
        >
            <input
                v-model="linkValue"
                type="text" 
                placeholder="Link here"
            >
            <button 
                class="submit-button"
                @click="update('link', linkValue)"
            >OK</button>
        </div>
        <div 
            v-else
            class="group-block"
        >
            <button
                @click="execCommand('bold')"
            >B</button>
            <button
                @click="execCommand('italic')"
            >I</button>
            <button
                v-if="block && blockData.link"
                @click="editLinkMode(true)"
            >Link</button>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Popper from 'popper.js'
import { EventBus } from '../event-bus.js'
import { isSameElements } from '../utils'

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('vs_store')

export default {
    name: 'Popover',
    inject: ['contentWindow', 'contentDocument'],
    data() {
        return {
            linkEdit: false,
            linkValue: '',
            popperInstance: null,
            popperNode: null,
            reference: null,
            uid: null,
            block: null,
        }
    },
    computed: {
        blockData() {
            return this.block.data[this.uid]
        },
    },
    mounted() {
        this.popperNode = this.$refs.popper
        this.popperNode.style.display = 'none'

        EventBus.$on('show-popover', ({ reference, uid, block }) => {
            this.reference = reference
            this.uid = uid
            this.block = block
            this.linkValue = this.blockData.link

            this.showPopover()
        })

        this.contentDocument.body.addEventListener('click', this.hidePopover)
    },
    destroyed() {
        this.contentDocument.body.removeEventListener('click', this.hidePopover)
    },
    methods: {
        ...mapMutations({
            updateBlockData: 'updateBlockData',
        }),
        async editLinkMode(active) {
            this.linkEdit = active
            await this.$nextTick()
            this.popperInstance.update()
        },
        async showPopover() {
            this.linkEdit = false
            await this.$nextTick()
            this.popperInstance && this.popperInstance.destroy()
            this.popperInstance = new Popper(
                this.reference, 
                this.popperNode, 
                {
                    placement: 'top',
                },
            )
            this.popperNode.style.display = 'block'
            this.popperInstance.update()
        },
        hidePopover({ target }) {
            if (isSameElements(this.reference, target) 
                || isSameElements(this.popperNode, target))
                return

            this.popperNode.style.display = 'none'
        },
        update(type, value) {
            this.updateBlockData({ 
                id: this.block.id, 
                data: { uid: this.uid, type, value },
            })
            this.editLinkMode(false)
        },
        execCommand(sCmd, sValue) {
            this.contentDocument.execCommand(sCmd, false, sValue)
        },
    },
}
</script>


<style lang="scss" scoped>
$buttonPrimary: #3676D9;
$buttonGrey: #e2e2e2;

.popper {
    width: auto;
    background-color: #fafafa;
    color: #212121;
    text-align: center;
    padding: 10px;
    display: inline-block;
    border-radius: 3px;
    position: absolute;
    font-size: 14px;
    font-weight: normal;
    border: 1px #ebebeb solid;
    z-index: 200000;
    -moz-box-shadow: rgb(58, 58, 58) 0 0 6px 0;
    -webkit-box-shadow: rgb(58, 58, 58) 0 0 6px 0;
    box-shadow: rgb(58, 58, 58) 0 0 6px 0;

    .popper__arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 5px;
    }
    &[x-placement^='top'] {
        margin-bottom: 5px;
    }
    &[x-placement^='top'] .popper__arrow {
        border-width: 5px 5px 0 5px;
        border-color: #fafafa transparent transparent transparent;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }
    &[x-placement^='bottom'] {
        margin-top: 5px;
    }
    &[x-placement^='bottom'] .popper__arrow {
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent #fafafa transparent;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }
    .group-block {
        display: flex;
        font-size: 1.1em;

        input,
        button {
            border: none;
            border-radius: 4px;
            box-shadow: none;
            background: transparent;
            padding-bottom: calc(0.375em - 1px);
            padding-left: 0.75em;
            padding-right: 0.75em;
            padding-top: calc(0.375em - 1px);
            outline: none;
        }
        button {
            &:hover {
                background: $buttonGrey;
            }
            &:active {
                background: darken($buttonGrey, 5%);
            }
        }
        .submit-button {
            color: #fff;
            background: $buttonPrimary;

            &:hover {
                background: lighten($buttonPrimary, 5%)
            }
            &:active {
                background: darken($buttonPrimary, 5%)
            }
        }
    }
}
</style>