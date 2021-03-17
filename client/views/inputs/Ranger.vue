<template>
	<div class="RangerDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					Ranger is an input control that let user choose their when
					slide the slider.
				</p>
			</div>

			<l-toggle
				slot="widgit"
				ref="control"
				:state="true"
				:size="state.size"
				:toggleStyle="state.style"
				:onLabel="state.onLabel"
				:offLabel="state.offLabel"
				:labelType="state.labelType"
				:disabled="state.disabled"
			/>

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
						:value="state.style"
						:options="STYLES"
						@change="updateStyle"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Type:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.type"
						:options="RANGETYPE"
						@change="updateType"
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
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "RangerDemo",
	displayName: "Ranger",
	controlMapping: [
		{
			keywords: ["ranger", "input", "slider", "l-ranger"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: [],
			STYLES: [],
			RANGETYPE: [],
			state: {
				style: "danger",
				size: "default",
				rangeType: "number",
				disabled: false,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
				</template>`;
		},
	},
	methods: {
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateStyle: function (event) {
			this.state.style = event.target.value;
		},
		updateType: function (event) {
			this.state.rangeType = event.target.value;
		},
		updateDisabled: function (event) {
			this.state.disabled = !event.target.checked;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control, 2);
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control, 2);
	},
};
</script>