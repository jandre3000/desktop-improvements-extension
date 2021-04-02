/**
 * This script is loaded when the extension is installed and
 * runs continuously in the background while the browser is open.
 */

import modernMode from '@app/prototypes/DIP/modernMode';
import stickyHeader from '@app/prototypes/DIP/stickyHeader';
import compactUserMenu from '@app/prototypes/DIP/compactUserMenu';
import { defaultUserPreferences } from '@app/scripts/constants.js';

const prototypes = [ modernMode, stickyHeader, compactUserMenu]

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
    init();
}

browser.runtime.onInstalled.addListener( installExtension );
browser.storage.local.onChanged.addListener( init );