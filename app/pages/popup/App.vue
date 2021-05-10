<template>
	<div class="prototype-options-container">
		<button class="prototype-toggle-button"
			:class="(uiOptions.visible.value ? 'open' : 'closed')"
			@click="toggleUIVisibility" />

		<form class="prototype-options-form" :class="(uiOptions.visible.value ? 'open' : 'closed')">
			<h1>Wikipedia Prototypes</h1>
			<div class="row"
				@mouseover="setActiveOption('modernMode')"
				@mouseleave="setActiveOption">
				<label class="label--large" for="modern-look">Modern look </label>
				<InputSwitch id="modern-look" v-model="userPreferences.modernMode.value" />
			</div>

			<div class="row-indented"
				@mouseover="setActiveOption('stickyHeader')"
				@mouseleave="setActiveOption">
				<label class="label">Scrolling header</label>
				<Checkbox v-model="userPreferences.stickyHeader.value" :binary="true" />
			</div>

			<div class="row-indented"
				@mouseover="setActiveOption('dipToc')"
				@mouseleave="setActiveOption">
				<label class="label">Compact user menu</label>
				<Checkbox v-model="userPreferences.compactUserMenu.value" :binary="true" />
			</div>

			<div class="
					row-indented"
				@mouseover="setActiveOption('dipLanguageSwitcher')"
				@mouseleave="setActiveOption">
				<label class="label">Language switcher</label>
				<Checkbox />
			</div>

			<div class="row-indented"
				@mouseover="setActiveOption('dipToc')"
				@mouseleave="setActiveOption">
				<label class="label">Table of Contents</label>
				<Checkbox v-model="userPreferences.dipToc.value" :binary="true" />
			</div>

			<div class="row-indented"
				@mouseover="setActiveOption('dipLineLength')"
				@mouseleave="setActiveOption">
				<label class="label">Line length</label>
				<Slider
					:step="20"
					:min="50"
					:max="200" />
			</div>

			<div class="row"
				@mouseover="setActiveOption('darkMode')"
				@mouseleave="setActiveOption">
				<label class="label--large">Dark Mode</label>
				<InputSwitch v-model="userPreferences.darkMode.value" :binary="true" />
			</div>

			<div class="row-indented"
				@mouseover="setActiveOption('darkModeSystem')"
				@mouseleave="setActiveOption">
				<label class="label">Respect system settings</label>
				<Checkbox />
			</div>

		<!--
		<Card v-if="activeOption">
			<template #title>
				{{ activeOption }}
			</template>
			<template #content>
				<pre>
{{ JSON.stringify( userPreferences, null, '\t' ) }}
			</pre>
				{{ preferencesDescriptions[activeOption] }}
			</template>
		</Card>
		-->
		</form>
	</div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import InputSwitch from 'primevue/inputswitch';
import Checkbox from 'primevue/checkbox';
// import Card from 'primevue/card';
import Slider from 'primevue/slider';
import { defaultUserPreferences, defaultUIOptions } from '@app/scripts/constants.js';

export default {
	components: {
		InputSwitch,
		Checkbox,
		// Card,
		Slider
	},
	setup() {

		const userPreferences = reactive( defaultUserPreferences );

		const preferencesDescriptions = {
			modernMode: 'Enable the modern version of the Vector skin, as defined by the <a href="#">Desktop Improvements Project</a>.',
			dipToc: 'Table of contents',
			dipLanguageSwitcher: 'A language switcher placed near the page header instead of the inside the sidebar.',
			stickyHeader: 'Extra sticky',
			dipLineLength: 'Adjust the width of the content in modern mode.',
			darkMode: 'Enable dark mode.',
			darkModeSystem: 'Enable dark mode based on system preferences. Works on Mac or Windows or something.'
		};

		const activeOption = ref( '' );

		function savePreferencesOnChange() {
			watch( userPreferences, function ( val ) {
				browser.storage.local.set( { userPreferences: val } );
			} );
		}

		function setActiveOption( pref ) {
			activeOption.value = preferencesDescriptions[ pref ] ? pref : '';
		}

		browser.storage.local.get( 'userPreferences' )
			.then( ( storage ) => {
				Object.assign( userPreferences, storage.userPreferences );
			} )
			.then( savePreferencesOnChange );

		const uiOptions = reactive( defaultUIOptions );

		function toggleUIVisibility() {
			uiOptions.visible.value = !uiOptions.visible.value;
		}

		browser.storage.local.get( 'uiOptions' )
			.then( ( storage ) => {
				console.log( storage.uiOptions );
				Object.assign( uiOptions, storage.uiOptions );
			} )
			.then( () => {
				watch( uiOptions, function ( val ) {
					browser.storage.local.set( { uiOptions: val } );
				} );
			} );

		return {
			uiOptions,
			userPreferences,
			preferencesDescriptions,
			toggleUIVisibility,
			activeOption,
			setActiveOption
		};
	}
};
</script>

<style scoped>
.prototype-options-container {
	position: fixed;
	bottom: 3em;
    right: 3em;
}

.prototype-options-form {
	overflow: hidden;
	padding: 2em;
    background-color: white;
    box-shadow: 1px 1px 9px rgb(0 0 0 / 10%);
	border-radius: 2px;
}

h1 {
	font-family: serif;
	font-weight: normal;
	font-size: 1.4rem;
	margin-bottom: 1.2rem;
	margin-top: 0;
	padding-top: 0;
}
.label--large {
	font-size: 1rem;
	font-weight: bold;
	letter-spacing: -0.1px;
	border-bottom: 2px solid  #d9d9d9;
    line-height: 2em;
}

.row, .row-indented {
	display: flex;
	align-items: center;
	padding-bottom: 0.2rem;
	padding-top: 0.2rem;
}

.row:hover, .row-indented:hover {
	background-color: rgb(242, 246, 248);
}

.row label, .row-indented label {
	flex-grow: 1;
    min-height: 2rem;
    align-items: center;
	display: inline-flex;
}

label {
	font-size: 0.8rem;
	cursor:pointer;
}

.row-indented {
	padding-left: 1rem;
}

.prototype-options-form.open {
	display: block;
}

.prototype-options-form.closed {
	display: none;
}

.prototype-toggle-button {
	display: block;
	position: absolute;
	top: -1rem;
	left: -1rem;
	border: none;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	background-color: #333;
	outline: none;
}
.prototype-toggle-button.closed {
	background-size: 70%;
	background-repeat: no-repeat;
	background-position: center center;
	background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0'%3F%3E%3Csvg viewBox='-16 -16 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3CclipPath id='m'%3E%3Cpath d='m1-2v12h-2v-12l-15-15v33h32v-33z'/%3E%3C/clipPath%3E%3Cg clip-path='url(%23m)'%3E%3Ccircle fill='%23fff' r='9'/%3E%3Ccircle fill='none' r='13' stroke='%23fff' stroke-width='4'/%3E%3C/g%3E%3Ccircle fill='%23fff' cy='-10' r='5'/%3E%3C/svg%3E%0A");
}
.prototype-toggle-button.open {
	width: 30px;
	height: 30px;
	top: -0.5rem;
	left: -0.5rem;
}

</style>

<style scoped>
.p-card-title {
	font-size: 1rem;
}
.p-inputswitch, .p-checkbox {
	flex-basis: 40px;
	justify-content: center;
}

.p-slider {
	min-width: 150px;
}
</style>
