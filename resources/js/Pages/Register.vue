<template>
    <div class="center_page">
        <v-form ref="form" v-model="valid">
            <v-row>
                <Input
                    label="Email"
                    @update="email = $event"
                ></Input>
                <Input
                    label="Senha"
                    @update="password = $event"
                ></Input>
                <Input
                    label="Repita a senha"
                    @update="password1 = $event"
                ></Input>
            </v-row>

            <v-btn @click="submit">Registrar-se</v-btn>
        </v-form>
    </div>
</template>

<script>
import Input from "../Components/Input.vue";

export default {
    name: "Register",

    components: {
        Input
    },

    data() {
        return {
            valid: false,
            email: "",
            password: "",
            password1: "",
        }
    },

    methods: {
        submit() {
            this.$refs.form.validate();

            if (this.valid) {
                const data = {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password1
                }

                this.axios.post(`${this.apiUrl}/auth/register`, data).then(
                    () => {
                        this.$router.push({path: '/login', params: {successRegistration: true, email: this.email}});
                    },
                    error => {
                        console.log(`erro - `, error);
                    }
                )
            }
        }
    }
};
</script>
