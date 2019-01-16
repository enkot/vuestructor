<template>
    <section class="section">
        <div class="container has-text-centered title-block">
            <h2 class="subtitle is-6">
                The most popular in the last month
            </h2>
            <h1 class="title">Top Orders</h1>
        </div>
        <div class="container">
            <div class="tile is-ancestor">
                <div class="tile is-4 is-vertical is-parent">
                    <div 
                        :style="`background-image: url(${caprizioza});`"
                        class="tile card is-child notification"
                    >
                        <div class="content">
                            <nav class="level">
                                <div class="level-left">
                                    <div class="level-item">
                                        <h5 class="title is-5">Saliami</h5>
                                    </div>
                                </div>
                                <div class="level-right">
                                    <p class="level-item">$21.00</p>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div 
                        :style="`background-image: url(${caprizioza});`"
                        class="tile card is-child notification"
                    >
                        <div class="content">
                            <nav class="level">
                                <div class="level-left">
                                    <div class="level-item">
                                        <h5 class="title is-5">Caprizioza</h5>
                                    </div>
                                </div>
                                <div class="level-right">
                                    <p class="level-item">$21.00</p>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div 
                        :style="`background-image: url(${caprizioza});`"
                        class="tile card is-child notification"
                    >
                        <div class="content">
                            <nav class="level">
                                <div class="level-left">
                                    <div class="level-item">
                                        <h5 class="title is-5">Calzone</h5>
                                    </div>
                                </div>
                                <div class="level-right">
                                    <p class="level-item">$21.00</p>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import caprizioza from '../images/caprizioza.jpg'

export default {
    name: 'Dishes',
    data() {
        return {
            caprizioza,
        }
    },
    schema: {
        dishes: [{
            title: { type: 'title' }, 
            links: { type: 'links' },
        }],
    },
}
</script>

<style lang="scss" scoped>
.section {
    background: linear-gradient(#f6f7f7, #ffffff);
}
.title-block {
    margin-bottom: 2rem;
}
.card.is-child {
    min-height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &:before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        z-index: 0;
        background: linear-gradient(rgba(0,0,0,0) 50%,rgba(0,0,0,.5));
    }
}
.content {
    padding: 1.5rem;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    color: #ffffff;
}
</style>
