<style lang="less">
.Sample-card {
	padding: 16px;
	background: #f4f4f4;
	width: 300px;

	.Sample-card-left {
		margin-right: 16px;
	}

	.Sample-card-right {
		width: 100%;
		:nth-child(2) {
			margin-top: 4px;
			margin-bottom: auto;
		}
	}
}
</style>

<template>
	<div class="SkeletonDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					Display the structure of given block while loading.
					Following is an advance use case of using the skeleton to
					represent the DOM structure while waiting for the async
					results.
				</p>

				<div class="Sample-card HLayout">
					<div class="Sample-card-left">
						<l-sk width="64px" height="64px" />
					</div>
					<div class="Sample-card-right VLayout">
						<l-sk width="70%" textSize="xlarge" />
						<l-sk width="40%" textSize="xsmall" />
						<l-sk width="90%" />
					</div>
				</div>
			</div>

			<div slot="widgit" :style="{ width: '70%' }">
				<l-sk
					ref="control"
					:width="state.width"
					:height="state.height"
					:textSize="state.fontSize"
				/>
			</div>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Width:" size="small">
					<l-input-text
						ref="content"
						slot="labelContent"
						:value="state.width"
						@blur="updateWidth"
						placeholder="Width"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Height:" size="small">
					<l-input-text
						ref="content"
						slot="labelContent"
						:value="state.height"
						@blur="updateHeight"
						placeholder="Height"
					/>
				</l-label-wrapper>

				<l-label-wrapper
					value="Font size:"
					size="small"
					v-if="!state.height"
				>
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
	name: "SkeletonDemo",
	displayName: "Skeleton",
	controlMapping: [
		{
			keywords: ["skeleton", "l-sk"],
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
				width: "100%",
				height: "",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-sk\
                        :width="${this.state.width}"\
                        :height="${this.state.height}"\
                        :textSize="${this.state.fontSize}"\
					/>\
				</template>`;
		},
	},
	methods: {
		updateWidth: function (event) {
			this.state.width = event.target.value;
		},
		updateHeight: function (event) {
			this.state.height = event.target.value;
		},
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { textSize } = props;
			this.FONT_SIZES = (textSize || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>