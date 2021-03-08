<style lang="less">
.SlideoutDemo {
	textarea {
		resize: vertical;
	}

	.temp-block {
		height: 100%;
		width: 350px;
		background-color: #000000;
	}
}
</style>

<template>
	<div class="SlideoutDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used as slideout.</p>
			</div>

			<div slot="properties">
				<l-table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></l-table>
			</div>

			<div slot="events">
				<l-table
					:colSettings="ENENTS_COL_SETTINGS"
					:tableData="ENENTS_TABLE_DATA"
				></l-table>
			</div>

			<div
				class="temp-wrapper HLayout align-center flow-center"
				slot="widgit"
			>
				<l-slideout
					ref="control"
					:direction="state.direction"
					@show="onShow"
					@hide="onHide"
				>
					<div
						class="temp-block VLayout flow-center align-center"
						slot="content"
					>
						<l-text
							value="<This is a demo block>"
							size="xxxlarge"
							color="#ffffff"
						/>
					</div>
				</l-slideout>
			</div>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Direction:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.direction"
						:options="DIRECTIONS"
						@change="updateDirection"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="On click:" size="small">
					<l-input-textarea
						slot="labelContent"
						placeholder="function (event) { <body> }"
						:value="state.onShowFuncBody"
						@blur="updateOnShowFuncBody"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="On click:" size="small">
					<l-input-textarea
						slot="labelContent"
						placeholder="function (event) { <body> }"
						:value="state.onHideFuncBody"
						@blur="updateOnHideFuncBody"
					/>
				</l-label-wrapper>

				<l-button
					value="Show slideout"
					size="Large"
					btnStyle="Primary"
					@click="launchSlideout"
				/>
			</div>

			<l-html-text-loader slot="structure" :value="state.codeStructure" />
		</ControlDemoTemplate>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "SlideoutDemo",
	displayName: "Slideout",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			DIRECTIONS: ["Left", "Right"],
			state: {
				codeStructure: "",
				direction: "Left",
				onShowFuncBody: "console.warn('Show slideout');",
				onHideFuncBody: "console.warn('Hide slideout');",
			},
			PROPS_COL_SETTINGS: [
				{
					name: "prop",
					displayName: "Prop",
					width: "130px",
				},
				{
					name: "type",
					displayName: "Type",
					width: "110px",
				},
				{
					name: "default",
					displayName: "Default",
					width: "110px",
				},
				{
					name: "required",
					displayName: "Required",
					width: "130px",
				},
				{
					name: "description",
					displayName: "Description",
				},
			],
			PROPS_TABLE_DATA: [
				{
					prop: "direction",
					type: "String",
					default: "left",
					required: "",
					description:
						"Direction of the slideout, Options are left and right.",
				},
			],

			ENENTS_COL_SETTINGS: [
				{
					name: "method",
					displayName: "Method",
					width: "130px",
				},
				{
					name: "description",
					displayName: "Description",
				},
			],
			ENENTS_TABLE_DATA: [
				{
					method: "@show",
					description: "Triggered on slideout show up.",
				},
				{
					method: "@hide",
					description: "Triggered on slideout hide.",
				},
				{
					method: "showSlideout(event)",
					description: "Show the slideout.",
				},
				{
					method: "hideSlideout(event)",
					description: "Hide the slideout.",
				},
			],
		};
	},
	methods: {
		updateDirection: function (event) {
			this.state.direction = event.target.value;
		},
		launchSlideout: function (event) {
			this.$refs.control.showSlideout();
		},
		updateOnShowFuncBody: function (event) {
			this.state.onShowFuncBody = event.target.value;
		},
		updateOnHideFuncBody: function (event) {
			this.state.onHideFuncBody = event.target.value;
		},
		onShow: function (event) {
			(() => eval(this.state.onShowFuncBody))(event);
		},
		onHide: function (event) {
			(() => eval(this.state.onHideFuncBody))(event);
		},
	},
	mounted: function () {
		this.state.codeStructure = `${this.$refs.control.$el.outerHTML}`;
	},
	updated: function () {
		this.state.codeStructure = `${this.$refs.control.$el.outerHTML}`;
	},
};
</script>