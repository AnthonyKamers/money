<template>
    <div>
        <div class="center_page">
            <h1>Login - Money</h1>

            <div class="padding_control">
                <v-form ref="form" lazy-validation>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        :rules="ruleRequired"
                        required
                        outlined
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Senha"
                        outlined
                        :rules="ruleRequired"
                        @click:append="show1 = !show1"
                    ></v-text-field>

                    <v-btn outlined color="primary" @click="enter">
                        Login
                    </v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",

    data() {
        return {
            email: "",
            password: "",
            show1: false
        }
    },

    methods: {
        enter() {
            if (this.$refs.form.validate()) {
                const data = {
                    email: this.email,
                    password: this.password
                }

                this.axios.post(`${this.apiUrl}/auth/login`, data).then(
                    response => {
                        const responseData = response.data

                        if (responseData.status == "success") {
                            localStorage.token = responseData.token;
                            this.axios.defaults.headers.common["Authorization"] = `Bearer ${responseData.token}`;

                            this.$router.push({path: "/dashboard"});
                        }
                    },
                    error => {
                        console.log(error);
                    }
                )
            } else {
                alert('is is not valid')
            }
        }
    }
};
</script>


<style scoped>
.padding_control {
    padding: 0 120px;
}
</style>