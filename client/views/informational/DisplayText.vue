<template>
	<div class="DisplayTextDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>This control is used to display a plain text.</p>
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
				<l-text value="Controls" size="xlarge" />

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
					<l-input-slider
						slot="labelContent"
						type="select"
						:min="FONT_WEIGHT[0].value"
						:max="FONT_WEIGHT[FONT_WEIGHT.length - 1].value"
						:value="state.fontWeight"
						:options="FONT_WEIGHT"
						sliderStyle="info"
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
		</ControlDemoTemplate>
	</div>
</template>

<script>
import ControlDemoTemplate from "../main/ControlDemoTemplate.vue";

export default {
	name: "DisplayTextDemo",
	displayName: "Plain text",
	controlMapping: [
		{
			keywords: [
				"text",
				"plain",
				"display",
				"title",
				"header",
				"informational",
				"l-text",
			],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			FONT_SIZES: [],
			FONT_WEIGHT: [
				{ value: 200 },
				{ value: 400 },
				{ value: 600 },
				{ value: 800 },
			],
			state: {
				value: "Some text",
				fontSize: "default",
				fontWeight: 400,
				color: "#000",
			},
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
		updateFontWeight: function (event, option) {
			this.state.fontWeight =
				typeof option === "object" ? option.value : option;
		},
		updateFontColor: function (event) {
			this.state.color = event.target.value;
		},
	},
	mounted: function () {
		this.state.codeStructure = `${this.$refs.control.$el.outerHTML}`;
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control, 1);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size } = props;
			this.FONT_SIZES = (size || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control, 1);
	},
};
</script>