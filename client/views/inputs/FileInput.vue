<template>
	<div class="FileInputDemo">
		<ControlDemoTemplate ref="DT">
			<div slot="overview">
				<p>The control is used to upload one or more files.</p>
			</div>

			<l-input-file
				slot="widgit"
				ref="control"
				:size="state.size"
				:disabled="state.disabled"
				:multipleFile="state.multipleFiles"
			/>

			<div slot="control">
				<l-text value="Controls" size="xxxlarge" />

				<l-label-wrapper value="Size:" size="small">
					<l-input-single-select
						slot="labelContent"
						:value="state.size"
						:options="SIZES"
						@change="updateSize"
					/>
				</l-label-wrapper>

				<l-label-wrapper
					value="Enable select multiple file:"
					size="small"
				>
					<l-toggle
						slot="labelContent"
						:state="state.multipleFiles"
						onLabel="Multiple files"
						offLabel="Single file"
						toggleStyle="success"
						@toggle="updateMultipleFiles"
					/>
				</l-label-wrapper>

				<l-label-wrapper value="Disabled:" size="small">
					<l-toggle
						slot="labelContent"
						:state="!state.disabled"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
						@toggle="updateDisabled"
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
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

export default {
	name: "FileInputDemo",
	displayName: "File input",
	controlMapping: [
		{
			keywords: ["l-input-file", "file", "document", "upload", "inputs"],
		},
	],
	components: {
		WidgitDemo,
		ControlDemoTemplate,
	},
	data: function () {
		return {
			SIZES: [],
			state: {
				size: "default",
				disabled: false,
				multipleFiles: false,
			},
		};
	},
	computed: {
		codeBody: function () {
			return `\
				<template>\
					<l-input-file\
						size="${this.state.size}"\
						multipleFile="${this.state.multipleFiles}"\
						:disabled="${this.state.disabled}"\
					/>\
				</template>`;
		},
	},
	methods: {
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateMultipleFiles: function (event) {
			this.state.multipleFiles = event.target.checked;
		},
		updateDisabled: function (event) {
			this.state.disabled = !event.target.checked;
		},
	},
	mounted: function () {
		this.$refs.DT.updateControl(this.$refs.control);

		const { props } = this.$refs.control.$options || {};
		if (props) {
			const { size } = props;
			this.SIZES = (size || {}).options || [];
		}
	},
	updated: function () {
		this.$refs.DT.setControlDOMStructure(this.$refs.control);
	},
};
</script>