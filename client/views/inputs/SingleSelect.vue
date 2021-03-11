<template>
	<div class="SingleSelectDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This control is used to display a range of options, and only
					allow user to choose one value. It could be also combined
					with Label Wrapper control to provide more advance uses.
				</p>
			</div>

			<component
				v-bind:is="widgitControl"
				slot="widgit"
				ref="control"
				:options="state.options"
				:value="state.value"
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
						ref="typeSelector"
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
					value="Layout:"
					size="small"
					v-if="state.widgit !== 'Single select'"
				>
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
	name: "SingleSelectDemo",
	displayName: "Single select",
	controlMapping: [
		{
			value: "Single select",
			keywords: ["l-input-single-select", "select"],
		},
		{
			value: "Radio group",
			keywords: ["l-input-group-single", "radio group"],
		},
	],
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			TYPES: ["Single select", "Radio group"],
			TYPES_MAPPING: {
				"single select": "l-input-single-select",
				"radio group": "l-input-group-single",
			},
			SIZES: [],
			LAYOUT: [],
			state: {
				widgit: this.initWidgit,
				options: ["Item1", "Item2", "Item3", "Item4"],
				value: "Item1",
				layout: "vertival",
				size: "default",
				error: "",
				disabled: false,
			},
		};
	},
	props: {
		initWidgit: {
			type: String,
			default: "Single select",
		},
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
						value="${this.state.value}"\
						${this.state.layout.length === 0 ? `layout=${this.state.layout}` : ""}\
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
			this.$refs.DT.updateControl(this.$refs.control);

			const { props } = this.$refs.control.$options || {};
			if (props) {
				const { size, layout } = props;
				this.SIZES = (size || {}).options || [];
				this.LAYOUT = (layout || {}).options || [];
			}
		},
	},
	watch: {
		initWidgit: function (newVal, oldVal) {
			if (this.$refs.typeSelector) {
				this.$refs.typeSelector.onchange({
					target: {
						value: newVal,
					},
				});
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