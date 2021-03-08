<template>
	<div class="LabelWrapperDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used to add a label for control.</p>
			</div>

			<div slot="properties">
				<l-table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></l-table>
			</div>

			<l-label-wrapper
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.size"
				:position="state.position"
				:required="state.required"
				:disabled="state.disabled"
			>
				<l-input-text slot="labelContent" placeholder="Demo input" />
			</l-label-wrapper>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Label:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.value"
						@blur="updateLabel"
						placeholder="Label"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.size"
						:options="SIZES"
						@change="updateSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Position:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.position"
						:options="POSITIONS"
						@change="updatePosition"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Ruquired:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="Required"
						offLabel="Not required"
						toggleStyle="success"
						:state="state.required"
						@toggle="updateRequired"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Disable:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
						:state="state.disabled"
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
	name: "LabelWrapperDemo",
	displayName: "Label wrapper",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			POSITIONS: ["Top", "Left"],
			SIZES: ["Small", "Default", "Large", "xLarge"],
			state: {
				codeStructure: "",
				value: "This is a testing title: ",
				position: "Top",
				size: "Default",
				required: false,
				disabled: false,
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
					prop: "value",
					type: "String",
					default: "Title",
					required: "",
					description: "Context of the label.",
				},
				{
					prop: "position",
					type: "String",
					default: "top",
					required: "",
					description:
						"Position of the label. Options are left and top",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description:
						"Size of the label and the inner control size.",
				},
				{
					prop: "required",
					type: "Boolean",
					default: "false",
					required: "",
					description: "State if the field is required.",
				},
				{
					prop: "disabled",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Disabled the label and the inner context.",
				},
			],
		};
	},
	methods: {
		updateLabel: function (event) {
			this.state.value = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updatePosition: function (event) {
			this.state.position = event.target.value;
		},
		updateRequired: function (event) {
			this.state.required = event.target.checked;
		},
		updateDisabled: function (event) {
			this.state.disabled = event.target.checked;
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