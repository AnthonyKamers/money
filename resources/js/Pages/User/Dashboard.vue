<template>
    <div class="body">
        <h1><router-link to="/dashboard">Dashboard</router-link></h1>
        
        <div class="flex">
            <Menu></Menu>
            
            <div class="fullWidth">
                <router-view></router-view>
            </div>

            <v-snackbar :value="$store.getters['Global/getSnackbar']" :color="$store.getters['Global/getColorSnackbar']">
                {{ $store.getters['Global/getTextSnackbar'] }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="white"
                        text
                        v-bind="attrs"
                        @click="$store.dispatch('Global/disableSnackbar')"
                    >
                    Fechar
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </div>
</template>

<script>
import Menu from "../../Components/Menu"

export default {
    name: "Dashboard",

    components: {
        Menu
    }
}
</script>

<style scoped>
.body {
    padding: 25px;
}

.flex {
    display: flex;
}
</style>