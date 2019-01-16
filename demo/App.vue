<template>
    <div 
        id="app" 
        class="app"
    >
        <header>
            <button 
                class="button" 
                @click="viewport = '100%'"
            >Desktop</button>
            <button 
                class="button"
                @click="viewport = '400px'"
            >Mobile</button>
        </header>
        <div class="wrapper">
            <aside>
                <div class="tabs is-toggle">
                    <ul>
                        <li :class="{'is-active': activeTheme === 'Default'}">
                            <a @click="registerThemeComponents('Default')">
                                <span>Default</span>
                            </a>
                        </li>
                        <li :class="{'is-active': activeTheme === 'MegaTheme'}">
                            <a @click="registerThemeComponents('MegaTheme')">
                                <span>MegaTheme</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="tabs is-toggle">
                    <ul>
                        <li :class="{'is-active': activeTab === 'sections'}">
                            <a @click="activeTab = 'sections'">
                                <span>Sections</span>
                            </a>
                        </li>
                        <li :class="{'is-active': activeTab === 'components'}">
                            <a @click="activeTab = 'components'">
                                <span>Components</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <VSComponents v-if="activeTab === 'components'">
                    <template slot-scope="{ components }">
                        <div
                            v-for="component in components"
                            :key="component.name"
                            class="element"
                        >{{ component.name }}</div>
                    </template>
                </VSComponents>
                <VSSections v-if="activeTab === 'sections'">
                    <template slot-scope="{ sections }">
                        <div
                            v-for="section in sections"
                            :key="section.id"
                        >
                            <h4 class="title is-4">{{ section.name }}</h4>
                            <!-- <BlockEditor :block="section" /> -->
                            <br>
                        </div>
                    </template>
                </VSSections>
            </aside>
            <main>
                <VSArtboard :style="`width:${viewport}`" />
            </main>
        </div>
    </div>
</template>

<script>
import BlockEditor from './components/BlockEditor.vue'
import themesData from './themesData.json'

export default {
    name: 'App',
    components: {
        BlockEditor,
    },
    data() {
        return {
            viewport: '100%',
            activeTab: 'components',
            activeTheme: 'Default',
            themes: [{
                name: 'Default',
                sections: ['Benefits', 'Dishes', 'Header'],
            }, { 
                name: 'MegaTheme',
                sections: ['Benefits', 'Header'],
            }],
        }
    },
    created() {
        setTimeout(() => {
            this.registerThemeComponents('Default')
        }, 500)
    },
    methods: {
        registerThemeComponents(theme) {
            const activeTheme = this.themes.find((item) => item.name === theme)
            const components = activeTheme.sections.map((section) => ({
                name: section, 
                component: () => import(`./themes/${activeTheme.name}/blocks/${section}.vue`),
            }))
            this.$vsChangeTheme(components, themesData[theme])
            this.activeTheme = theme
        },
    },
}
</script>

<style lang="scss">
html,
body,
#app {
    height: 100%;
}
</style>

<style lang="scss" scoped>
.app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
header {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}
.wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: row;

    main {
        display: flex;
        flex: 4 1;
        background-color: #eff4f6;
        padding: 20px;
        justify-content: center;
    }
    aside {
        flex: 1 1;
        overflow-y: scroll;
        padding: 16px;
        border-right: 1px solid #ccc;
    }
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