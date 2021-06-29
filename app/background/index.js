/**
 * This script is loaded when the extension is installed and
 * runs continuously in the background while the browser is open.
 */

import { defaultUserPreferences, defaultUIOptions } from './constants.js';
import modernMode from './prototypeControllers/modernModeController.js';
import stickyHeader from './prototypeControllers/stickyHeaderController.js';
import compactUserMenu from  './prototypeControllers/compactUserMenuController.js';
import darkMode from './prototypeControllers/darkModeController.js';
import languageInHeader from './prototypeControllers/languageInHeaderController';

const prototypes = [ languageInHeader, modernMode, stickyHeader, compactUserMenu, darkMode ];

function init() {
    browser.storage.local.get( 'userPreferences' )
    .then( ( { userPreferences } ) => {

        const reloadBrowser = prototypes.reduce( ( r, prototype ) => {
            const name = prototype.userPreferenceName;
            return r += userPreferences[ name ].value
                ? Number( prototype.enable() )
                : Number( prototype.disable() )
        }, 0 )

        if ( reloadBrowser > 0 ) {
            browser.tabs.reload()
        }
    })
}

async function installExtension() {
    await browser.storage.local.set( { userPreferences: defaultUserPreferences } );
    await browser.storage.local.set( { uiOptions: defaultUIOptions } );
    init();
}

browser.runtime.onInstalled.addListener( installExtension );
browser.storage.local.onChanged.addListener( init );