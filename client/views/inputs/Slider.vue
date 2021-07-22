<style lang="less">
.slider-box {
	width: 80%;
}
</style>

<template>
	<div class="SliderDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					Slider is an input control that allow user to choose a
					scalable value by sliding the slider thumb.
				</p>
			</div>

			<div class="slider-box" slot="widgit">
				<l-input-slider
					ref="control"
					:size="state.size"
					:type="state.type"
					:sliderStyle="state.sliderStyle"
					:disabled="state.disabled"
					:mute="state.mute"
				/>
			</div>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

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
						:value="state.sliderStyle"
						:options="STYLES"
						@change="updateStyle"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Type:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.type"
						:options="TYPES"
						@change="updateType"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Mute slider thumb:" size="small">
					<l-toggle
						slot="labelContent"
						:state="state.mute"
						onLabel="Active"
						offLabel="Mute"
						toggleStyle="success"
						@toggle="updateMute"
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
import ControlDemoTemplate from "../main/ControlDemoTemplate.vue";

export default {
	name: "SliderDemo",
	displayName: "Slider",
	controlMapping: [
		{
			keywords: ["slider", "input", "l-input-slider"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: [],
			STYLES: [],
			TYPES: [],
			state: {
				sliderStyle: "danger",
				size: "default",
				type: "ranger",
				disabled: false,
				mute: false,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-input-slider\
						:size="${this.state.size}"\
						:type="${this.state.type}"\
						:sliderStyle="${this.state.sliderStyle}"\
						:disabled="${this.state.disabled}"\
						:mute="${this.state.mute}"\
					/>\
				</template>`;
		},
	},
	methods: {
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateStyle: function (event) {
			this.state.sliderStyle = event.target.value;
		},
		updateType: function (event) {
			this.state.type = event.target.value;
		},
		updateDisabled: function (event) {
			this.state.disabled = !event.target.checked;
		},
		updateMute: function (event) {
			this.state.mute = event.target.checked;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control, 2);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size, sliderStyle, type } = props;
			this.SIZES = (size || {}).options || [];
			this.STYLES = (sliderStyle || {}).options || [];
			this.TYPES = (type || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control, 2);
	},
};
</script>