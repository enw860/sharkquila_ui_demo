<template>
	<div class="MultiSelectDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This control is used to display a range of options, and
					allow user to select multiple values. Could be combined with
					Label Wrapper control to provide more advance uses.
					(CheckboxGroup)
				</p>
			</div>

			<component
				slot="widgit"
				ref="control"
				v-bind:is="widgitControl"
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
	name: "MultiSelectDemo",
	displayName: "Mutiple select",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			TYPES: ["Checkbox group"],
			TYPES_MAPPING: {
				"checkbox group": "l-input-group-multiple",
			},
			SIZES: [],
			LAYOUT: [],
			state: {
				widgit: "Checkbox group",
				options: ["Item1", "Item2", "Item3", "Item4"],
				values: ["Item2", "Item3"],
				layout: "vertival",
				size: "default",
				error: "",
				disabled: false,
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
						options="[${this.state.options}]"\
						value="[${this.state.values}]"\
						layout="${this.state.layout}"\
						size="${this.state.size}"\
						error="${this.state.error}"\
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
		updateLayout: function (event) {
			this.state.layout = event.target.value;
		},
		updateError: function (event) {
			this.state.error = event.target.value;
		},
		updateDisabled: function (event) {
			this.state.disabled = !event.target.checked;
		},
		updateControlSettings: function () {
			const { props } = this.$refs.control.$options || {};
			if (props) {
				const { size, layout } = props;
				this.SIZES = size.options;
				this.LAYOUT = layout.options;
			}
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);
		this.updateControlSettings();
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
		this.updateControlSettings();
	},
};
</script>