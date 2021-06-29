import CompactUserLinks from './CompactUserLinks.vue';
import {createApp} from 'vue';

const mountEl = document.querySelector( '#p-personal' );
mountEl.classList.remove( 'vector-user-menu-legacy' );
const defaultUserLinksList = document.querySelector( '#p-personal .vector-menu-content-list' );

// Creating a copy of the user links DOM so that we'll still
// have access to it after it's destroyed.
const defaultUserLinksDOM = new DocumentFragment();
defaultUserLinksDOM.append( defaultUserLinksList );

// Mount the new user links menu, passing in a copy of the old one and replacing it.
createApp( CompactUserLinks, { oldDom:  defaultUserLinksDOM } ).mount( mountEl );