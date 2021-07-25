<template>
	<div class="MessageDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This control is used to display a stack of short messages.
				</p>
			</div>

			<l-messages
				slot="widgit"
				ref="control"
				messageStyle="info"
				maxWidth="75%"
				@change="refreshDOM"
			/>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Value:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.value"
						@blur="updateValue"
						placeholder="Text"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Message style:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.messageStyle"
						:options="MESSAGE_STYLES"
						@change="updateMessageStyle"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Timeout(s):" size="small">
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
						@click="clearMessage"
					/>

					<l-button
						value="Post"
						btnStyle="primary"
						@click="postMessage"
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

export default {
	name: "MessagesDemo",
	displayName: "Messages",
	controlMapping: [
		{
			keywords: ["messagse", "msgs", "l-messages"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			MESSAGE_STYLES: [],
			refreshTimer: null,
			state: {
				value: "This is a piece of message",
				messageStyle: "default",
				timeout: NaN,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-messages\
						messageStyle="info"\
						maxWidth="75%"\
					/>\
				</template>`;
		},
	},
	methods: {
		updateValue: function (event) {
			this.state.value = event.target.value;
		},
		updateMessageStyle: function (event) {
			this.state.messageStyle = event.target.value;
		},
		updateTimeout: function (event) {
			this.state.timeout = (parseInt(event.target.value) || 0) * 1000;
		},
		postMessage: function () {
			this.$refs.control.post(this.state);
		},
		clearMessage: function () {
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
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { messageStyle } = props;
			this.MESSAGE_STYLES = (messageStyle || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>