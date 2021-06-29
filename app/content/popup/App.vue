<template>
	<div ref="container" class="prototype-options-container">
		<button class="prototype-toggle-button"
			:class="(uiOptions.visible.value ? 'open' : 'closed')"
			@click="toggleUIVisibility" />

		<form class="prototype-options-form" :class="(uiOptions.visible.value ? 'open' : 'closed')">
			<h1>Wikimedia Prototypes</h1>

			<div class="row">
				<label class="label--large" for="modern-look">Modern look </label>
				<InputSwitch id="modern-look" v-model="userPreferences.modernMode.value" />
			</div>

			<div class="row-indented">
				<label class="label">Language switcher</label>
				<Checkbox v-model="userPreferences.dipLanguageSwitcher.value" :binary="true" />
			</div>

			<div class="row-indented">
				<label class="label">Compact user menu</label>
				<Checkbox v-model="userPreferences.compactUserMenu.value" :binary="true" />
			</div>

			<div class="row-indented">
				<label class="label">Scrolling header</label>
				<Checkbox v-model="userPreferences.stickyHeader.value" :binary="true" />
			</div>

			<!--
			<div class="row-indented">
				<label class="label">Table of Contents</label>
				<Checkbox v-model="userPreferences.dipToc.value" :binary="true" />
			</div>

			<div class="row-indented">
				<label class="label">Line length</label>
				<Slider
					:step="20"
					:min="50"
					:max="200" />
			</div>
			-->
			<div class="row">
				<label class="label--large">Dark Mode</label>
				<InputSwitch v-model="userPreferences.darkMode.value" :binary="true" />
			</div>

		</form>
	</div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import InputSwitch from 'primevue/inputswitch';
import Checkbox from 'primevue/checkbox';
import Slider from 'primevue/slider';
import { defaultUserPreferences, defaultUIOptions } from '../../background/constants.js';

export default {
	components: {
		InputSwitch,
		Checkbox,
		Slider
	},
	setup() {

		const userPreferences = reactive( defaultUserPreferences ),
			activeOption = ref( '' ),
			uiOptions = reactive( defaultUIOptions );

		function savePreferencesOnChange() {
			watch( userPreferences, function ( val ) {
				browser.storage.local.set( { userPreferences: val } );
			} );
		}

		function toggleUIVisibility() {
			uiOptions.visible.value = !uiOptions.visible.value;
		}

		browser.storage.local.get( 'userPreferences' )
			.then( ( storage ) => {
				Object.assign( userPreferences, storage.userPreferences );
			} )
			.then( savePreferencesOnChange );


		browser.storage.local.get( 'uiOptions' )
			.then( ( storage ) => {
				Object.assign( uiOptions, storage.uiOptions );
			} )
			.then( () => {
				watch( uiOptions, function ( val ) {
					browser.storage.local.set( { uiOptions: val } );
				} );
			} );

		document.addEventListener( 'click', ( event ) => {
			// debugger;
			// if ( this.$refs.container.closest( event.target ) ) {

			// }
		} )


		return {
			uiOptions,
			userPreferences,
			toggleUIVisibility,
			activeOption
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

html[dir="rtl"] .prototype-options-container {
	right: auto;
	left: 3em;
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
	background-image: url("../../images/icons/icon-38-white.png");
}

.prototype-toggle-button.open {
	width: 30px;
	height: 30px;
	top: -0.5rem;
	left: -0.5rem;
	background-size: 50%;
	background-repeat: no-repeat;
	background-position: center center;
	background-image: url("../../images/close.svg");
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
