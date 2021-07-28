<template>
	<div
		class="widgitDemoControl"
		v-bind:class="[screenMode === 'regular' ? 'HLayout' : 'VLayout']"
	>
		<div
			class="widgit VLayout"
			:style="{ backgroundColor: backgroundColor }"
		>
			<l-label-wrapper
				class="Background-color-control"
				value="Background color:"
				size="small"
			>
				<l-input-color
					slot="labelContent"
					:value="backgroundColor"
					@change="updateBackgoundColor"
				/>
			</l-label-wrapper>

			<div class="Demo-box HLayout align-center flow-center">
				<slot name="widgit"></slot>
			</div>
		</div>
		<div class="widgitControl VLayout">
			<slot name="control"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "widgitDemo",
	components: {},
	data: function () {
		return {
			backgroundColor: "#f4f4f4",
		};
	},
	computed: {
		screenMode: function () {
			console.warn(this.$store.state.main.screenMode);
			return this.$store.state.main.screenMode;
		},
	},
	methods: {
		updateBackgoundColor: function (event) {
			this.backgroundColor = event.target.value;
		},
	},
};
</script>

