/**
 * This script is loaded when the extension is installed and 
 * runs continuously in the background while the browser is open.
 */

import { enableModernMode, disableModernMode } from '@app/prototypes/DIP/modernMode/index.js';
import { enableDipHeader, disableDipHeader } from '@app/prototypes/DIP/stickyHeader/index.js';
import { enableDipUserMenu, disableDipUserMenu } from '@app/prototypes/DIP/compactUserMenu/index.js';

import { defaultOptions } from '@app/scripts/constants.js';

function init() {    
    browser.storage.local.get( 'options' )
    .then( ( { options } ) => {
        
        let reloadBrowser = 0;
        
        reloadBrowser += ( options.dip.value ) ? enableModernMode() : disableModernMode();
        reloadBrowser += ( options.dipHeader.value ) ? enableDipHeader() : disableDipHeader();
        reloadBrowser += ( options.dipUserMenu.value ) ? enableDipUserMenu() : disableDipUserMenu();
        
        if ( reloadBrowser > 0 ) { 
            browser.tabs.reload() 
        }
    }) 
}

async function installExtension() {
    await browser.storage.local.set( { options: defaultOptions } );
    init();
}

browser.runtime.onInstalled.addListener( installExtension );
browser.storage.local.onChanged.addListener( init );