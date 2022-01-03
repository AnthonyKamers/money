<template>
    <div class="body">
        <h1>Dashboard user</h1>
        
        <div class="flex">
            <Menu></Menu>
            
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Menu from "../../Components/Menu"

export default {
    name: "Dashboard",

    created() {
        console.log(localStorage.token);

        this.axios.get(`${this.apiUrl}/auth/user`, {headers: {"Authorization": `Bearer ${localStorage.token}`}}).then(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    },

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