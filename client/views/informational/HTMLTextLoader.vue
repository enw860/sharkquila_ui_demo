<style lang="less">
.HTMLTextLoaderDemo textarea {
	resize: vertical;
	height: 250px;
}
</style>

<template>
	<div class="HTMLTextLoaderDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This control is used to display a DOM-like structured code.
				</p>
			</div>

			<l-html-text-loader
				slot="widgit"
				ref="control"
				:wrapOffset="state.wrapOffset"
				:type="state.type"
				:value="state.value"
				@error="updateInputError"
			/>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Type:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.type"
						@blur="updateType"
						placeholder="type"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Wrap offset:" size="small">
					<l-input-slider
						slot="labelContent"
						:min="1"
						:max="5"
						:value="state.wrapOffset"
						sliderStyle="info"
						@change="updateWrapOffset"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="DOM code:" size="small">
					<l-input-textarea
						slot="labelContent"
						:value="state.value"
						:error="state.error"
						@blur="updateValue"
						placeholder="Dom code"
					/>
				</l-label-wrapper>
			</div>

			<l-html-text-loader
				slot="code"
				type="<Vue template>"
				:value="codeBody"
				:wrapOffset="2"
			/>
		</ControlDemoTemplate>
	</div>
</template>

<script>
import ControlDemoTemplate from "../main/ControlDemoTemplate.vue";

export default {
	name: "HTMLTextLoaderDemo",
	displayName: "DOM loader",
	controlMapping: [
		{
			keywords: ["DOM", "html", "loader", "l-html-text-loader"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			state: {
				value: `<body><h1>Sharkquila UI</h1><div class="Hello" style="{width: 100px;}" disabled>Testing</div></body>`,
				type: "<HTML body>",
				wrapOffset: 2,
				error: "",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-html-text-loader\
                        :wrapOffset="${this.state.wrapOffset}"\
                        :type="${this.state.type}"\
                        :value="{DOM structure}"\
                    />\
				</template>`;
		},
	},
	methods: {
		updateValue: function (event) {
			this.state.value = event.target.value;
		},
		updateType: function (event) {
			this.state.type = event.target.value;
		},
		updateWrapOffset: function (option) {
			this.state.wrapOffset =
				typeof option === "object" ? option.value : option;
		},
		updateInputError: function (error) {
			this.state.error = error;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>