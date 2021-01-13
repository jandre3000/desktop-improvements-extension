<template>
	<form>
		<h1>Wikipedia Prototypes</h1>
		<div class="row"
			@mouseover="setActiveOption('dip')"
			@mouseleave="setActiveOption">
			<label class="label--large" for="modern-look">Modern look </label>
			<InputSwitch id="modern-look" v-model="options.dip.value" />
		</div>

		<div class="row-indented"
			@mouseover="setActiveOption('dipHeader')"
			@mouseleave="setActiveOption">
			<label class="label">Scrolling header</label>
			<Checkbox v-model="options.dipHeader.value" :binary="true" />
		</div>

		<div class="row-indented"
			@mouseover="setActiveOption('dipToc')"
			@mouseleave="setActiveOption">
			<label class="label">Compact user menu</label>
			<Checkbox v-model="options.dipUserMenu.value" :binary="true" />
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
			<Checkbox v-model="options.dipToc.value" :binary="true" />
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
			<InputSwitch />
		</div>

		<div class="row-indented"
			@mouseover="setActiveOption('darkModeSystem')"
			@mouseleave="setActiveOption">
			<label class="label">Respect system settings</label>
			<Checkbox />
		</div>

		<Card v-if="activeOption" style="font-size: 0.8rem;">
			<template #title>
				{{ activeOption }}
			</template>
			<template #content>
				<pre>
{{ JSON.stringify( options, null, '\t' ) }}
			</pre>
				{{ optionsDescriptions[activeOption] }}
			</template>
		</Card>
	</form>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import InputSwitch from 'primevue/inputswitch';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Slider from 'primevue/slider';
import { defaultOptions } from '@app/scripts/constants.js';

export default {
	components: {
		InputSwitch,
		Checkbox,
		Card,
		Slider
	},
	setup() {

		const options = reactive( defaultOptions );

		const optionsDescriptions = {
			dip: 'Enable the modern version of the Vector skin, as defined by the <a href="#">Desktop Improvements Project</a>.',
			dipToc: 'Table of contents',
			dipLanguageSwitcher: 'A language switcher placed near the page header instead of the inside the sidebar.',
			dipHeader: 'Extra sticky',
			dipLineLength: 'Adjust the width of the content in modern mode.',
			darkMode: 'Enable dark mode.',
			darkModeSystem: 'Enable dark mode based on system preferences. Works on Mac or Windows or something.'
		};

		const activeOption = ref( '' );

		function saveOptionsOnChange() {
			watch( options, function ( val ) {
				browser.storage.local.set( { options: val } );
			} );
		}

		function setActiveOption( option ) {
			activeOption.value = optionsDescriptions[ option ] ? option : '';
		}

		browser.storage.local.get( 'options' )
			.then( ( storedOptions ) => {
				Object.assign( options, storedOptions.options );
			} )
			.then( saveOptionsOnChange );

		return { options, optionsDescriptions, activeOption, setActiveOption };
	}
};
</script>

<style scoped>

h1 {
	font-family: serif;
	font-weight: normal;
	font-size: 1.4rem;
	margin-bottom: 1.2rem;
	margin-top: 1.4rem;
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
