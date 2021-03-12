<style lang="less">
@import "../style/theme.less";

.Logo {
	cursor: pointer;
	height: 48px;
	padding: 8px 16px;
	margin-top: 3px;
	margin-bottom: 3px;
	width: 250px;

	&:focus {
		outline: 2px solid @primary-060;
		outline-offset: -2px;
	}

	& > div {
		color: @primary-060;
		font-size: 32px;
	}

	& > span {
		font-size: 24px;
		line-height: 32px;
		font-weight: 600;
		color: @white;
		margin-left: 8px;
		margin-right: 8px;
	}

	& > .IconWrapper {
		width: 32px;
		height: 36px;
		overflow: hidden;

		> svg {
			-webkit-transform: scaleX(-1);
			transform: scaleX(-1);

			&.tail {
				margin-top: -16px;
			}

			&.head {
				margin-top: -6px;
				margin-left: -95px;
			}
		}
	}
}
</style>

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