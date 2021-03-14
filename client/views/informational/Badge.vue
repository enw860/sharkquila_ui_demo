<template>
	<div class="BadgeDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					The badge is a sub-component of avatar. It is used to
					represent an updating event.
				</p>
			</div>

			<l-avatar
				slot="widgit"
				content="Lionel Wu"
				avatarSize="large"
				:shape="state.shape"
				:isActive="state.isActive"
			>
				<l-badge
					ref="control"
					slot="badge"
					:content="state.content"
					:vPosition="state.vPosition"
					:backgroundColor="state.backgroundColor"
				/>
			</l-avatar>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Badge content:" size="small">
					<l-input-number
						ref="content"
						slot="labelContent"
						:value="state.content"
						@blur="updateContent"
						placeholder="Please enter a positive number"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Badge background color:" size="small">
					<l-input-color
						slot="labelContent"
						:value="state.backgroundColor"
						@change="updateBackgroundColor"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Badge position:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.vPosition"
						:options="VPOSITION"
						@change="updatePosition"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Avatar shape:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.shape"
						:options="SHAPES"
						@change="updateShape"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Avatar status:" size="small">
					<l-toggle
						slot="labelContent"
						:state="state.isActive"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
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
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "BadgeDemo",
	displayName: "Badge",
	controlMapping: [
		{
			keywords: ["badge", "information", "l-badge"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SHAPES: ["round", "square"],
			SIZES: ["default", "small", "large", "xlarge"],
			VPOSITION: [],
			state: {
				isActive: true,
				shape: "square",
				content: 18,
				vPosition: "top",
				backgroundColor: "#da1e28",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-avatar\
						content="Lionel Wu"\
						avatarSize="large"\
						shape="${this.state.shape}"\
						:isActive="${this.state.isActive}"\
					>
						<l-badge\
							slot="badge"\
							vPosition="${this.state.vPosition}"\
							backgroundColor="${this.state.backgroundColor}"\
							:content="${this.state.content}"\
						/>\
					</l-avatar>\
				</template>`;
		},
	},
	methods: {
		updateContent: function (event) {
			this.state.content = parseFloat(this.$refs.content.getValue());
		},
		updateBackgroundColor: function (event) {
			this.state.backgroundColor = event.target.value;
		},
		updatePosition: function (event) {
			this.state.vPosition = event.target.value;
		},
		updateShape: function (event) {
			this.state.shape = event.target.value;
		},
		updateActive: function (event) {
			this.state.isActive = event.target.checked;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { vPosition } = props;
			this.VPOSITION = (vPosition || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>