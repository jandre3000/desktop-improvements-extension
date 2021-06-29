import TableOfContents from './TableOfContents.vue';
import {createApp} from "vue";

const app = createApp(TableOfContents);
const contentContainer = document.querySelector( '.mw-workspace-container' );
const tocContainer = document.createElement( 'div' );
contentContainer.appendChild( tocContainer );

app.mount( tocContainer );
