<template>
	<div class="DisplayTextDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used to display plain text.</p>
			</div>

			<div slot="properties">
				<l-table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></l-table>
			</div>

			<l-text
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.fontSize"
				:fontWeight="parseInt(state.fontWeight)"
				:color="state.color"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Value:" size="small">
					<l-input-text
						ref="content"
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

				<l-label-wrapper value="Font weight:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.fontWeight"
						:options="FONT_WEIGHT"
						@change="updateFontWeight"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Font color:" size="small">
					<l-input-color
						slot="labelContent"
						:value="state.color"
						@change="updateFontColor"
					/>
				</l-label-wrapper>
			</div>

			<l-html-text-loader
				slot="code"
				type="<Vue template>"
				:value="codeBody"
			/>

			<l-html-text-loader
				slot="structure"
				:wrapOffset="1"
				:value="state.codeStructure"
			/>
		</ControlDemoTemplate>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "DisplayTextDemo",
	displayName: "Plain text",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			FONT_SIZES: [
				"Default",
				"xSmall",
				"Small",
				"Large",
				"xLarge",
				"xxLarge",
				"xxxLarge",
			],
			FONT_WEIGHT: ["400", "600", "800"],
			state: {
				value: "Some text",
				fontSize: "Default",
				fontWeight: "400",
				color: "#000",
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
					prop: "value",
					type: "String",
					default: "",
					required: "true",
					description: "Content of display.",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the text.",
				},
				{
					prop: "fontWeight",
					type: "Number",
					default: 400,
					required: "",
					description: "Font weight of the text.",
				},
				{
					prop: "color",
					type: "Hex",
					default: "#000000",
					required: "",
					description: "Font color of the text.",
				},
			],
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-text\
						value="${this.state.value}"\
						size="${this.state.fontSize}"\
						color="${this.state.color}"\
						:fontWeight="${this.state.fontWeight}"\
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
		updateFontWeight: function (event) {
			this.state.fontWeight = event.target.value;
		},
		updateFontColor: function (event) {
			this.state.color = event.target.value;
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