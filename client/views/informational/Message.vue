<template>
	<div class="MessageDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>This control is used to display a piece of short message.</p>
			</div>

			<l-message
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.fontSize"
				:messageStyle="state.messageStyle"
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

				<l-label-wrapper value="Font size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.fontSize"
						:options="FONT_SIZES"
						@change="updateFontSize"
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
	name: "MessageDemo",
	displayName: "Message",
	controlMapping: [
		{
			keywords: ["message", "msg", "l-message"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			FONT_SIZES: [],
			MESSAGE_STYLES: [],
			state: {
				value: "This is a piece of message",
				fontSize: "default",
				messageStyle: "default",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-messages\
					/>\
				</template>`;
		},
	},
	methods: {
		updateValue: function (event) {
			this.state.value = event.target.value;
		},
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
		updateMessageStyle: function (event) {
			this.state.messageStyle = event.target.value;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size, messageStyle } = props;
			this.FONT_SIZES = (size || {}).options || [];
			this.MESSAGE_STYLES = (messageStyle || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>