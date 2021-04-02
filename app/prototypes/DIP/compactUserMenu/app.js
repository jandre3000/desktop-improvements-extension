import CompactUserMenu from './CompactUserMenu.vue';

import {createApp} from "vue";

const personalMenuContent = document.querySelector( '#p-personal ul.vector-menu-content-list' );
const domData = personalMenuContent.cloneNode( true );
const app = createApp( CompactUserMenu, { oldDom:  domData } );

app.mount( '#p-personal .vector-menu-content' );
