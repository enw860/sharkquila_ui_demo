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
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This control is used as slideout that showing user some
					infomation. (e.g navigation or form)
				</p>
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
	name: "SlideoutDemo",
	displayName: "Slideout",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			DIRECTIONS: [],
			state: {
				direction: "left",
				onShowFuncBody: "console.warn('Show slideout');",
				onHideFuncBody: "console.warn('Hide slideout');",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-slideout\
						direction="${this.state.direction}"\
						@show="{function}"\
						@hide="{function}"\
					>\
						<div slot="content"></div>\
					</l-slideout>\
				</template>`;
		},
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
		this.$refs.DT.updateControl(this.$refs.control, 2);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { direction } = props;
			this.DIRECTIONS = (direction || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control, 2);
	},
};
</script>