<template>
	<div class="InputsDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					Different types of text inputs. (Plain text, number,
					password, color and text area)
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
				v-bind:is="widgitControl"
				:size="state.size"
				:placeholder="state.placeholder"
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

				<l-label-wrapper
					value="Placeholder:"
					size="small"
					v-if="state.widgit !== 'ColorInput'"
				>
					<l-input-text
						slot="labelContent"
						:value="state.placeholder"
						@blur="updatePlaceholder"
						placeholder="Placeholder"
					/>
				</l-label-wrapper>

				<l-label-wrapper
					value="Error message:"
					size="small"
					v-if="state.widgit !== 'ColorInput'"
				>
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
import { normalizeInput } from "../../utils/utilities";
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "InputsDemo",
	displayName: "Text inputs",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: ["Small", "Default", "Large", "xLarge"],
			TYPES_MAPPING: {
				text: "l-input-text",
				number: "l-input-number",
				password: "l-input-password",
				textarea: "l-input-textarea",
				color: "l-input-color",
			},
			TYPES: ["Text", "Number", "Password", "Textarea", "Color"],
			state: {
				placeholder: "Enter some inputs",
				size: "Default",
				error: "",
				disabled: false,
				widgit: "Text",
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
					prop: "value",
					type: "String",
					default: "",
					required: "",
					description:
						"String for all text based input, Number for number input, Hex for color",
				},
				{
					prop: "placeholder",
					type: "String",
					default: "",
					required: "",
					description:
						"Placeholder text. (Not available for Color Input)",
				},
				{
					prop: "error",
					type: "String",
					default: "",
					required: "",
					description:
						"Passed in error message. (Not available for Color Input)",
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
					method: "@focus(event)",
					description: "Triggered on value gainning focus.",
				},
				{
					method: "@blur(event)",
					description: "Triggered on value lossing focus",
				},
				{
					method: "setValue(value)",
					description: "Set value of the control.",
				},
				{
					method: "getValue()",
					description: "Get value of the control.",
				},
			],
		};
	},
	computed: {
		widgitControl: function () {
			return normalizeInput(this.TYPES_MAPPING, this.state.widgit);
		},
	},
	methods: {
		updateWidgit: function (event) {
			this.state.widgit = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updatePlaceholder: function (event) {
			this.state.placeholder = event.target.value;
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