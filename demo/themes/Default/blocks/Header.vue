<template>
    <div>
        <section 
            class="hero is-dark is-fullheight"
        >
            <div class="hero-head">
                <header class="navbar">
                    <div class="container">
                        <div class="navbar-brand">
                            <a class="navbar-item">
                                <h2>Default</h2>
                            </a>
                            <span 
                                class="navbar-burger burger" 
                                data-target="navbarMenuHeroC"
                            >
                                <span />
                                <span />
                                <span />
                            </span>
                        </div>
                        <div 
                            id="navbarMenuHeroC" 
                            class="navbar-menu"
                        >
                            <div class="navbar-end">
                                <vs-list 
                                    list-name="links"
                                    class="navbar-end" 
                                >
                                    <template slot-scope="{ item }">
                                        <slot
                                            :val="item.link"
                                            className="navbar-item"
                                        />
                                    </template>
                                </vs-list>
                                <span class="navbar-item">
                                    <slot
                                        :val="$vs_slots.buttonTop"
                                        className="button is-link"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h2 class="subtitle">
                        <slot :val="$vs_slots.subtitle" />
                    </h2>
                    <h1 class="title">
                        <slot :val="$vs_slots.title" />
                    </h1>
                    <slot 
                        :val="$vs_slots.button"
                        className="button is-primary is-medium"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ComponentMixin } from '../../../../src'
// import bg from '../images/top-bg.jpg'

export default {
    name: 'Header',
    mixins: [ComponentMixin],
    // data() {
    //     return {
    //         bg,
    //     }
    // },
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
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 3.3rem;
}
.navbar-burger {
    span {
        background-color: #fff;
    }
}
.hero {
    background-size: cover;

    &:before {
        position: absolute;
        display: block;
        content: '';
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.7);
    }
}
</style>
