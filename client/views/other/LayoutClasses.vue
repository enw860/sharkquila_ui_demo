<template>
	<div class="LayoutClassDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					This control is used to demonstarte the bootstrapt flex
					layout classes.
				</p>
			</div>

			<div slot="other" title="Classes">
				<l-table
					:colSettings="PROPS_TBL_SETTINGS"
					:tableData="props_tbl_data"
				></l-table>
			</div>

			<div
				class="content-wrapper"
				v-bind:class="[
					directionClass,
					flowClass,
					alignClass,
					reverseClass,
				]"
				ref="control"
				slot="widgit"
			>
				<l-sk class="Layout-demo-block" width="32px" height="32px" />
				<l-sk class="Layout-demo-block" width="32px" height="32px" />
				<l-sk class="Layout-demo-block" width="32px" height="32px" />
			</div>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Direction:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.direction"
						:options="Object.keys(DIRECTION_MAPPING)"
						@change="updateDirection"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Flow:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.flow"
						:options="Object.keys(FLOW_MAPPING)"
						@change="updateFlow"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Align:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.align"
						:options="Object.keys(ALIGN_MAPPING)"
						@change="updateAlign"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Reverse:" size="small">
					<l-toggle
						slot="labelContent"
						:state="state.reverse"
						onLabel="Reversed"
						offLabel="Off"
						toggleStyle="success"
						@toggle="updateReverse"
					/>
				</l-label-wrapper>
			</div>

			<l-html-text-loader
				slot="code"
				type="<Vue template>"
				:wrapOffset="1"
				:value="codeBody"
			/>
		</ControlDemoTemplate>
	</div>
</template>

<script>
import { normalizeInput } from "../../utils/utilities";
import ControlDemoTemplate from "../main/ControlDemoTemplate.vue";

export default {
	name: "LayoutClassDemo",
	displayName: "Bootstrap classes",
	controlMapping: [
		{
			keywords: ["class", "bootstrap", "horizontal", "vertial", "layout"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			DIRECTION_MAPPING: {
				horizontal: "HLayout",
				vertical: "VLayout",
			},
			FLOW_MAPPING: {
				start: "flow-start",
				center: "flow-center",
				end: "flow-end",
				between: "flow-between",
				around: "flow-around",
				evenly: "flow-evenly",
			},
			ALIGN_MAPPING: {
				start: "align-start",
				center: "align-center",
				end: "align-end",
			},
			PROPS_TBL_SETTINGS: [
				{
					name: "class",
					displayName: "Classes",
					width: "180px",
				},
				{
					name: "description",
					displayName: "Description",
					width: "250px",
				},
			],
			props_tbl_data: [
				{
					class: "HLayout",
					description: "Horizontal layout",
				},
				{
					class: "VLayout",
					description: "Vertical layout",
				},
				{
					class: "reverse",
					description: "Reverse the content layout.",
				},
				{
					class: "flow-start",
					description:
						"Arrange all element to the start of the parent element.",
				},
				{
					class: "flow-center",
					description:
						"Arrange all element to the center of the parent element.",
				},
				{
					class: "flow-end",
					description:
						"Arrange all element to the end of the parent element.",
				},
				{
					class: "flow-between",
					description:
						"Arrange all elementw between of the parent element.",
				},
				{
					class: "flow-around",
					description:
						"Arrange all elements around of the parent element.",
				},
				{
					class: "flow-enenly",
					description:
						"Arrange all elements evenly of the parent element.",
				},
				{
					class: "align-start",
					description: "Align to the begin of the parent element.",
				},
				{
					class: "align-center",
					description: "Align to the center of the parent element.",
				},
				{
					class: "align-end",
					description: "Align to the end of the parent element.",
				},
			],
			state: {
				direction: "horizontal",
				flow: "center",
				align: "center",
				reverse: false,
			},
		};
	},
	computed: {
		directionClass: function () {
			return normalizeInput(this.DIRECTION_MAPPING, this.state.direction);
		},
		flowClass: function () {
			return normalizeInput(this.FLOW_MAPPING, this.state.flow);
		},
		alignClass: function () {
			return normalizeInput(this.ALIGN_MAPPING, this.state.align);
		},
		reverseClass: function () {
			return this.state.reverse ? "reverse" : "";
		},
		codeBody: function () {
			return `\
				<template>\
					<div class="${this.directionClass} ${this.flowClass} ${this.alignClass} ${this.reverseClass}"> \
						<div class="Layout-demo-block">1</div>\
						<div class="Layout-demo-block">2</div>\
						<div class="Layout-demo-block">3</div>\
					</div>\
				</template>`;
		},
	},
	methods: {
		updateDirection: function (event) {
			this.state.direction = event.target.value;
		},
		updateFlow: function (event) {
			this.state.flow = event.target.value;
		},
		updateAlign: function (event) {
			this.state.align = event.target.value;
		},
		updateReverse: function (event) {
			this.state.reverse = !this.state.reverse;
		},
	},
};
</script>