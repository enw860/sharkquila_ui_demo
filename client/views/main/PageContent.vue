<template>
	<div class="Page HLayout">
		<Navigator />
		<div class="main">
			<MenuBar />
			<div
				class="PageContentWrapper VLayout align-center"
				v-bind:class="[screenMode]"
			>
				<div class="PageContentHeader VLayout">
					<span class="category">{{
						pageContent.category || "Catogory"
					}}</span>
					<span class="displayName" v-bind:class="[screenMode]">{{
						pageContent.displayName || "Display name"
					}}</span>
				</div>

				<div
					class="PageContentNav HLayout"
					v-if="
						hideLinksControls.indexOf(pageContent.displayName) <
							0 && screenMode !== 'small'
					"
				>
					<div
						class="NavBlock"
						v-for="navObj of navLinks"
						:key="navObj.name"
					>
						<l-button
							size="large"
							btnStyle="dark"
							:value="navObj.name"
							:class="navObj.active ? 'active' : ''"
							@click="(event) => scrollTo(event, navObj.href)"
						/>
					</div>
				</div>

				<div class="PageContentBody VLayour align-center">
					<component
						ref="component"
						v-bind:is="pageContent.widgetName"
						:initWidgit="pageContent.value"
					></component>
				</div>

				<div class="PageContentFooter">
					<div class="HLayout">
						<l-link
							value="Github"
							href="https://github.com/enw860/sharkquila_ui_demo"
						/>
						<l-text value="- Version 1.4.0" color="#e0e0e0" />
					</div>

					<div
						v-bind:class="[
							screenMode === 'small' ? 'VLayout' : 'HLayout',
						]"
					>
						<div class="HLayout">
							<l-text
								value="Designed and built by "
								color="#e0e0e0"
							/>
							<l-link
								value="Lionel Wu."
								href="https://www.linkedin.com/in/enhao-wu-18a596138"
							/>
						</div>
						<div class="HLayout">
							<l-text
								value="Licensed under the"
								color="#e0e0e0"
							/>
							<l-link
								value="MIT License."
								href="https://github.com/enw860/sharkquila_ui_demo/blob/main/LICENSE"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navigator from "../../components/Navigator.vue";
import MenuBar from "../../components/MenuBar.vue";

import Welcome from "./Welcome.vue";

import InformationalDC from "../informational";
import InputsDC from "../inputs";
import LayoutDC from "../layout";
import WrapperDC from "../wrapper";
import OtherDC from "../other";

export default {
	name: "PageContent",
	components: {
		Navigator,
		MenuBar,
		Welcome,
		...[
			...InformationalDC,
			...InputsDC,
			...LayoutDC,
			...WrapperDC,
			...OtherDC,
		].reduce((moduleObj, control) => {
			moduleObj[control.name] = control;
			return moduleObj;
		}, {}),
	},
	data: function () {
		return {
			navLinks: [
				{
					active: false,
					name: "Overview",
					href: "#overview",
				},
				{
					active: false,
					name: "Demo",
					href: "#demo",
				},
				{
					active: false,
					name: "Code",
					href: "#code",
				},
				{
					active: false,
					name: "Settings",
					href: "#properties",
				},
			],
			hideLinksControls: ["Sharkquila UI", "Color variables"],
		};
	},
	computed: {
		pageContent: function () {
			return this.$store.state.main.mainContentView || {};
		},

		screenMode: function () {
			return this.$store.state.main.screenMode;
		},

		scrollHeightDeduction: function () {
			const menuBar = this.$el.querySelector(".MenuBar");
			const menuBarHeight = menuBar
				? menuBar.getBoundingClientRect().height
				: 0;

			const navBar = this.$el.querySelector(".PageContentNav");
			const navBarHeight = navBar
				? navBar.getBoundingClientRect().height
				: 0;

			return menuBarHeight + navBarHeight + 16;
		},
	},
	methods: {
		scrollTo: function (event, anchor) {
			event.preventDefault();

			let anchorTag = anchor.match(/#(\w+)/);
			anchorTag = anchorTag ? anchorTag[1] : "";

			const anchorEle = document.querySelector(`a[name=${anchorTag}]`);
			const anchorPosition = anchorEle ? anchorEle.offsetTop : 0;

			this.navLinks = this.navLinks.map((navObj) => {
				navObj.active = navObj.href === anchor;
				return navObj;
			});

			window.scrollTo(0, anchorPosition - this.scrollHeightDeduction);
		},
		resetPage: function () {
			window.scrollTo(0, 0);
			this.navLinks = this.navLinks.map((navObj) => {
				navObj.active = false;
				return navObj;
			});
		},
	},
	watch: {
		pageContent: function (newVal, oldVal) {
			console.debug(`content switch: from ${oldVal} to ${newVal}`);
			this.resetPage();
		},
	},
	beforeDestroy: function () {
		window.removeEventListener("scroll", this.onScroll, true);
	},
};
</script>