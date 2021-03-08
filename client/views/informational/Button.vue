<style lang="less">
.ButtonDemo textarea {
	resize: vertical;
}
</style>

<template>
	<div class="ButtonDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					The button control is used to perform some actions while
					being clicked. Could be also used as an static icon (e.g.
					empty btn value + icon + no on click function)
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

			<l-button
				slot="widgit"
				ref="control"
				:value="state.value"
				:icon="state.icon"
				:iconPosition="state.iconPosition"
				:btnStyle="state.btnStyle"
				:size="state.btnSize"
				:disabled="!state.isActive"
				@click="btnOnClick"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Button text:" size="small">
					<l-input-text
						slot="labelContent"
						placeholder="Button text"
						:value="state.value"
						@blur="updateButtonValue"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Icon:" size="small">
					<l-input-text
						slot="labelContent"
						placeholder="Fontawsome icon class"
						:value="state.icon"
						@blur="updateIcon"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Icon position:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.iconPosition"
						:options="ICON_POSITION"
						@change="updateIconPosition"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Button size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.btnSize"
						:options="SIZES"
						@change="updateBtnSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Button style:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.btnStyle"
						:options="BUTTON_STYLE"
						@change="updateBtnStyle"
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

				<l-label-wrapper value="Disable:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
						:state="state.isActive"
						@toggle="updateActive"
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
	name: "ButtonDemo",
	displayName: "Button",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: ["Default", "Small", "Large", "xLarge"],
			ICON_POSITION: ["left", "right"],
			BUTTON_STYLE: [
				"Default",
				"Primary",
				"Success",
				"Danger",
				"Info",
				"Dark",
				"White",
				"Transparent",
			],
			state: {
				codeStructure: "",
				value: "Click me",
				icon: "",
				iconPosition: "left",
				btnStyle: "Primary",
				btnSize: "Default",
				onClickFunctionBody: `alert("Response to click action on button");`,
				isActive: true,
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
					default: "Button",
					required: "true",
					description: "Context of button control.",
				},
				{
					prop: "size",
					type: "String",
					default: "Default",
					required: "",
					description: "Size of the button control.",
				},
				{
					prop: "icon",
					type: "String",
					default: "",
					required: "",
					description: "Fontawsome icon class, e.g fa-apple.",
				},
				{
					prop: "iconPosition",
					type: "String",
					default: "left",
					required: "",
					description: "Position of the icon, either left or right.",
				},
				{
					prop: "btnStyle",
					type: "String",
					default: "Default",
					required: "",
					description: "Predefined button color style.",
				},
				{
					prop: "disabled",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Whether the button is disabled or not.",
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
						"Customized binded action, triggered on button onclick.",
				},
				{
					method: "onclick",
					description:
						"External control, triggers on button onclick event.",
				},
			],
		};
	},
	methods: {
		updateButtonValue: function (event) {
			this.state.value = event.target.value;
		},
		updateIcon: function (event) {
			this.state.icon = event.target.value;
		},
		updateIconPosition: function (event) {
			this.state.iconPosition = event.target.value;
		},
		updateBtnSize: function (event) {
			this.state.btnSize = event.target.value;
		},
		updateBtnStyle: function (event) {
			this.state.btnStyle = event.target.value;
		},
		updateFunctionBody: function (event) {
			this.state.onClickFunctionBody = event.target.value;
		},
		updateActive: function (event) {
			this.state.isActive = event.target.checked;
		},
		btnOnClick: function (event) {
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