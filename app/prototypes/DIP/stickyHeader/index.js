/**
 * This script is loaded when the extension is installed and
 * runs continuously in the background while the browser is open.
 */

import { webNavigationFilters } from "@app/scripts/constants.js";

function init() {
    browser.tabs.executeScript( {
        file: '/prototypes/DIP/stickyHeader/app.js',
        runAt: "document_end"
    } )
    browser.tabs.insertCSS( {
        file: '/prototypes/DIP/stickyHeader/app.css',
        runAt: "document_start"
    } )
}

function enable() {
    if ( browser.webNavigation.onCommitted.hasListener(init) ) {
        return false;
    }

    browser.webNavigation.onCommitted.addListener(
        init,
        webNavigationFilters
    )
    return true;
}

function disable() {
    if ( browser.webNavigation.onCommitted.hasListener(init) ) {
        browser.webNavigation.onCommitted.removeListener( init )
        return true;
    }
    return false;
}

export default { userPreferenceName: 'stickyHeader', enable, disable }