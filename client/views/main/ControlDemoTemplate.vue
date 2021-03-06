<template>
	<div>
		<div class="Section" v-if="!!this.$slots['overview']">
			<div class="SectionLabel">
				<a name="overview">Overview</a>
			</div>
			<slot name="overview"></slot>
		</div>

		<div
			class="Section"
			v-if="!!this.$slots['widgit'] && !!this.$slots['control']"
		>
			<div class="SectionLabel">
				<a name="demo">Live demo</a>
			</div>
			<WidgitDemo>
				<slot name="widgit" slot="widgit"></slot>
				<slot name="control" slot="control"></slot>
			</WidgitDemo>
		</div>

		<div class="Section" v-if="!!this.$slots['code']">
			<div class="SectionLabel">
				<a name="code">Code</a>
			</div>
			<slot class="Code" name="code"></slot>
		</div>

		<div class="Section" v-if="!!codeStructure">
			<div class="SectionLabel">
				<a name="structure">DOM structure (Live)</a>
			</div>
			<l-html-text-loader
				slot="structure"
				:wrapOffset="wrapOffset"
				:value="codeStructure"
			/>
		</div>

		<div class="Section" v-if="!!this.$slots['other']">
			<div class="SectionLabel">
				<a name="properties">{{
					this.$slots["other"][0].data.attrs.title || "Properties"
				}}</a>
			</div>
			<slot name="other"></slot>
		</div>

		<div class="Section" v-if="props_tbl_data.length > 0">
			<div class="SectionLabel">
				<a name="properties">Settings</a>
			</div>
			<l-table
				:colSettings="PROPS_TBL_SETTINGS"
				:tableData="props_tbl_data"
			></l-table>
		</div>

		<div class="Section" v-if="slots_tbl_data.length > 0">
			<div class="SectionLabel">
				<a name="properties">Slots</a>
			</div>
			<l-table
				:colSettings="SLOTS_TBL_SETTINGS"
				:tableData="slots_tbl_data"
			></l-table>
		</div>

		<div class="Section" v-if="methods_tbl_data.length > 0">
			<div class="SectionLabel">
				<a name="properties">Methods</a>
			</div>
			<l-table
				:colSettings="METHODS_TBL_SETTINGS"
				:tableData="methods_tbl_data"
			></l-table>
		</div>

		<div class="Section" v-if="events_tbl_data.length > 0">
			<div class="SectionLabel">
				<a name="events">Events</a>
			</div>
			<l-table
				:colSettings="ENENTS_TBL_SETTINGS"
				:tableData="events_tbl_data"
			></l-table>
		</div>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";

export default {
	name: "ControlDemoTemplate",
	components: {
		WidgitDemo,
	},
	data: function () {
		return {
			wrapOffset: NaN,

			codeStructure: "",

			props_tbl_data: [],
			PROPS_TBL_SETTINGS: [
				{
					name: "prop",
					displayName: "Prop",
					width: "180px",
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
					name: "options",
					displayName: "Options",
					width: "200px",
				},
				{
					name: "description",
					displayName: "Description",
					width: "250px",
				},
			],

			methods_tbl_data: [],
			METHODS_TBL_SETTINGS: [
				{
					name: "method",
					displayName: "Method",
					width: "180px",
				},
				{
					name: "description",
					displayName: "Description",
					width: "250px",
				},
			],

			events_tbl_data: [],
			ENENTS_TBL_SETTINGS: [
				{
					name: "event",
					displayName: "Event",
					width: "180px",
				},
				{
					name: "description",
					displayName: "Description",
					width: "250px",
				},
			],

			slots_tbl_data: [],
			SLOTS_TBL_SETTINGS: [
				{
					name: "slot",
					displayName: "Slot",
					width: "180px",
				},
				{
					name: "description",
					displayName: "Description",
					width: "250px",
				},
			],
		};
	},
	props: {
		control: {
			type: Object,
			default: null,
		},
	},
	methods: {
		updateControl: function (control, wrapOffset) {
			this.setControlTables(control);
			this.setControlDOMStructure(control, wrapOffset);
		},

		setControlDOMStructure: function (control, wrapOffset) {
			this.codeStructure = `${control.$el.outerHTML}`;
			this.wrapOffset = wrapOffset;
		},

		setControlDOMStructureManual: function (control, wrapOffset) {
			this.codeStructure = `${control.outerHTML}`;
			this.wrapOffset = wrapOffset;
		},

		setControlTables: function (control) {
			const { props, expose_methods, expose_events, expose_slots } =
				control.$options || {};

			this.updatePropsTable(props);
			this.updateMethodsTable(expose_methods);
			this.updateEventsTable(expose_events);
			this.updateSlotsTable(expose_slots);
		},

		updatePropsTable: function (props) {
			this.props_tbl_data = Object.keys(props || {}).map((field) => {
				const settings = props[field];
				return {
					prop: `${!!settings.required ? "*" : ""}${field}`,
					type: settings.type.name,
					default:
						["Array", "Object"].indexOf(settings.type.name) >= 0
							? settings.default()
							: `${settings.default}`,
					options: (settings.options || []).join(", "),
					description: settings.description || "",
				};
			});
		},

		updateMethodsTable: function (methods) {
			this.methods_tbl_data = Object.keys(methods || {}).map((field) => {
				const settings = methods[field];
				return {
					method: field,
					description: settings.description || "",
				};
			});
		},

		updateEventsTable: function (events) {
			this.events_tbl_data = Object.keys(events || {}).map((field) => {
				const settings = events[field];
				return {
					event: field,
					description: settings.description || "",
				};
			});
		},

		updateSlotsTable: function (slots) {
			this.slots_tbl_data = Object.keys(slots || {}).map((field) => {
				const settings = slots[field];
				return {
					slot: field,
					description: settings.description || "",
				};
			});
		},
	},
};
</script>