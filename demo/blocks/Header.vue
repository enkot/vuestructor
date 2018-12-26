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
                                <h2>Logo</h2>
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
                                            :uid="item.link"
                                            className="navbar-item"
                                        />
                                    </template>
                                </vs-list>
                                <span class="navbar-item">
                                    <slot
                                        :uid="$vs_slots.buttonTop"
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
                        <slot :uid="$vs_slots.subtitle">Subtitle</slot>
                    </h2>
                    <h1 class="title">
                        <slot :uid="$vs_slots.title">Title</slot>
                    </h1>
                    <slot 
                        :uid="$vs_slots.button"
                        className="button is-primary is-medium"
                    >Go to Menu</slot>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ComponentMixin } from '../../src'
// import bg from '../images/top-bg.jpg'

export default {
    name: 'HeaderBlock',
    mixins: [ComponentMixin],
    // data() {
    //     return {
    //         bg,
    //     }
    // },
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
