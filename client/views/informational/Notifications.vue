<template>
	<div class="NotificationDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This control is used to display a block of messages. You can
					also use it as global alerts by combining it with an event
					bus,
					<l-link
						value="TRY ME!"
						color="#0f62fe"
						:openInNewTab="false"
						@click="() => {}"
					/>.
				</p>
			</div>

			<l-notifications
				slot="widgit"
				ref="control"
				notificationStyle="info"
				width="75%"
				@change="refreshDOM"
			/>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Title:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.title"
						@blur="updateTitle"
						placeholder="Text"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Content:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.content"
						@blur="updateContent"
						placeholder="Text"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Notification style:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.notificationStyle"
						:options="STYLES"
						@change="updateNotificationStyle"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Timeout in seconds:" size="small">
					<l-input-number
						slot="labelContent"
						:value="state.timeout"
						@blur="updateTimeout"
						placeholder="Please enter a positive number"
					/>
				</l-label-wrapper>

				<div class="HLayout flow-between">
					<l-button
						value="Clear"
						btnStyle="danger"
						@click="clearNotifications"
					/>

					<l-button
						value="Post"
						btnStyle="primary"
						@click="postNotification"
					/>
				</div>
			</div>

			<l-html-text-loader
				slot="code"
				type="<Vue template>"
				:value="codeBody"
			/>
		</ControlDemoTemplate>
	</div>
</template>

<script>
import ControlDemoTemplate from "../main/ControlDemoTemplate.vue";
import eventBus from "../../utils/eventBus";

export default {
	name: "NotificationsDemo",
	displayName: "Notifications",
	controlMapping: [
		{
			keywords: [
				"notification",
				"notifications",
				"notis",
				"noti",
				"l-notifications",
			],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			STYLES: [],
			refreshTimer: null,
			state: {
				title: "This is a title",
				content: "This is body",
				notificationStyle: "default",
				timeout: NaN,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-notifications\
						notificationStyle="info"\
						width="75%"\
					/>\
				</template>`;
		},
	},
	methods: {
		updateTitle: function (event) {
			this.state.title = event.target.value;
		},
		updateContent: function (event) {
			this.state.content = event.target.value;
		},
		updateNotificationStyle: function (event) {
			this.state.notificationStyle = event.target.value;
		},
		updateTimeout: function (event) {
			this.state.timeout = (parseInt(event.target.value) || 0) * 1000;
		},
		postNotification: function () {
			this.$refs.control.post(this.state);
		},
		clearNotifications: function () {
			this.$refs.control.clearAll();
		},
		refreshDOM: function () {
			if (this.refreshTimer) {
				clearTimeout(this.refreshTimer);
			}

			this.refreshTimer = setTimeout(() => {
				this.$refs.DT.updateControl(this.$refs.control);
			}, 200);
		},
		showSampleNotification: function () {
			// eventBus.$emit("postMessage", {
			// 	value: "This is a demo alert!!!",
			// });
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { notificationStyle } = props;
			this.STYLES = (notificationStyle || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>