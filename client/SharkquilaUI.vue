<style lang="less">
.Global-messages {
	position: fixed;
	left: 50%;
	top: 16px;
	transform: translateX(-50%);
	z-index: 9999;
}

.Global-notifications {
	position: fixed;
	right: 16px;
	top: 16px;
	z-index: 9999;
}
</style>

<template>
	<div>
		<PageContent />

		<l-messages
			class="Global-messages"
			ref="messages"
			messageStyle="info"
			width="30vw"
			:timeout="2500"
		/>

		<l-notifications
			class="Global-notifications"
			ref="notifications"
			messageStyle="dark"
			width="350px"
			:timeout="12000"
		/>
	</div>
</template>

<script>
import store from "./store/store";
import PageContent from "./views/main/PageContent";
import eventBus from "./utils/eventBus";

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
	mounted: function () {
		window.addEventListener("resize", this.onResize);
		this.onResize();

		if (this.$refs.messages.post) {
			eventBus.$on("postMessage", (messageObj) => {
				this.$refs.messages.post(messageObj);
			});
		}

		if (this.$refs.notifications.post) {
			eventBus.$on("postNotification", (notiObj) => {
				this.$refs.notifications.post(notiObj);
			});
		}
	},
	beforeDestroy: function () {
		window.removeEventListener("resize", this.onResize);
		eventBus.$off("postMessage");
		eventBus.$off("postNotification");
	},
};
</script>