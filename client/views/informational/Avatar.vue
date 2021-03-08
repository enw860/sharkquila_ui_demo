<template>
	<div class="AvatarDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					The avatar component is used to represent users on an
					Internet forum. It provides an embodiment of a user's
					characters or ideas.
				</p>
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

			<l-avatar
				ref="avatar"
				slot="widgit"
				:content="state.content"
				:shape="state.shape"
				:avatarSize="state.size"
				:type="state.type"
				:avatarColor="state.avatarColor"
				:iconColor="state.iconColor"
				:isActive="state.isActive"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Content:" size="small">
					<l-input-text
						ref="content"
						slot="labelContent"
						:value="state.content"
						@blur="updateContent"
						:placeholder="
							state.type === 'Text'
								? 'Avatar name'
								: state.type === 'Icon'
								? 'Avatar icon class'
								: 'Image URL'
						"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Shape:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.shape"
						:options="SHAPES"
						@change="updateShape"
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

				<l-label-wrapper value="Type:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.type"
						:options="TYPES"
						@change="updateType"
					/>
				</l-label-wrapper>

				<l-label-wrapper
					value="Avatar background color:"
					size="small"
					v-if="state.type !== 'Image'"
				>
					<l-input-color
						slot="labelContent"
						:value="state.avatarColor"
						@change="updateAvatarColor"
					/>
				</l-label-wrapper>

				<l-label-wrapper
					value="Icon color:"
					size="small"
					v-if="state.type !== 'Image'"
				>
					<l-input-color
						slot="labelContent"
						:value="state.iconColor"
						@change="updateIconColor"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Status:" size="small">
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

			<l-html-text-loader slot="structure" :value="state.codeStructure" />
		</ControlDemoTemplate>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "AvatarDemo",
	displayName: "Avatar",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SHAPES: ["Round", "Square"],
			TYPES: ["Text", "Icon", "Image"],
			SIZES: ["Default", "Small", "Large", "xLarge"],
			state: {
				isActive: true,
				shape: "Round",
				type: "Text",
				size: "xLarge",
				avatarColor: "#0f62fe",
				iconColor: "#ffffff",
				content: "Demo",
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
					type: "String",
					default: "",
					required: "true",
					description:
						"Name to the text type, fontawesome class name to the icon type and url for the image type.",
				},
				{
					prop: "type",
					type: "String",
					default: "text",
					required: "",
					description:
						"Type of the control. Options are 'text', 'image' and 'icon'.",
				},
				{
					prop: "shape",
					type: "String",
					default: "round",
					required: "",
					description:
						"Shape of the control. Options are 'round' and 'square'.",
				},
				{
					prop: "avatarSize",
					type: "String",
					default: "default",
					required: "",
					description:
						"Size of the control. Options are 'small', 'default', 'large', and 'xlarge'.",
				},
				{
					prop: "avatarColor",
					type: "Hex",
					default: "",
					required: "",
					description:
						"Background color of the avatar (for text and icon type). If the color is unset, it will use automatically generated dark color as background color.",
				},
				{
					prop: "iconColor",
					type: "Hex",
					default: "#ffffff",
					required: "",
					description: "Icon color of the avatar text and the icon.",
				},
				{
					prop: "isActive",
					type: "Boolean",
					default: "true",
					required: "",
					description: "Shows if the avatar is active or not.",
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
					method: "@click",
					description:
						"Customized binded action, triggered on avatar onclick.",
				},
				{
					method: "onclick",
					description:
						"External control, triggers on avatar onclick event.",
				},
			],
		};
	},
	methods: {
		updateContent: function (event) {
			this.state.content = this.$refs.content.getValue();
		},
		updateShape: function (event) {
			this.state.shape = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateType: function (event) {
			if (event.target.value === "Image") {
				this.state.content =
					"https://previews.123rf.com/images/pongcpre/pongcpre1607/pongcpre160700046/61442802-a-hand-sign-of-thumb-point-upward-meaning-ok-good-like-etc-with-white-background.jpg";
			} else if (event.target.value === "Icon") {
				this.state.content = "fa fa-apple";
			} else {
				this.state.content = "Demo";
			}

			this.state.type = event.target.value;
			this.$refs.content.setValue(this.state.content);
		},
		updateAvatarColor: function (event) {
			this.state.avatarColor = event.target.value;
		},
		updateIconColor: function (event) {
			this.state.iconColor = event.target.value;
		},
		updateActive: function (event) {
			this.state.isActive = event.target.checked;
		},
	},
	mounted: function () {
		this.state.codeStructure = `${this.$refs.avatar.$el.outerHTML}`;
	},
	updated: function () {
		this.state.codeStructure = `${this.$refs.avatar.$el.outerHTML}`;
	},
};
</script>