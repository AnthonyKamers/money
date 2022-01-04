<template>
    <div class="index">
        <div class="center_page">
            <router-link to="register"><v-btn color="primary">Registrar-se</v-btn></router-link>
            <router-link to="login"><v-btn color="secondary">Login</v-btn></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Index"
}
</script>