<template>
	<div class="ClockDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>The button control is used to display time.</p>
			</div>

			<div slot="properties">
				<l-table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></l-table>
			</div>

			<l-clock
				slot="widgit"
				ref="control"
				:clockSize="parseFloat(state.clockSize)"
				:format="state.timeFormat"
				:fontSize="state.fontSize"
				:timezoneOffset="state.timezoneOffset"
				:showTimeString="state.showTimeString"
				:showDateString="state.showDateString"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Clock size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.clockSize"
						:options="CLOCK_SIZES"
						@change="updateClockSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Time format:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.timeFormat"
						:options="TIME_FORMAT"
						@change="updateTimeFormat"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Font size:" size="small">
					<l-input-text
						slot="labelContent"
						placeholder="Font size"
						:value="state.fontSize"
						@blur="updateFontSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Time zone offset:" size="small">
					<l-input-number
						slot="labelContent"
						placeholder="Time zone in hours"
						:value="state.timezoneOffset"
						@blur="updateTimezoneOffset"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Show time string:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="Show"
						offLabel="Hide"
						toggleStyle="success"
						:state="state.showTimeString"
						@toggle="updateShowTimeString"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Show date stirng:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="Show"
						offLabel="Hide"
						toggleStyle="success"
						:state="state.showTimeString"
						@toggle="updateShowDateString"
					/>
				</l-label-wrapper>
			</div>

			<l-html-text-loader slot="structure" :value="state.codeStructure" />
		</ControlDemoTemplate>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "ClockDemo",
	displayName: "Clock",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			CLOCK_SIZES: ["100", "150", "200", "250", "300"],
			TIME_FORMAT: ["hh:mm", "hh:mm:ss", "dd:hh:ss:mm"],
			state: {
				codeStructure: "",
				clockSize: "150",
				timeFormat: "hh:mm:ss",
				fontSize: "0.7em",
				timezoneOffset: 0,
				showTimeString: false,
				showDateString: false,
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
					prop: "clockSize",
					type: "Number",
					default: "150",
					required: "",
					description: "Width and height of the clock control",
				},
				{
					prop: "format",
					type: "String",
					default: "hh:mm:ss",
					required: "",
					description: "Time format of the displayed time string",
				},
				{
					prop: "fontSize",
					type: "String",
					default: "0.7em",
					required: "",
					description: "Font size of the time string",
				},
				{
					prop: "timezoneOffset",
					type: "Number",
					default: "0",
					required: "",
					description: "Time zone offset in hours",
				},
				{
					prop: "showTimeString",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Display time string or not.",
				},
				{
					prop: "showDateString",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Display date string or not",
				},
			],
		};
	},
	methods: {
		updateClockSize: function (event) {
			this.state.clockSize = event.target.value;
		},
		updateTimeFormat: function (event) {
			this.state.timeFormat = event.target.value;
		},
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
		updateTimezoneOffset: function (event) {
			this.state.timezoneOffset = parseFloat(event.target.value);
		},
		updateShowTimeString: function (event) {
			this.state.showTimeString = event.target.checked;
		},
		updateShowDateString: function (event) {
			this.state.showDateString = event.target.checked;
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