<template>
	<div class="LabelWrapperDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>This control is used to add a label for control.</p>
			</div>

			<l-label-wrapper
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.size"
				:position="state.position"
				:required="state.required"
				:disabled="state.disabled"
			>
				<l-input-text slot="labelContent" placeholder="Demo input" />
			</l-label-wrapper>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Label:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.value"
						@blur="updateLabel"
						placeholder="Label"
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

				<l-label-wrapper value="Position:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.position"
						:options="POSITIONS"
						@change="updatePosition"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Ruquired:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="Required"
						offLabel="Not required"
						toggleStyle="success"
						:state="state.required"
						@toggle="updateRequired"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Disable:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
						:state="state.disabled"
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
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "LabelWrapperDemo",
	displayName: "Label wrapper",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			POSITIONS: [],
			SIZES: [],
			state: {
				value: "This is a testing title: ",
				position: "top",
				size: "default",
				required: false,
				disabled: false,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-label-wrapper\
						value="${this.state.value}"\
						size="${this.state.size}"\
						position="${this.state.position}"\
						:required="${this.state.required}"\
						:disabled="${this.state.disabled}"\
					>\
						<l-input-text slot="labelContent" placeholder="Demo input" />\
					</l-label-wrapper>\
				</template>`;
		},
	},
	methods: {
		updateLabel: function (event) {
			this.state.value = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updatePosition: function (event) {
			this.state.position = event.target.value;
		},
		updateRequired: function (event) {
			this.state.required = event.target.checked;
		},
		updateDisabled: function (event) {
			this.state.disabled = event.target.checked;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control, 2);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size, position } = props;
			this.SIZES = size.options;
			this.POSITIONS = position.options;
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control, 2);
	},
};
</script>