<style lang="less">
.ButtonDemo textarea {
	resize: vertical;
}
</style>

<template>
	<div class="ButtonDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					The button control is used to perform some actions while
					being clicked. However, it could be also used as an static
					icon (e.g. empty button value + icon + no on click function)
				</p>
			</div>

			<l-button
				slot="widgit"
				ref="control"
				:value="state.value"
				:icon="state.icon"
				:iconPosition="state.iconPosition"
				:btnStyle="state.btnStyle"
				:size="state.btnSize"
				:disabled="!state.isActive"
				@click="btnOnClick"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Button text:" size="small">
					<l-input-text
						slot="labelContent"
						placeholder="Button text"
						:value="state.value"
						@blur="updateButtonValue"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Icon:" size="small">
					<l-input-text
						slot="labelContent"
						placeholder="Fontawsome icon class"
						:value="state.icon"
						@blur="updateIcon"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Icon position:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.iconPosition"
						:options="ICON_POSITION"
						@change="updateIconPosition"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Button size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.btnSize"
						:options="SIZES"
						@change="updateBtnSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Button style:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.btnStyle"
						:options="BUTTON_STYLE"
						@change="updateBtnStyle"
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

				<l-label-wrapper value="Disable:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
						:state="state.isActive"
						@toggle="updateActive"
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
	name: "ButtonDemo",
	displayName: "Button",
	controlMapping: [
		{
			keywords: [
				"l-button",
				"click",
				"icon",
				"icon button",
				"informational",
			],
		},
	],
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: [],
			ICON_POSITION: [],
			BUTTON_STYLE: [],
			state: {
				value: "Click me",
				icon: "",
				iconPosition: "left",
				btnStyle: "primary",
				btnSize: "default",
				onClickFunctionBody: `alert("Response to click action on button");`,
				isActive: true,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-button\
						value="${this.state.value}"\
						icon="${this.state.icon}"\
						iconPosition="${this.state.iconPosition}"\
						btnStyle="${this.state.btnStyle}"\
						size="${this.state.btnSize}"\
						:disabled="${!this.state.isActive}"\
						@click="{function}"\
					/>
				</template>`;
		},
	},
	methods: {
		updateButtonValue: function (event) {
			this.state.value = event.target.value;
		},
		updateIcon: function (event) {
			this.state.icon = event.target.value;
		},
		updateIconPosition: function (event) {
			this.state.iconPosition = event.target.value;
		},
		updateBtnSize: function (event) {
			this.state.btnSize = event.target.value;
		},
		updateBtnStyle: function (event) {
			this.state.btnStyle = event.target.value;
		},
		updateFunctionBody: function (event) {
			this.state.onClickFunctionBody = event.target.value;
		},
		updateActive: function (event) {
			this.state.isActive = event.target.checked;
		},
		btnOnClick: function (event) {
			(() => eval(this.state.onClickFunctionBody))(event);
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size, iconPosition, btnStyle } = props;
			this.SIZES = (size || {}).options;
			this.ICON_POSITION = (iconPosition || {}).options || [];
			this.BUTTON_STYLE = (btnStyle || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>