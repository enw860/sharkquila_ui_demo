<style lang="less">
@import "../style/theme.less";

.Logo {
	cursor: pointer;
	height: 48px;
	padding: 8px 16px;
	margin-top: 3px;
	margin-bottom: 3px;

	&:focus {
		outline: 2px solid @primary-060;
		outline-offset: -2px;
	}

	& > div {
		color: @primary-060;
		font-size: 32px;
		margin-right: 8px;
	}

	& > span {
		font-size: 24px;
		line-height: 32px;
		font-weight: 600;
		color: @white;
	}
}
</style>

<template>
	<div class="Logo HLayout align-center" tabindex="0" @click="toWelcomePage">
		<div>
			<a class="fa" v-bind:class="icon"></a>
		</div>
		<span>{{ name }}</span>
	</div>
</template>

<script>
import store from "../store/store";

export default {
	name: "Logo",
	data: function () {
		return {
			icon: "fa-compass",
			name: "Sharkquila UI",
		};
	},
	methods: {
		toWelcomePage: function (term) {
			store.dispatch("main/switchMainContent", "");
		},
	},
};
</script>