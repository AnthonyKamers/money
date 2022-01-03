<template>
	<div class="menu">
		<ul>Cadastrar
			<li><router-link to="bancos">Bancos</router-link></li>
		</ul>

		<ul>Bancos
			<li>Cartões</li>
			
			<li>Rendas (entradas)</li>
			<ul>
				<li>Categorias</li>
				<li>Rendas fixas</li>
				<li>Cadastrar renda</li>
			</ul>

			<li>Despesas (saídas)</li>
			<ul>
				<li>Categorias</li>
				<li>Despesas fixas</li>
				<li>Faturas cartões</li>
				<li>Parcelas à pagar</li>
				<li>Despesas</li>
			</ul>

			<li>Extrato</li>
			<li>Saldo</li>
		</ul>

		<v-btn class="secondary" @click="logout">Logout</v-btn>
	</div>
</template>

<script>
export default {
    name: "Menu",

    data() {
      return {
        // menu: [
        //   ["Cadastrar",["Bancos", "Corretoras", "Exchanges", "Wallets"]],
        //   ["Bancos", ["Cartões", ["Rendas", ["Categorias", "Rendas fixas", "Cadastrar renda"]]]]
        // ]
      }
    },

	methods: {
		logout() {
			this.axios.post(`${this.apiUrl}/auth/logout`).then(
				response => {
					console.log(response);
				},
				error => {
					console.log(error);
				}
			)
		}
	}
}
</script>

<style scoped>
.menu {
    width: 300px;
    border: 1px solid #a8a8a8;
	margin-right: 10px;
}
</style>