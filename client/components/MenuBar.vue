<template>
	<div class="MenuBar HLayout align-center flow-between">
		<Logo v-if="screenMode === 'regular'" />
		<l-button
			v-else-if="screenMode === 'small'"
			@click="launchNav"
			icon="fa-bars"
			value
			size="large"
			btnStyle="transparent"
		/>

		<l-popup-wrapper
			ref="popup"
			size="default"
			direction="left"
			:value="options"
		>
			<div class="SearchBarWrapper" slot="trigger">
				<div class="SearchBar HLayout">
					<l-input-text
						ref="search"
						placeholder="Search"
						size="small"
						@keyup="enterSearch"
						@focus="openPopup"
					/>
					<l-button icon="fa-search" value btnStyle="transparent" />
				</div>
			</div>
		</l-popup-wrapper>
	</div>
</template>

<script>
import store from "../store/store";
import Logo from "./Logo.vue";

import { matchByKeyword } from "../utils/searchControls";

export default {
	name: "MenuBar",
	components: {
		Logo,
	},
	data: function () {
		return {
			options: [],
			lengthTriggerSearch: 3,
		};
	},
	computed: {
		screenMode: function () {
			return this.$store.state.main.screenMode;
		},
	},
	methods: {
		launchNav: function (event) {
			store.dispatch("main/openNav");
		},
		enterSearch: function (event) {
			const value = event.target.value;
			if (value.length >= this.lengthTriggerSearch) {
				const matchedTerms = matchByKeyword(value);
				this.options = matchedTerms.map((entry) => {
					const displayName =
						entry.displayName +
						(!!entry.value ? `- ${entry.value}` : "");

					return {
						name: displayName,
						method: () => {
							this.switchContextTerm(entry);
							this.$refs.search.setValue("");
							this.$refs.popup.hidePopup();
						},
					};
				});
				this.$refs.popup.showPopup();
			} else {
				this.$refs.popup.hidePopup();
			}
		},
		openPopup: function (event) {
			const value = event.target.value;
			if (value.length >= this.lengthTriggerSearch) {
				this.$refs.popup.showPopup();
			}
		},
		switchContextTerm: function (term) {
			store.dispatch("main/switchMainContent", term);
		},
	},
};
</script>