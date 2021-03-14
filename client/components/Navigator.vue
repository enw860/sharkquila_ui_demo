<style lang="less">
@import "../style/theme.less";

.NavigatorWrapper {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	border-right: 1px solid @white;
}

.SlideoutContent {
	.Logo {
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: @grey-100;
	}
}

.Nav-slide.NavigatorWrapper,
.Nav-slide .SlideoutContent {
	width: 250px;
	overflow-y: auto;

	background-color: @grey-100 !important;
	color: @white !important;

	.Navigator {
		width: 250px;
		.DropdownContent div.Button {
			width: 100%;

			&:not(:last-child) {
				margin-bottom: 4px;
			}

			&.selected {
				border-left: 4px solid @primary-060;
			}
		}
	}
}
</style>

<template>
	<component
		v-bind:is="navigatorType"
		v-bind:class="[navigatorType === 'div' ? 'NavigatorWrapper' : '']"
		class="Nav-slide"
		ref="nav"
		@show="() => {}"
		@hide="onHide"
	>
		<div slot="content" class="Navigator">
			<Logo />
			<l-dropdown-wrapper
				ref="categories"
				v-for="(category, i) in Object.keys(categories)"
				:key="category"
				:title="category"
				colorStyle="dark"
				size="large"
				@expand="(event) => expandCategory(event, i)"
			>
				<div slot="content">
					<l-button
						v-bind:class="[
							term.widgetName === pageContent.widgetName
								? 'selected'
								: '',
						]"
						v-for="term in categories[category]"
						:key="term.widgetName"
						:value="term.displayName"
						btnStyle="dark"
						size="large"
						@click="() => switchContextTerm(term)"
					/>
				</div>
			</l-dropdown-wrapper>
		</div>
	</component>
</template>

<script>
import store from "../store/store";
import Logo from "./Logo.vue";

import InformationalDC from "../views/informational";
import InputsDC from "../views/inputs";
import LayoutDC from "../views/layout";
import WrapperDC from "../views/wrapper";
import OtherDC from "../views/other";

export default {
	name: "Navigator",
	components: {
		Logo,
	},
	data: function () {
		return {
			navigatorType: "div",
			categories: {
				Infomational: InformationalDC.map((control) => {
					return {
						category: "Infomational",
						displayName: control.displayName || control.name,
						widgetName: control.name,
					};
				}),
				Inputs: InputsDC.map((control) => {
					return {
						category: "Input",
						displayName: control.displayName || control.name,
						widgetName: control.name,
					};
				}),
				Layout: LayoutDC.map((control) => {
					return {
						category: "Layout",
						displayName: control.displayName || control.name,
						widgetName: control.name,
					};
				}),
				Wrapper: WrapperDC.map((control) => {
					return {
						category: "Wrapper",
						displayName: control.displayName || control.name,
						widgetName: control.name,
					};
				}),
				Other: OtherDC.map((control) => {
					return {
						category: "Other",
						displayName: control.displayName || control.name,
						widgetName: control.name,
					};
				}),
			},
		};
	},
	computed: {
		screenMode: function () {
			return this.$store.state.main.screenMode;
		},
		displayNav: function () {
			return this.$store.state.main.displayNav;
		},
		pageContent: function () {
			return this.$store.state.main.mainContentView;
		},
	},
	methods: {
		switchContextTerm: function (term) {
			store.dispatch("main/switchMainContent", term);
			this.$refs.nav.hideSlideout && this.$refs.nav.hideSlideout();
		},
		onHide: function () {
			store.dispatch("main/hideNav");
		},
		expandCategory: function (event, index) {
			const categories = this.$refs.categories || [];
			categories.forEach((category, i) => {
				if (i !== index) {
					category.collaspeDropDown();
				}
			});
		},
	},
	watch: {
		displayNav: function (newVal, oldVal) {
			newVal &&
				this.$refs.nav.showSlideout &&
				this.$refs.nav.showSlideout();
		},

		screenMode(newVal, oldVal) {
			this.navigatorType = newVal === "small" ? "l-slideout" : "div";
			this.$refs.nav.hideSlideout && this.$refs.nav.hideSlideout();
		},
	},
};
</script>