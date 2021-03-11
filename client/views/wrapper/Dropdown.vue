<style lang="less">
.DropdownDemo {
	.temp-block {
		height: 150px;
		width: 200px;
		background-color: white;
	}
}
</style>

<template>
	<div class="DropdownDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>This control is used to hide and expand a section.</p>
			</div>

			<l-dropdown-wrapper
				slot="widgit"
				ref="control"
				:title="state.title"
				:expanded="state.expanded"
				:colorStyle="state.colorStyle"
				:size="state.size"
			>
				<div
					class="temp-block VLayout flow-center align-center"
					slot="content"
				>
					<l-text
						value="<Demo block>"
						size="xxxlarge"
						color="#000000"
					/>
				</div>
			</l-dropdown-wrapper>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Title:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.title"
						@blur="updateTitle"
						placeholder="Title"
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

				<l-label-wrapper value="Style:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.colorStyle"
						:options="STYLES"
						@change="updateColorStyle"
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
	name: "DropdownDemo",
	displayName: "Dropdown",
	controlMapping: [
		{
			keywords: ["l-dropdown-wrapper", "collaspe", "expand"],
		},
	],
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: [],
			STYLES: [],
			state: {
				expanded: false,
				title: "This is a demo block",
				size: "default",
				colorStyle: "default",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-dropdown-wrapper\
						title="${this.state.title}"\
						colorStyle="${this.state.colorStyle}"\
						size="${this.state.size}"\
						:expanded="${this.state.expanded}"\
					>\
						<div slot="content"></div>\
					</l-dropdown-wrapper>\
				</template>`;
		},
	},
	methods: {
		updateTitle: function (event) {
			this.state.title = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateColorStyle: function (event) {
			this.state.colorStyle = event.target.value;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size, colorStyle } = props;
			this.STYLES = (size || {}).options || [];
			this.SIZES = (colorStyle || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>