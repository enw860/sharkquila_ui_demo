<style lang="less">
.LinkDemo textarea {
	resize: vertical;
}
</style>

<template>
	<div class="LinkDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used to display a link.</p>
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

			<l-link
				slot="widgit"
				ref="control"
				:value="state.value"
				:href="state.href"
				:size="state.fontSize"
				:fontWeight="parseInt(state.fontWeight)"
				:color="state.color"
				:openInNewTab="state.openInNewTab"
				:disabled="state.disabled"
				@click="linkOnClick"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Value:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.value"
						@blur="updateValue"
						placeholder="Text"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Href:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.href"
						@blur="updateHref"
						placeholder="link"
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

				<l-label-wrapper value="On click:" size="small">
					<l-input-textarea
						slot="labelContent"
						placeholder="function (event) { <body> }"
						:value="state.onClickFunctionBody"
						@blur="updateFunctionBody"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Open in a new tab:" size="small">
					<l-toggle
						slot="labelContent"
						:state="state.openInNewTab"
						onLabel="True"
						offLabel="False"
						toggleStyle="success"
						@toggle="updateOpenInNewTab"
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
	name: "LinkDemo",
	displayName: "Link",
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
				color: "#0f62fe",
				href: "",
				openInNewTab: true,
				disabled: false,
				onClickFunctionBody: "javascript:void(0);",
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
				{
					prop: "herf",
					type: "String",
					default: "",
					required: "",
					description: "The relevant link.",
				},
				{
					prop: "openInNewTab",
					type: "Boolean",
					default: "true",
					required: "",
					description: "Open the link address in a new window.",
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
					method: "@click",
					description:
						"Customized binded action, triggered on link onclick.",
				},
				{
					method: "onclick",
					description:
						"External control, triggers on button link event.",
				},
			],
		};
	},
	methods: {
		updateValue: function (event) {
			this.state.value = event.target.value;
		},
		updateHref: function (event) {
			this.state.href = event.target.value;
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
		updateFunctionBody: function (event) {
			this.state.onClickFunctionBody = event.target.value;
		},
		updateOpenInNewTab: function (event) {
			this.state.openInNewTab = event.target.checked;
		},
		updateDisabled: function (event) {
			this.state.disabled = !event.target.checked;
		},
		linkOnClick: function (event) {
			(() => eval(this.state.onClickFunctionBody))(event);
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