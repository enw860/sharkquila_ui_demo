<template>
	<div class="ToggleDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					Toggle between two states. It could be also combined with
					Label Wrapper control to provide more advance uses.
				</p>
			</div>

			<l-toggle
				slot="widgit"
				ref="control"
				:state="true"
				:size="state.size"
				:toggleStyle="state.style"
				:onLabel="state.onLabel"
				:offLabel="state.offLabel"
				:labelType="state.labelType"
				:disabled="state.disabled"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.size"
						:options="SIZES"
						@change="updateSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Style:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.style"
						:options="STYLES"
						@change="updateStyle"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Label type:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.labelType"
						:options="LABELTYPE"
						@change="updateLabelType"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="On label:" size="small">
					<l-input-text
						slot="labelContent"
						ref="onLabel"
						:value="state.onLabel"
						@blur="updateOnLabel"
						placeholder="On label"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Off label:" size="small">
					<l-input-text
						slot="labelContent"
						ref="offLabel"
						:value="state.offLabel"
						@blur="updateOffLabel"
						placeholder="Off label"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Disabled:" size="small">
					<l-toggle
						slot="labelContent"
						:state="!state.disabled"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
						@toggle="updateDisabled"
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
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "ToggleDemo",
	displayName: "Toggle",
	controlMapping: [
		{
			keywords: [
				"l-toggle",
				"pill",
				"switcher",
				"checkbox",
				"input",
				"toggle",
			],
		},
	],
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: [],
			STYLES: [],
			LABELTYPE: [],
			state: {
				style: "danger",
				size: "default",
				labelType: "text",
				disabled: false,
				onLabel: "On",
				offLabel: "Off",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-toggle\
						state="true"\
						size="${this.state.size}"\
						toggleStyle="${this.state.style}"\
						labelType="${this.state.labelType}"\
						onLabel="${this.state.onLabel}"\
						offLabel="${this.state.offLabel}"\
						:disabled="${this.state.disabled}"\
					/>
				</template>`;
		},
	},
	methods: {
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateStyle: function (event) {
			this.state.style = event.target.value;
		},
		updateOnLabel: function (event) {
			this.state.onLabel = event.target.value;
		},
		updateOffLabel: function (event) {
			this.state.offLabel = event.target.value;
		},
		updateLabelType: function (event) {
			this.state.labelType = event.target.value;
			if (this.state.labelType === "icon") {
				this.state.onLabel = "fa-check";
				this.state.offLabel = "fa-close";
				this.$refs.onLabel.setValue("fa-check");
				this.$refs.offLabel.setValue("fa-close");
			} else {
				this.state.onLabel = "On";
				this.state.offLabel = "Off";
				this.$refs.onLabel.setValue("On");
				this.$refs.offLabel.setValue("Off");
			}
		},
		updateDisabled: function (event) {
			this.state.disabled = !event.target.checked;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control, 2);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size, toggleStyle, labelType } = props;
			this.SIZES = (size || {}).options || [];
			this.STYLES = (toggleStyle || {}).options || [];
			this.LABELTYPE = (labelType || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control, 2);
	},
};
</script>