/**
 * This script is loaded when the extension is installed and 
 * runs continuously in the background while the browser is open.
 */

import { webNavigationFilters } from "@app/scripts/constants.js";

function enableDipHeaderHandler() {
    browser.tabs.executeScript( {
        file: '/prototypes/DIP/stickyHeader/app.js', 
        runAt: "document_end"
    } )
    browser.tabs.insertCSS( {
        file: '/prototypes/DIP/stickyHeader/app.css', 
        runAt: "document_start"
    } )
}

export function enableDipHeader() {
    if ( !browser.webNavigation.onCommitted.hasListener(enableDipHeaderHandler) ) {
        browser.webNavigation.onCommitted.addListener( 
            enableDipHeaderHandler, 
            webNavigationFilters
        )
        return 1;
    }
    return 0;
}

export function disableDipHeader() {
    if ( browser.webNavigation.onCommitted.hasListener(enableDipHeaderHandler) ) {
        browser.webNavigation.onCommitted.removeListener( enableDipHeaderHandler )
        return 1;
    }
    return 0;
}