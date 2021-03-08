<template>
	<div class="UIDemo">Hi</div>
</template>

<script>
import store from "./store/store";
// import PageContent from "./views/PageContent";

export default {
	name: "UIDemo",
	components: {
		// PageContent,
	},
	data: function () {
		return {
			screenMode: this.$store.state.uiDemo.screenMode,
		};
	},
	props: {},
	methods: {
		getScreenMode: function (width) {
			if (!width) {
				width = window.innerWidth;
			}

			return width <= 850 ? "small" : "regular";
		},
		onResize: function (event) {
			this.screenMode = this.getScreenMode();
		},
	},
	watch: {
		screenMode(newVal, oldVal) {
			console.warn(`Screen size changed from ${oldVal} to ${newVal}`);
			store.dispatch("uiDemo/switchScreenMode", newVal);
		},
	},
	mounted() {
		window.addEventListener("resize", this.onResize);
		this.onResize();
	},
	beforeDestroy: function () {
		window.removeEventListener("resize", this.onResize);
	},
};
</script>