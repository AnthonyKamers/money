<template>
    <div class="body">
        <h1><router-link to="/dashboard">Dashboard</router-link></h1>
        
        <div class="flex">
            <Menu></Menu>
            
            <div class="fullWidth">
                <router-view></router-view>
            </div>
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