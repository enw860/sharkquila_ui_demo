<template>
	<div class="widgitDemoControl HLayout">
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
	methods: {
		updateBackgoundColor: function (event) {
			this.backgroundColor = event.target.value;
		},
	},
};
</script>

