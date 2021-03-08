<template>
	<div class="TooltipDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					This control is used to add a tooltip for a given content.
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

			<l-tooltip-wrapper
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.size"
				:mPosition="state.mPosition"
				:sPosition="state.sPosition"
				:displayOnHover="state.displayOnHover"
			>
				<l-button
					slot="content"
					value="Hover on me"
					btnStyle="Danger"
				/>
			</l-tooltip-wrapper>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Tooltip text:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.value"
						@blur="updateTooltip"
						placeholder="Tooltip text"
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

				<l-label-wrapper value="Vertical position:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.mPosition"
						:options="MPOSITIONS"
						@change="updateMPosition"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Vertical position:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.sPosition"
						:options="SPOSITIONS"
						@change="updateSPosition"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Show on hover:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="True"
						offLabel="False"
						toggleStyle="success"
						:state="state.displayOnHover"
						@toggle="updateDisplayOnHover"
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
	name: "TooltipDemo",
	displayName: "Tooltip",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			MPOSITIONS: ["Right", "Left", "Top", "Bottom"],
			SPOSITIONS: ["Start", "Center", "End"],
			SIZES: ["Small", "Default", "Large", "xLarge"],
			state: {
				codeStructure: "",
				value: "Tooltip",
				size: "Default",
				mPosition: "Top",
				sPosition: "Start",
				displayOnHover: true,
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
					type: "Array",
					default: "[]",
					required: "",
					description: "Text show in the tooltip box.",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the text.",
				},
				{
					prop: "mPosition",
					type: "String",
					default: "top",
					required: "",
					description: "Vertical position of the tooltip.",
				},
				{
					prop: "sPosition",
					type: "String",
					default: "start",
					required: "",
					description: "Horizontal position of the tooltip.",
				},
				{
					prop: "displayOnHover",
					type: "Boolean",
					default: "true",
					required: "",
					description: "Show the tooltip on hover.",
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
					method: "showTooltip(event)",
					description: "Display the tooltip.",
				},
				{
					method: "hideTooltip(event)",
					description: "Hide the tooltip.",
				},
			],
		};
	},
	methods: {
		updateTooltip: function (event) {
			this.state.value = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateMPosition: function (event) {
			this.state.mPosition = event.target.value;
		},
		updateSPosition: function (event) {
			this.state.sPosition = event.target.value;
		},
		updateDisplayOnHover: function (event) {
			this.state.displayOnHover = event.target.checked;
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