<template>
	<div class="TimerDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This control is used to display a link that could used to
					launch a link or launch an action.
				</p>
			</div>

			<l-timer slot="widgit" ref="control" :size="state.fontSize" />

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Font size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.fontSize"
						:options="FONT_SIZES"
						@change="updateFontSize"
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
	name: "TimerDemo",
	displayName: "Timer",
	controlMapping: [
		{
			keywords: ["timer", "count down", "l-timer"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			FONT_SIZES: [],
			state: {
				fontSize: "default",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-timer\
					/>\
				</template>`;
		},
	},
	methods: {
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size } = props;
			this.FONT_SIZES = (size || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>