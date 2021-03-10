<template>
	<div class="InputsDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					Different types of text inputs. (Plain text, number,
					password, color and text area)
				</p>
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
					v-if="state.widgit !== 'Color'"
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
					v-if="state.widgit !== 'Color'"
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

			<l-html-text-loader
				slot="code"
				type="<Vue template>"
				:value="codeBody"
			/>
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
			SIZES: [],
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
				size: "default",
				error: "",
				disabled: false,
				widgit: "Text",
			},
		};
	},
	computed: {
		widgitControl: function () {
			return normalizeInput(this.TYPES_MAPPING, this.state.widgit);
		},
		codeBody: function () {
			return `\
				<template>\
					<${this.widgitControl}\
						size="${this.state.size}"\
						error="${this.state.error}"\
						${
							this.widgitControl !== "Color"
								? `placeholder="${this.state.placeholder}"`
								: ""
						}\
						:disabled="${this.state.disabled}"\
					/>\
				</template>`;
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
		updateControlSettings: function () {
			this.$refs.DT.updateControl(this.$refs.control, 2);

			const { props } = this.$refs.control.$options || {};
			if (props) {
				const { size } = props;
				this.SIZES = (size || {}).options || [];
			}
		},
	},
	mounted: function () {
		this.updateControlSettings();
	},
	updated: function () {
		this.updateControlSettings();
	},
};
</script>