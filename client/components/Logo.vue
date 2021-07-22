<template>
	<div
		class="Logo HLayout align-center flow-center"
		tabindex="0"
		@click="toWelcomePage"
	>
		<div class="IconWrapper">
			<Shark class="tail" />
		</div>
		<span>{{ name }}</span>
		<div class="IconWrapper">
			<Shark class="head" />
		</div>
	</div>
</template>

<script>
import store from "../store/store";
import Shark from "./Shark";

export default {
	name: "Logo",
	components: {
		Shark,
	},
	data: function () {
		return {
			icon: "fa-compass",
			name: "Sharkquila",
		};
	},
	methods: {
		toWelcomePage: function (term) {
			store.dispatch("main/switchMainContent", "");
		},
	},
};
</script>