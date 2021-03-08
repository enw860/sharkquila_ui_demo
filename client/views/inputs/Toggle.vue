<template>
	<div class="ToggleDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>Toggle between two states.</p>
			</div>

			<div slot="properties">
				<l-table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></l-table>
			</div>

			<div slot="events">
				<l-table
					:colSettings="ENENTS_COL_SETTINGS"
					:tableData="ENENTS_TABLE_DATA"
				></l-table>
			</div>

			<l-toggle
				slot="widgit"
				ref="control"
				:state="true"
				:size="state.size"
				:toggleStyle="state.style"
				:onLabel="state.onLabel"
				:offLabel="state.offLabel"
				:labelType="toggleLabelType"
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

				<l-label-wrapper value="Label type:" size="small">
					<l-toggle
						slot="labelContent"
						:state="state.isIconLabel"
						onLabel="Icon"
						offLabel="Text"
						toggleStyle="success"
						@toggle="updateLabelType"
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

			<l-html-text-loader slot="structure" :value="state.codeStructure" />
		</ControlDemoTemplate>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "ToggleDemo",
	displayName: "Toggle pill",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: ["Small", "Default", "Large", "xLarge"],
			STYLES: ["Primary", "Success", "Danger", "Info"],
			state: {
				style: "Danger",
				size: "Default",
				isIconLabel: false,
				disabled: false,
				onLabel: "On",
				offLabel: "Off",
				codeStructure: "",
			},
			PROPS_COL_SETTINGS: [
				{
					name: "prop",
					displayName: "Prop",
					width: "130px",
				},
				{
					name: "type",
					displayName: "Type",
					width: "110px",
				},
				{
					name: "default",
					displayName: "Default",
					width: "110px",
				},
				{
					name: "required",
					displayName: "Required",
					width: "130px",
				},
				{
					name: "description",
					displayName: "Description",
				},
			],
			PROPS_TABLE_DATA: [
				{
					prop: "state",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Initial state of the toggle control.",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the text.",
				},
				{
					prop: "toggleStyle",
					type: "String",
					default: "",
					required: "",
					description: "Style of the toggle control.",
				},
				{
					prop: "labelType",
					type: "String",
					default: "text",
					required: "",
					description: "Options are text and icon",
				},
				{
					prop: "onLabel",
					type: "String",
					default: "On",
					required: "",
					description:
						"On label, text label when label type is text, otherwise it represent the fontawsome icon class.",
				},
				{
					prop: "offLabel",
					type: "String",
					default: "Off",
					required: "",
					description:
						"Off label, text label when label type is text, otherwise it represent the fontawsome icon class.",
				},
				{
					prop: "disabled",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Disable the link.",
				},
			],
			ENENTS_COL_SETTINGS: [
				{
					name: "method",
					displayName: "Method",
					width: "130px",
				},
				{
					name: "description",
					displayName: "Description",
				},
			],
			ENENTS_TABLE_DATA: [
				{
					method: "@click(event)",
					description: "Triggered on value clicked.",
				},
				{
					method: "getState()",
					description: "Get current control state.",
				},
			],
		};
	},
	computed: {
		toggleLabelType: function () {
			return this.state.isIconLabel ? "icon" : "text";
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
			this.state.isIconLabel = event.target.checked;
			if (this.state.isIconLabel) {
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
		this.state.codeStructure = `${this.$refs.control.$el.outerHTML}`;
	},
	updated: function () {
		this.state.codeStructure = `${this.$refs.control.$el.outerHTML}`;
	},
};
</script>