<template>
	<PageContent />
</template>

<script>
import store from "./store/store";
import PageContent from "./views/main/PageContent";

export default {
	name: "SharkquilaUI",
	components: {
		PageContent,
	},
	data: function () {
		return {
			screenMode: this.$store.state.main.screenMode,
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
			console.debug(`Screen size changed from ${oldVal} to ${newVal}`);
			store.dispatch("main/switchScreenMode", newVal);
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