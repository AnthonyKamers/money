<template>
	<div class="menu">
		<ul>Cadastrar
			<li><router-link to="/bancos">Bancos</router-link></li>
		</ul>

		<div v-if="$store.getters['Bancos/getBancos']">
			<ul v-for="banco in $store.getters['Bancos/getBancos']" :key="banco.id">
				<h4 style="margin-bottom: 0;">{{ banco.nome }}</h4>
				<li @click="$router.push({ path: `/banco/${banco.id}/cartoes` })" class="link">Cartões</li>
				
				<li @click="$router.push({ path: `/rendas/${banco.id}/rendas` })" class="link">Rendas (entradas)</li>
				<ul>
					<li @click="$router.push({ path: `/rendas/${banco.id}/categorias` })" class="link">Categorias</li>
					<li>Rendas fixas</li>
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
		</div>

		<v-btn class="secondary" @click="logout">Logout</v-btn>
	</div>
</template>

<script>
export default {
    name: "Menu",

	created() {
		this.$store.dispatch("Bancos/readBancos", this.$root);
	},

    data() {
      return {}
    },

	methods: {
		logout() {
			this.axios.post(`${this.apiUrl}/auth/logout`).then(
				response => {
					if (response.data.status === "success") {
						this.$router.push({path: "/login"});
					}
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

.link {
	font-size: 16px;
	color: #90CAF9;
	cursor: pointer;
}
</style>