<template>
	<div class="ColorVariablesDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					This control is used to demonstarte the bootstrapt layout
					classes. You can copy and paste following line to your less
					file to enable the theme variable (you can also change the
					pre-defined colors).
				</p>
				<p class="code">
					@import
					"sharkquila_ui_toolkit/src/style/theme/index.less";<br /><br />
					// add custom theme variables here (themeable feature)<br /><br />
					@import "sharkquila_ui_toolkit/src/components/index.less";
				</p>
			</div>

			<div slot="other" title="Colors">
				<div class="Color-wrapper HLayout">
					<div
						class="Color-block"
						v-bind:class="[screenMode]"
						v-for="colorCard of allColorCards"
						:key="colorCard.name"
					>
						<div class="Color-options">
							<div
								class="Color-option HLayout flow-between"
								v-for="option of colorCard.options"
								v-bind:class="option.class"
								:key="option.name"
							>
								<l-text
									:fontWeight="500"
									:value="option.name"
									:color="option.color"
								/>
								<l-text
									class="Hex-color"
									:fontWeight="500"
									:value="option.bgColor"
									:color="option.color"
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
			contrastRationThreshold: 4,
			parentColors: ["danger", "primary", "info", "success", "grey"],
		};
	},
	computed: {
		allColorCards: function () {
			return this.parentColors.map((option) => {
				return {
					name: option,
					options: this.getColorCards(option),
				};
			});
		},

		screenMode: function () {
			return this.$store.state.main.screenMode;
		},
	},

	methods: {
		getColorCards: function (prefix) {
			return Array.from(new Array(10), (_, index) => {
				const colorCode = ((10 - index) * 10)
					.toString()
					.padStart(3, "0");

				const cvClassName = `${prefix}-${colorCode}`;
				const style = this.getNetBGOfClasses(cvClassName);

				return {
					name: `@${prefix}-${colorCode}`,
					class: cvClassName,
					bgColor: style.backgroundColor,
					color: style.color,
				};
			});
		},

		getNetBGOfClasses: function (classes) {
			const testDiv = document.createElement("div");
			testDiv.classList.add(classes);
			document.body.appendChild(testDiv);

			const style = getComputedStyle(testDiv);

			const CCR = this.computeContrastRatio(
				this.rgbStr2Arr(style.color),
				this.rgbStr2Arr(style.backgroundColor)
			);

			const retStyles = {
				color:
					CCR < this.contrastRationThreshold
						? "#ffffff"
						: style.color,
				backgroundColor: this.rgb2hex(style.backgroundColor),
			};

			testDiv.remove();
			return retStyles;
		},

		rgb2hex: function (rgbStr) {
			const rgb = this.rgbStr2Arr(rgbStr);
			return (
				"#" +
				rgb
					.map((x) => {
						const hex = x.toString(16);
						return hex.length === 1 ? "0" + hex : hex;
					})
					.join("")
			);
		},

		rgbStr2Arr: function (rgbStr) {
			const parsedRgb = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			return parsedRgb
				? [parsedRgb[1], parsedRgb[2], parsedRgb[3]].map((x) =>
						parseInt(x)
				  )
				: [0, 0, 0];
		},

		computeContrastRatio: function (rgb1, rgb2) {
			let lum1 = this.luminance(rgb1[0], rgb1[1], rgb1[2]);
			let lum2 = this.luminance(rgb2[0], rgb2[1], rgb2[2]);
			let brightest = Math.max(lum1, lum2);
			let darkest = Math.min(lum1, lum2);
			return (brightest + 0.05) / (darkest + 0.05);
		},

		luminance: function (r, g, b) {
			let a = [r, g, b].map(function (v) {
				v /= 255;
				return v <= 0.03928
					? v / 12.92
					: Math.pow((v + 0.055) / 1.055, 2.4);
			});
			return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
		},
	},
};
</script>