<template>
	<div class="BadgeDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					The badge is a sub-component of avatar. It is used to
					representing if there is an update for a user/events.
				</p>
			</div>

			<div slot="properties">
				<l-table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></l-table>
			</div>

			<l-avatar
				slot="widgit"
				content="Lionel Wu"
				avatarSize="large"
				:shape="state.shape"
				:isActive="state.isActive"
			>
				<l-badge
					ref="badge"
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

			<l-html-text-loader slot="structure" :value="state.codeStructure" />
		</ControlDemoTemplate>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "BadgeDemo",
	displayName: "Badge",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SHAPES: ["Round", "Square"],
			SIZES: ["Default", "Small", "Large", "xLarge"],
			VPOSITION: ["Top", "Center", "Bottom"],
			state: {
				isActive: true,
				shape: "Square",
				content: 18,
				vPosition: "Top",
				backgroundColor: "#da1e28",
				codeStructure: "",
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
					prop: "content",
					type: "Number",
					default: "99",
					required: "true",
					description:
						"Number of news. will cap to +99 if the value greater than 99 or -99 if less than -99.",
				},
				{
					prop: "vPosition",
					type: "String",
					default: "Top",
					required: "",
					description: "Position where the badge shows.",
				},
				{
					prop: "backgroundColor",
					type: "Hex",
					default: "#da1e28",
					required: "",
					description: "Background color of the badge control.",
				},
			],
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
		this.state.codeStructure = `${this.$refs.badge.$el.outerHTML}`;
	},
	updated: function () {
		this.state.codeStructure = `${this.$refs.badge.$el.outerHTML}`;
	},
};
</script>