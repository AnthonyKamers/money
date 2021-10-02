<template>
    <div>
        <div class="center_page">
            <h1>Admin - Águia imóveis</h1>

            <div class="padding_control">
                <v-form ref="form" lazy-validation>
                    <v-text-field
                        v-model="login"
                        label="Login"
                        :rules="ruleRequired"
                        required
                        outlined
                    ></v-text-field>

                    <v-text-field
                        v-model="senha"
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
    name: "Admin",

    data() {
        return {
            login: "",
            senha: "",
            show1: false
        }
    },

    methods: {
        enter() {
            if (this.$refs.form.validate()) {
                alert("it is valid")
            } else {
                alert('is is not valid')
            }
        }
    }
};
</script>


<style scoped>
.center_page {
  margin: auto;
  width: 50%;
  border: 3px solid #c8c8c8;
  padding: 10px;
  margin-top: 15%;
  text-align: center;
}

.padding_control {
    padding: 0 120px;
}
</style>