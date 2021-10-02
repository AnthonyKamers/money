<template>
    <div class="index">
        <h2>Teste</h2>
        <h1>{{ $store.state.count }}</h1>
        <button class="btn" @click="$store.commit('INCREMENT')">INCREMENT</button>
        <br>
        <router-link to="about">CLICK ME</router-link>
    </div>
</template>

<script>
export default {
    name: "Index"
}
</script>