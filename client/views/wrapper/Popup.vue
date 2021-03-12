<template>
	<div class="PopupDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This control is used to trigger a popup menu for designated
					trigger control.
				</p>
			</div>

			<l-popup-wrapper
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.size"
				:direction="state.direction"
			>
				<l-button
					slot="trigger"
					value="Click me"
					btnStyle="Danger"
					@click="showPopup"
				/>
			</l-popup-wrapper>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.size"
						:options="SIZES"
						@change="updateSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Direction:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.direction"
						:options="DIRECTIONS"
						@change="updateDirection"
					/>
				</l-label-wrapper>
			</div>

			<l-html-text-loader
				slot="code"
				type="<Vue template>"
				:wrapOffset="2"
				:value="codeBody"
			/>
		</ControlDemoTemplate>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "PopupDemo",
	displayName: "Popup",
	controlMapping: [
		{
			keywords: [
				"l-popup-wrapper",
				"menu",
				"options",
				"popup",
				"wrapper",
			],
		},
	],
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			DIRECTIONS: [],
			SIZES: [],
			state: {
				value: [
					{
						name: "Center",
						icon: "fa-align-center",
						method: () => alert("Align center"),
						disabled: false,
					},
					{
						name: "Justify",
						icon: "fa-align-justify",
						method: () => alert("Align justify"),
						disabled: false,
					},
					{
						name: "Left",
						icon: "fa-align-left",
						method: () => alert("Align left"),
						disabled: false,
					},
					{
						name: "Right",
						icon: "fa-align-right",
						method: () => alert("Align right"),
						disabled: true,
					},
				],
				direction: "right",
				size: "default",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-popup-wrapper\
						value="{object...}"\
						size="${this.state.size}"\
						direction="${this.state.direction}"\
					>\
						<l-button slot="trigger" value="Click me"/>\
					</l-popup-wrapper>\
				</template>`;
		},
	},
	methods: {
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateDirection: function (event) {
			this.state.direction = event.target.value;
		},
		showPopup: function (event) {
			this.$refs.control.showPopup();
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size, direction } = props;
			this.SIZES = (size || {}).options || [];
			this.DIRECTIONS = (direction || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>