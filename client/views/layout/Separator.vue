<style lang="less">
.SeparatorDemo .temp-wrapper {
	width: 80%;
	height: 80%;
	position: relative;
}
</style>

<template>
	<div class="SeparatorDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>This control is used to divide views.</p>
			</div>

			<div
				class="temp-wrapper HLayout align-center flow-center"
				slot="widgit"
			>
				<l-separator
					ref="control"
					:direction="state.direction"
					:thickness="state.thickness"
					:color="state.color"
				/>
			</div>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Direction:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.direction"
						:options="DIRECTIONS"
						@change="updateDirection"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Color:" size="small">
					<l-input-color
						slot="labelContent"
						:value="state.color"
						@change="updateColor"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Thickness:" size="small">
					<l-input-slider
						slot="labelContent"
						:min="1"
						:max="10"
						:value="state.thickness"
						sliderStyle="info"
						@change="updateThickness"
					/>
				</l-label-wrapper>
			</div>

			<l-html-text-loader
				slot="code"
				type="<Vue template>"
				:wrapOffset="1"
				:value="codeBody"
			/>
		</ControlDemoTemplate>
	</div>
</template>

<script>
import ControlDemoTemplate from "../main/ControlDemoTemplate.vue";

export default {
	name: "SeparatorDemo",
	displayName: "Separator",
	controlMapping: [
		{
			keywords: ["separat", "layout", "l-separator"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			DIRECTIONS: [],
			state: {
				direction: "horizontal",
				thickness: 2,
				color: "#000000",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-separator\
						direction="${this.state.direction}"\
						color="${this.state.color}"\
						:thickness="${this.state.thickness}"\
					/>\
				</template>`;
		},
	},
	methods: {
		updateDirection: function (event) {
			this.state.direction = event.target.value;
		},
		updateColor: function (event) {
			this.state.color = event.target.value;
		},
		updateThickness: function (option) {
			this.state.thickness =
				typeof option === "object" ? option.value : option;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control, 1);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { direction } = props;
			this.DIRECTIONS = (direction || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control, 1);
	},
};
</script>