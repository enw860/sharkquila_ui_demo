<template>
	<div class="ClockDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					The clock control is used to display the time (could be set
					to adapt different time zone).
				</p>
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
	name: "ClockDemo",
	displayName: "Clock",
	controlMapping: [
		{
			keywords: ["clock", "information", "time", "watch", "l-clock"],
		},
	],
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			CLOCK_SIZES: ["100", "150", "200", "250", "300"],
			TIME_FORMAT: ["hh:mm", "hh:mm:ss", "dd:hh:ss:mm"],
			state: {
				clockSize: "150",
				timeFormat: "hh:mm:ss",
				fontSize: "0.7em",
				timezoneOffset: 0,
				showTimeString: false,
				showDateString: false,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-clock\
						format="${this.state.timeFormat}"\
						fontSize="${this.state.fontSize}"\
						:clockSize="${parseFloat(this.state.clockSize)}"\
						:timezoneOffset="${this.state.timezoneOffset}"\
						:showTimeString="${this.state.showTimeString}"\
						:showDateString="${this.state.showDateString}"\
					/>\
				</template>`;
		},
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
		this.$refs.DT.updateControl(this.$refs.control);
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>