<template>
    <section class="section">
        <div class="container">
            <vs-list
                list-name="benefits"
                class="columns"
            >
                <template slot-scope="{ item }">
                    <div
                        class="column has-text-centered"
                    >
                        <img
                            :src="icon"
                            alt="Delivery"
                        >
                        <h5 class="title is-5">
                            <slot :uid="item.title">Fast delivery</slot>
                        </h5>
                        <p>
                            <slot :uid="item.text">Fast delivery</slot>
                        </p>
                    </div>
                </template>
            </vs-list>
        </div>
    </section>
</template>

<script>
import { ComponentMixin } from '../../src'
import icon from '../images/truck.svg'

export default {
    name: 'BenefitsBlock',
    mixins: [ComponentMixin],
    data() {
        return {
            icon,
        }
    },
}
</script>