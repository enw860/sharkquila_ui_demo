<template>
	<div class="BreadCrumbsDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					The breadcrumbs are often used as page navigators. It shows
					the flow as well as depth of the current page. (the last
					anchor represent the current page and it is always disabled)
				</p>
			</div>

			<l-bread-crumbs
				slot="widgit"
				ref="control"
				:steps="state.steps"
				:size="state.fontSize"
				:fontWeight="parseInt(state.fontWeight)"
				:color="state.fontColor"
				:separator="state.separator"
			/>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Font weight:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.fontWeight"
						:options="FONT_WEIGHT"
						@change="updateFontWeight"
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

				<l-label-wrapper value="Font color:" size="small">
					<l-input-color
						slot="labelContent"
						:value="state.fontColor"
						@change="updateFontColor"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Separator:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.separator"
						@blur="updateSeparator"
						placeholder="Sparator"
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
	name: "BreadCrumbsDemo",
	displayName: "Bread crumbs",
	controlMapping: [
		{
			keywords: [
				"bread",
				"crumb",
				"navigation",
				"information",
				"l-bread-crumbs",
			],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			FONT_SIZES: [],
			FONT_WEIGHT: ["400", "500", "600", "700", "800"],
			state: {
				steps: [
					{ name: "Link1", click: () => alert("Link1") },
					{ name: "Link2", click: () => alert("Link2") },
					{ name: "Link3", click: () => alert("Link3") },
				],
				separator: "/",
				fontSize: "default",
				fontWeight: "400",
				fontColor: "#0f62fe",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-bread-crumbs\
						steps="[{name, click, disabled}...]"\
						size="${this.state.fontSize}"\
						color="${this.state.fontColor}"\
						separator="${this.state.separator}"\
						:fontWeight="${this.state.fontWeight}"\
					/>\
				</template>`;
		},
	},
	methods: {
		updateFontColor: function (event) {
			this.state.fontColor = event.target.value;
		},
		updateFontWeight: function (event) {
			this.state.fontWeight = event.target.value;
		},
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
		updateSeparator: function (event) {
			this.state.separator = event.target.value;
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