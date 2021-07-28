<template>
	<div class="AvatarDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>
					The avatar component is used to represent users on an
					internet forum. It uses to provide an embodiment of a user's
					characters or ideas.
				</p>
			</div>

			<l-avatar
				ref="control"
				slot="widgit"
				:content="state.content"
				:shape="state.shape"
				:avatarSize="state.avatarSize"
				:type="state.type"
				:avatarColor="state.avatarColor"
				:iconColor="state.iconColor"
				:isActive="state.isActive"
			/>

			<div slot="control">
				<l-text value="Controls" size="xlarge" />

				<l-label-wrapper value="Content:" size="small">
					<l-input-text
						ref="content"
						slot="labelContent"
						:value="state.content"
						@blur="updateContent"
						:placeholder="
							state.type === 'text'
								? 'Avatar name'
								: state.type === 'icon'
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
						:value="state.avatarSize"
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
					v-if="state.type !== 'image'"
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
					v-if="state.type !== 'image'"
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

export default {
	name: "AvatarDemo",
	displayName: "Avatar",
	controlMapping: [
		{
			keywords: ["avatar", "information", "l-avatar"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SHAPES: [],
			TYPES: [],
			SIZES: [],
			state: {
				isActive: true,
				shape: "round",
				type: "text",
				avatarSize: "xlarge",
				avatarColor: "#0f62fe",
				iconColor: "#ffffff",
				content: "avatar",
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-avatar\
						content="${this.state.content}"\
						shape="${this.state.shape}"\
						avatarSize="${this.state.avatarSize}"\
						type="${this.state.type}"\
						avatarColor="${this.state.avatarColor}"\
						iconColor="${this.state.iconColor}"\
						:isActive="${this.state.isActive}"\
					/>\
						<l-badge slot="badge" />\
					</l-avatar>\
				</template>`;
		},
	},
	methods: {
		updateContent: function (event) {
			this.state.content = this.$refs.content.getValue();
		},
		updateShape: function (event) {
			this.state.shape = event.target.value;
		},
		updateSize: function (event) {
			this.state.avatarSize = event.target.value;
		},
		updateType: function (event) {
			if (event.target.value === "image") {
				this.state.content =
					"https://previews.123rf.com/images/pongcpre/pongcpre1607/pongcpre160700046/61442802-a-hand-sign-of-thumb-point-upward-meaning-ok-good-like-etc-with-white-background.jpg";
			} else if (event.target.value === "icon") {
				this.state.content = "fa-apple";
			} else {
				this.state.content = "avatar";
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
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { shape, type, avatarSize } = props;
			this.SHAPES = (shape || {}).options || [];
			this.TYPES = (type || {}).options || [];
			this.SIZES = (avatarSize || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>