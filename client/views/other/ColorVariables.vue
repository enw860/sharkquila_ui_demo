<template>
	<div class="ColorVariablesDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					This control is used to demonstarte the bootstrapt layout
					classes. You can copy and paste following line to your less
					file to enable the theme variable.
				</p>
				<p class="code">
					@import "sharkquila_ui_toolkit/src/style/theme/theme.less";
				</p>
			</div>

			<div slot="other" title="Colors">
				<div class="Color-wrapper HLayout">
					<div
						class="Color-block"
						v-bind:class="[screenMode]"
						v-for="color of colors"
						:key="color.name"
					>
						<div class="Color-options">
							<div
								class="Color-option HLayout flow-between"
								v-for="(option, index) of color.options"
								v-bind:style="{ backgroundColor: option.value }"
								:key="option.name"
							>
								<l-text
									:fontWeight="500"
									:value="option.name"
									:color="index < 5 ? '#ffffff' : '#161616'"
								/>
								<l-text
									class="Hex-color"
									:fontWeight="500"
									:value="option.value"
									:color="index < 5 ? '#ffffff' : '#161616'"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ControlDemoTemplate>
	</div>
</template>

<script>
import ControlDemoTemplate from "../main/ControlDemoTemplate.vue";

const DANGER = [
	{ name: "@danger-100", value: "#2d0709" },
	{ name: "@danger-090", value: "#520408" },
	{ name: "@danger-080", value: "#750e13" },
	{ name: "@danger-070", value: "#a2191f" },
	{ name: "@danger-060", value: "#da1e28" },
	{ name: "@danger-050", value: "#fa4d56" },
	{ name: "@danger-040", value: "#ff8389" },
	{ name: "@danger-030", value: "#ffb3b8" },
	{ name: "@danger-020", value: "#ffd7d9" },
	{ name: "@danger-010", value: "#fff1f1" },
];

const PRIMARY = [
	{ name: "@primary-100", value: "#001141" },
	{ name: "@primary-090", value: "#001d6c" },
	{ name: "@primary-080", value: "#002d9c" },
	{ name: "@primary-070", value: "#0043ce" },
	{ name: "@primary-060", value: "#0f62fe" },
	{ name: "@primary-050", value: "#4589ff" },
	{ name: "@primary-040", value: "#78a9ff" },
	{ name: "@primary-030", value: "#a6c8ff" },
	{ name: "@primary-020", value: "#d0e2ff" },
	{ name: "@primary-010", value: "#edf5ff" },
];

const INFO = [
	{ name: "@info-100", value: "#061727" },
	{ name: "@info-090", value: "#012749" },
	{ name: "@info-080", value: "#003a6d" },
	{ name: "@info-070", value: "#00539a" },
	{ name: "@info-060", value: "#0072c3" },
	{ name: "@info-050", value: "#1192e8" },
	{ name: "@info-040", value: "#33b1ff" },
	{ name: "@info-030", value: "#82cfff" },
	{ name: "@info-020", value: "#bae6ff" },
	{ name: "@info-010", value: "#e5f6ff" },
];

const SUCCESS = [
	{ name: "@success-100", value: "#071908" },
	{ name: "@success-090", value: "#022d0d" },
	{ name: "@success-080", value: "#044317" },
	{ name: "@success-070", value: "#0e6027" },
	{ name: "@success-060", value: "#198038" },
	{ name: "@success-050", value: "#24a148" },
	{ name: "@success-040", value: "#42be65" },
	{ name: "@success-030", value: "#6fdc8c" },
	{ name: "@success-020", value: "#a7f0ba" },
	{ name: "@success-010", value: "#defbe6" },
];

const GREY = [
	{ name: "@grey-100", value: "#161616" },
	{ name: "@grey-090", value: "#262626" },
	{ name: "@grey-080", value: "#393939" },
	{ name: "@grey-070", value: "#525252" },
	{ name: "@grey-060", value: "#6f6f6f" },
	{ name: "@grey-050", value: "#8d8d8d" },
	{ name: "@grey-040", value: "#a8a8a8" },
	{ name: "@grey-030", value: "#c6c6c6" },
	{ name: "@grey-020", value: "#e0e0e0" },
	{ name: "@grey-010", value: "#f4f4f4" },
];

export default {
	name: "ColorVariablesDemo",
	displayName: "Color variables",
	controlMapping: [
		{
			keywords: ["color", "variable", "theme"],
		},
	],
	components: {
		ControlDemoTemplate,
	},
	data: function () {
		return {
			colors: [
				{ name: "Danger", options: DANGER },
				{ name: "Primary", options: PRIMARY },
				{ name: "Information", options: INFO },
				{ name: "Success", options: SUCCESS },
				{ name: "Grey", options: GREY },
			],
		};
	},
	computed: {
		screenMode: function () {
			return this.$store.state.main.screenMode;
		},
	},
};
</script>