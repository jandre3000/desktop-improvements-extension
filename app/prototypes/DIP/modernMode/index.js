/**
 * This script is loaded when the extension is installed and
 * runs continuously in the background while the browser is open.
 */

import { webRequestFilters } from "@app/scripts/constants.js";

function init( requestDetails ) {
    const requestUrl = new URL(requestDetails.url);

    if ( !requestUrl.searchParams.has('useskinversion') ) {
        requestUrl.searchParams.append('useskinversion', 2);
    }
    return {
        redirectUrl: requestUrl.toString()
    }
}

export function enable() {

    if ( browser.webRequest.onBeforeRequest.hasListener(init) ) {
        return false;
    }

    browser.webRequest.onBeforeRequest.addListener(
        init,
        webRequestFilters,
        ["blocking"]
    );

    return true;
}

export function disable() {
    if ( browser.webRequest.onBeforeRequest.hasListener( init ) ) {
        browser.webRequest.onBeforeRequest.removeListener( init )
        browser.tabs.executeScript(
            {
                code: `
                (function () {
                    let u = new URL( window.location.toString() );
                    u.searchParams.delete( 'useskinversion' );
                    window.location.replace( u.toString() );
                })();`
            })
    }
    return false;
}

export default { userPreferenceName: 'modernMode', enable, disable };