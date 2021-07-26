<style lang="less">
.ExCtls.VLayout > :not(:last-child) {
	margin-bottom: 8px;
}
</style>

<template>
	<div class="TimerDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This timer control is used to count down a given time slot.
					It could be used to indicato the user how much time they
					left for their session.
				</p>
			</div>

			<l-timer
				slot="widgit"
				ref="control"
				:value="state.value"
				:timeFormat="state.timeFormat"
				:size="state.fontSize"
				:fontWeight="parseInt(state.fontWeight)"
				:color="state.color"
				:hideCtls="state.hideCtls"
				:alerts="state.alerts"
				@start="consoleAlert"
				@end="consoleAlert"
				@alert="consoleAlert"
			/>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Set timer in seconds:" size="small">
					<l-input-number
						slot="labelContent"
						:value="state.value.ss"
						@blur="updateTimer"
						placeholder="Please enter a positive number"
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
					<l-input-single-select
						slot="labelContent"
						:value="state.fontSize"
						:options="FONT_SIZES"
						@change="updateFontSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Font weight:" size="small">
					<l-input-slider
						slot="labelContent"
						type="select"
						:min="FONT_WEIGHT[0].value"
						:max="FONT_WEIGHT[FONT_WEIGHT.length - 1].value"
						:value="state.fontWeight"
						:options="FONT_WEIGHT"
						sliderStyle="info"
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

				<l-label-wrapper value="Hide controls:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="True"
						offLabel="False"
						toggleStyle="success"
						:state="state.hideCtls"
						@toggle="updateHideCtls"
					/>
				</l-label-wrapper>

				<l-label-wrapper
					value="External controls:"
					size="small"
					v-if="state.hideCtls"
				>
					<div
						slot="labelContent"
						class="ExCtls flow-between"
						v-bind:class="[
							screenMode === 'small'
								? 'VLayout'
								: 'HLayout align-center',
						]"
					>
						<l-button
							value="Start"
							btnStyle="primary"
							@click="startTimer"
							:disabled="state.blockStart"
						/>
						<l-button
							value="End"
							btnStyle="danger"
							@click="endTimer"
							:disabled="state.blockEnd"
						/>
						<l-button
							value="Reset"
							btnStyle="info"
							@click="resetTimer"
							:disabled="state.blockReset"
						/>
					</div>
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
import eventBus from "../../utils/eventBus";

export default {
	name: "TimerDemo",
	displayName: "Timer",
	controlMapping: [
		{
			keywords: ["timer", "count down", "l-timer"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			FONT_SIZES: [],
			TIME_FORMAT: ["<hh>:<mm>:<ss>", "<mm>:<ss>", "<mm> mins <ss> secs"],
			FONT_WEIGHT: [
				{ value: 200 },
				{ value: 400 },
				{ value: 600 },
				{ value: 800 },
			],
			state: {
				value: { ss: 25 },
				timeFormat: "<mm> mins <ss> secs",
				fontSize: "default",
				fontWeight: 400,
				color: "#000",
				hideCtls: true,
				alerts: [
					{ time: { ss: 20 }, message: "You have 20 seconds left!" },
					{ time: { ss: 10 }, message: "You still have 10 seconds!" },
					{ time: { ss: 5 }, message: "You only have 5 seconds!" },
				],
				blockStart: false,
				blockEnd: true,
				blockReset: true,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-timer\
						:value="{ss: ${this.state.value.ss}}"\
						:timeFormat="${this.state.timeFormat}"\
						:size="${this.state.fontSize}"\
						:fontWeight="${this.state.fontWeight}"\
						:color="${this.state.color}"\
						:hideCtls="${this.state.hideCtls}"\
						:alerts="[<{time: <{hh, ss, mm}>, message: <string>}>]"\
						@start="alert"\
						@end="alert"\
						@alert="alert"\
					/>\
				</template>`;
		},
		screenMode: function () {
			return this.$store.state.main.screenMode;
		},
	},
	methods: {
		updateTimer: function (event) {
			this.state.value = { ss: parseInt(event.target.value) };
			this.state.blockStart = false;
			this.state.blockEnd = true;
			this.state.blockReset = true;
		},
		updateTimeFormat: function (event) {
			this.state.timeFormat = event.target.value;
		},
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
		updateFontWeight: function (option) {
			this.state.fontWeight =
				typeof option === "object" ? option.value : option;
		},
		updateFontColor: function (event) {
			this.state.color = event.target.value;
		},
		updateHideCtls: function (event) {
			this.state.hideCtls = event.target.checked;
		},
		consoleAlert: function (message) {
			if (!message) return;

			const messageObj = { value: message, messageStyle: "info" };

			if (message === "start") {
				this.state.blockStart = true;
				this.state.blockEnd = false;
				this.state.blockReset = true;
				messageObj.value = "Timer starts now!!!";
				messageObj.messageStyle = "primary";
			} else if (message === "end") {
				this.state.blockStart = true;
				this.state.blockEnd = true;
				this.state.blockReset = false;
				messageObj.value = "Time's up!!";
				messageObj.messageStyle = "danger";
			}

			eventBus.$emit("postMessage", messageObj);
		},
		startTimer: function () {
			this.$refs.control.start();
		},
		endTimer: function () {
			this.$refs.control.end();
		},
		resetTimer: function () {
			this.$refs.control.reset();
			this.state.blockStart = false;
			this.state.blockEnd = true;
			this.state.blockReset = true;
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