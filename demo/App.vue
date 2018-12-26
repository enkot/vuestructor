<template>
    <div id="app">
        <header>
            <button @click="viewport = '100%'">Desktop</button>
            <button @click="viewport = '400px'">Mobile</button>
        </header>
        <VuestructorArtboard :viewport="viewport" />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            viewport: '100%',
        }
    },
}
</script>

<style lang="scss">
html,
body,
#app {
    height: 100%;
}
#app {
    display: flex; 
    flex-direction: column;
}
</style>

<style lang="scss" scoped>
header {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}
</style>