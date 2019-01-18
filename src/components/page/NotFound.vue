<template>
    <div class="container">
        <p>Page not found!</p>
        <router-link to="/" class="btn btnBack">Cancel</router-link>
    </div>
</template>

<script>
    export default {
        name: 'not-found'
    }
</script>

<style scoped>
    div{
        text-align: center;
    }

    p{
        font-size: 50px;
    }

    .btnBack{
        margin: 10px;
        width: 240px;
        border: 1px solid #3248514a;
        background-color: #1ae03c30;
    }
</style>

