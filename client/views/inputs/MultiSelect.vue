<template>
	<div class="MultiSelectDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					This control is used to display a range of options, and
					allow user to select multiple values. Could be combined with
					Label Wrapper control to provide more advance uses.
					(CheckboxGroup)
				</p>
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

			<component
				slot="widgit"
				ref="control"
				v-bind:is="state.widgit"
				:options="state.options"
				:value="state.values"
				:layout="state.layout"
				:size="state.size"
				:error="state.error"
				:disabled="state.disabled"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Type:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.widgit"
						:options="TYPES"
						@change="updateWidgit"
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

				<l-label-wrapper value="Layout:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.layout"
						:options="LAYOUT"
						@change="updateLayout"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Error message:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.error"
						@blur="updateError"
						placeholder="Error message"
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
	name: "MultiSelectDemo",
	displayName: "Mutiple select",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			TYPES: ["l-input-group-multiple"],
			SIZES: ["Small", "Default", "Large", "xLarge"],
			LAYOUT: ["Vertival", "Horizontal"],
			state: {
				widgit: "l-input-group-multiple",
				options: ["Item1", "Item2", "Item3", "Item4"],
				values: ["Item2", "Item3"],
				layout: "Vertival",
				size: "Default",
				error: "",
				disabled: false,
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
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the text.",
				},
				{
					prop: "options",
					type: "Array",
					default: "[<String>]",
					required: "true",
					description: "Range of options.",
				},
				{
					prop: "value",
					type: "[<String>]",
					default: "[]",
					required: "",
					description: "List of selected values.",
				},
				{
					prop: "error",
					type: "String",
					default: "",
					required: "",
					description: "Passed in error message.",
				},
				{
					prop: "layout",
					type: "String",
					default: "Vertical",
					required: "",
					description: "Layout of the checkboxes.",
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
					method: "@change(event)",
					description: "Triggered on value change.",
				},
				{
					method: "setValueByIndexs(indexs)",
					description:
						"Set values of the control by feed in an array of selected items' indexs.",
				},
				{
					method: "setValueByValues(values)",
					description:
						"Set values of the control by feed in an array of selected items' values.",
				},
				{
					method: "getSelectedIndex()",
					description: "Get all indexs of selected values.",
				},
				{
					method: "getSelectedValue()",
					description: "Get all selected values.",
				},
			],
		};
	},
	methods: {
		updateWidgit: function (event) {
			this.state.widgit = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateLayout: function (event) {
			this.state.layout = event.target.value;
		},
		updateError: function (event) {
			this.state.error = event.target.value;
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