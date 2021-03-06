<template>
	<div class="TooltipDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					This control is used to add a tooltip for a given content.
					It could be used to show either a static tooltip or a on
					hover tooltip.
				</p>
			</div>

			<l-tooltip-wrapper
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.size"
				:mPosition="state.mPosition"
				:sPosition="state.sPosition"
				:displayOnHover="state.displayOnHover"
			>
				<l-button
					slot="content"
					value="Hover on me"
					btnStyle="Danger"
				/>
			</l-tooltip-wrapper>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Tooltip text:" size="small">
					<l-input-text
						slot="labelContent"
						:value="state.value"
						@blur="updateTooltip"
						placeholder="Tooltip text"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.size"
						:options="SIZES"
						@change="updateSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Vertical position:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.mPosition"
						:options="MPOSITIONS"
						@change="updateMPosition"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Vertical position:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.sPosition"
						:options="SPOSITIONS"
						@change="updateSPosition"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Show on hover:" size="small">
					<l-toggle
						slot="labelContent"
						onLabel="True"
						offLabel="False"
						toggleStyle="success"
						:state="state.displayOnHover"
						@toggle="updateDisplayOnHover"
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
import ControlDemoTemplate from "../main/ControlDemoTemplate.vue";

export default {
	name: "TooltipDemo",
	displayName: "Tooltip",
	controlMapping: [
		{
			keywords: ["tooltip", "wrapper", "l-tooltip-wrapper"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			MPOSITIONS: [],
			SPOSITIONS: [],
			SIZES: [],
			state: {
				value: "Tooltip",
				size: "default",
				mPosition: "top",
				sPosition: "start",
				displayOnHover: true,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-tooltip-wrapper\
						value="${this.state.value}"\
						size="${this.state.size}"\
						mPosition="${this.state.mPosition}"\
						sPosition="${this.state.sPosition}"\
						:displayOnHover="${this.state.displayOnHover}"\
					>\
						<l-button slot="content" value="Hover on me"/>\
					</l-tooltip-wrapper>\
				</template>`;
		},
	},
	methods: {
		updateTooltip: function (event) {
			this.state.value = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateMPosition: function (event) {
			this.state.mPosition = event.target.value;
		},
		updateSPosition: function (event) {
			this.state.sPosition = event.target.value;
		},
		updateDisplayOnHover: function (event) {
			this.state.displayOnHover = event.target.checked;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size, sPosition, mPosition } = props;
			this.SIZES = (size || {}).options || [];
			this.SPOSITIONS = (sPosition || {}).options || [];
			this.MPOSITIONS = (mPosition || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>