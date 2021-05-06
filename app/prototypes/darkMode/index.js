
import { webNavigationFilters } from "@app/scripts/constants.js";

function init() {
    browser.tabs.insertCSS( {
        file: '/prototypes/darkMode/darkMode.css',
        runAt: "document_start"
    } )
    .catch( (err) => alert(  err.message ) )
}

function enable() {
    if ( browser.webNavigation.onCommitted.hasListener( init ) ) {
        return false;
    }
    browser.webNavigation.onCommitted.addListener(
        init,
        webNavigationFilters )
    return true;
}

function disable() {
    if ( browser.webNavigation.onCommitted.hasListener( init ) ) {
        browser.webNavigation.onCommitted.removeListener( init )
        return true;
    }
    return false;
}

export default { userPreferenceName: 'darkMode', enable, disable }