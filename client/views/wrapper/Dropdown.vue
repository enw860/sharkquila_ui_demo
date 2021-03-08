<style lang="less">
.DropdownDemo {
	.temp-block {
		height: 150px;
		width: 200px;
		background-color: white;
	}
}
</style>

<template>
	<div class="DropdownDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used to hide and expand views.</p>
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

			<l-dropdown-wrapper
				slot="widgit"
				ref="control"
				:title="state.title"
				:expanded="state.expanded"
				:colorStyle="state.colorStyle"
				:size="state.size"
			>
				<div
					class="temp-block VLayout flow-center align-center"
					slot="content"
				>
					<l-text
						value="<Demo block>"
						size="xxxlarge"
						color="#000000"
					/>
				</div>
			</l-dropdown-wrapper>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Title:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.title"
						@blur="updateTitle"
						placeholder="Title"
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

				<l-label-wrapper value="Style:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.colorStyle"
						:options="STYLES"
						@change="updateColorStyle"
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
	name: "DropdownDemo",
	displayName: "Dropdown",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: ["Small", "Default", "Large", "xLarge"],
			STYLES: ["Default", "Dark"],
			state: {
				codeStructure: "",
				expanded: false,
				title: "This is a demo block",
				size: "Default",
				colorStyle: "Default",
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
					prop: "title",
					type: "String",
					default: "Title",
					required: "",
					description: "Title of the expanded control.",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the expanded control",
				},
				{
					prop: "colorStyle",
					type: "String",
					default: "default",
					required: "",
					description: "Color of the expanded control.",
				},
				{
					prop: "expanded",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Init state of the expanded control.",
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
					method: "@expand",
					description: "Triggers on expand action.",
				},
				{
					method: "@collaspe",
					description: "Triggers on collaspe action.",
				},
				{
					method: "expandDropDown(event)",
					description: "Expand the drop down control.",
				},
				{
					method: "collaspeDropDown(event)",
					description: "Collaspe the drop down control.",
				},
			],
		};
	},
	methods: {
		updateTitle: function (event) {
			this.state.title = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateColorStyle: function (event) {
			this.state.colorStyle = event.target.value;
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