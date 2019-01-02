<template>
    <Popper
        ref="popper"
        :trigger="null"
        :force-show="popoverActive"
        :options="{ placement: 'top' }"
    >
        <div 
            ref="popoverArea"
            class="vuestructor-popper popper"
        >
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
                    v-if="data.type === 'link'"
                    @click="editLinkMode(true)"
                >Link</button>
            </div>
        </div>
        <DynamicElement
            ref="editArea"
            slot="reference"
            :value="data.content"
            :type="elementType"
            :class="`editor ${className}`"
            @change="update('content', $event)"
            @click="showPopover"
        />
    </Popper>
</template>

<script>
import Popper from './Popper.vue'
import DynamicElement from './DynamicElement.vue'

export default {
    name: 'Editor',
    components: {
        DynamicElement,
        Popper,
    },
    inject: ['contentWindow', 'contentDocument'],
    props: {
        className: {
            type: String,
            default: '',
        },
        data: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            popoverActive: false,
            linkEdit: false,
            linkValue: '',
        }
    },
    computed: {
        elementType() {
            return this.data.type === 'link' ? 'a' : 'div'
        },
    },
    mounted() {
        this.contentDocument.body.addEventListener('click', this.hidePopover)
    },
    created() {
        this.linkValue = this.data.link
    },
    destroyed() {
        this.contentDocument.body.removeEventListener('click', this.hidePopover)
    },
    methods: {
        editLinkMode(active) {
            this.linkEdit = active

            this.$nextTick(this.$refs.popper.updatePopper)
        },
        hidePopover(event) {
            const { target } = event
            const edit = this.$refs.editArea.$el
            const popover = this.$refs.popoverArea

            if (!(edit === target || edit.contains(target)
                || popover === target || popover.contains(target))) {
                this.popoverActive = false
                this.editLinkMode(false)
            }
        },
        showPopover() {
            this.popoverActive = true
        },
        update(type, value) {
            this.$emit('change', { type, value })
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

.block {
    background-color: #202034;
    padding: 20px;
    color: #fff;
}
.editor {
    outline: none;
    cursor: text;

    &:hover {
        outline: 1px solid rgba(204,204,204,.4);
    }
}
.vuestructor-popper {
    padding: 10px;

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
