<style lang="less">
.LinkDemo textarea {
	resize: vertical;
}
</style>

<template>
	<div class="LinkDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>This control is used to display a link.</p>
			</div>

			<l-link
				slot="widgit"
				ref="control"
				:value="state.value"
				:href="state.href"
				:size="state.fontSize"
				:fontWeight="parseInt(state.fontWeight)"
				:color="state.color"
				:openInNewTab="state.openInNewTab"
				:disabled="state.disabled"
				@click="linkOnClick"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Value:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.value"
						@blur="updateValue"
						placeholder="Text"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Href:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.href"
						@blur="updateHref"
						placeholder="link"
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
					<l-input-single-select
						slot="labelContent"
						:value="state.fontWeight"
						:options="FONT_WEIGHT"
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

				<l-label-wrapper value="On click:" size="small">
					<l-input-textarea
						slot="labelContent"
						placeholder="function (event) { <body> }"
						:value="state.onClickFunctionBody"
						@blur="updateFunctionBody"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Open in a new tab:" size="small">
					<l-toggle
						slot="labelContent"
						:state="state.openInNewTab"
						onLabel="True"
						offLabel="False"
						toggleStyle="success"
						@toggle="updateOpenInNewTab"
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
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "LinkDemo",
	displayName: "Link",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			FONT_SIZES: [],
			FONT_WEIGHT: ["400", "600", "800"],
			state: {
				value: "Some text",
				fontSize: "default",
				fontWeight: "400",
				color: "#0f62fe",
				href: "",
				openInNewTab: true,
				disabled: false,
				onClickFunctionBody: "javascript:void(0);",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-link\
						value="${this.state.value}"\
						href="${this.state.href}"\
						color="${this.state.color}"\
						:size="${this.state.fontSize}"\
						:fontWeight="${this.state.fontWeight}"\
						:openInNewTab="${this.state.openInNewTab}"\
						:disabled="${this.state.disabled}"\
						@click="{function}"\
					/>\
				</template>`;
		},
	},
	methods: {
		updateValue: function (event) {
			this.state.value = event.target.value;
		},
		updateHref: function (event) {
			this.state.href = event.target.value;
		},
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
		updateFontWeight: function (event) {
			this.state.fontWeight = event.target.value;
		},
		updateFontColor: function (event) {
			this.state.color = event.target.value;
		},
		updateFunctionBody: function (event) {
			this.state.onClickFunctionBody = event.target.value;
		},
		updateOpenInNewTab: function (event) {
			this.state.openInNewTab = event.target.checked;
		},
		updateDisabled: function (event) {
			this.state.disabled = !event.target.checked;
		},
		linkOnClick: function (event) {
			(() => eval(this.state.onClickFunctionBody))(event);
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size } = props;
			this.FONT_SIZES = size.options;
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>