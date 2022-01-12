<template>
	<div class="menu">
		<ul>Cadastrar
			<li @click="$router.push({ path: `/bancos` })" class="link">Bancos</li>
		</ul>

		<div v-if="$store.getters['Bancos/getBancos']">
			<ul v-for="banco in $store.getters['Bancos/getBancos']" :key="banco.id">
				<h4 class="mb-0">{{ banco.nome }}</h4>

				<li @click="$router.push({ path: `/banco/${banco.id}/cartoes` })" class="link">Cartões</li>
				
				<li @click="$router.push({ path: `/rendas/${banco.id}/rendas` })" class="link">Rendas (entradas)</li>
				<ul>
					<li @click="$router.push({ path: `/rendas/${banco.id}/categorias` })" class="link">Categorias</li>
					<li @click="$router.push({ path: `/rendas/${banco.id}/rendas-fixas` })" class="link">Rendas fixas</li>
				</ul>

				<li @click="$router.push({ path: `/despesas/${banco.id}/despesas` })" class="link">Despesas (saídas)</li>
				<ul>
					<li @click="$router.push({ path: `/despesas/${banco.id}/categorias` })" class="link">Categorias</li>
					<li @click="$router.push({ path: `/despesas/${banco.id}/despesas-fixas` })" class="link">Despesas fixas</li>
					<li @click="$router.push({ path: `/despesas/${banco.id}/faturas-cartoes` })" class="link">Faturas cartões</li>
				</ul>

				<li>Extrato</li>
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