import StickyHeader from './StickyHeader.vue';

import {createApp} from "vue";

const app = createApp(StickyHeader);
const container = document.querySelector( '.mw-page-container-inner' );
const standardHeader = document.querySelector( '.mw-header');
const stickyHeader = document.createElement( 'div' );

container.insertBefore(stickyHeader, standardHeader)
app.mount( stickyHeader );
