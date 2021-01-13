/**
 * This script is loaded when the extension is installed and 
 * runs continuously in the background while the browser is open.
 */

import { webRequestFilters } from "@app/scripts/constants.js";

function modernModeChangeHandler( requestDetails ) {
    const requestUrl = new URL(requestDetails.url);

    if ( !requestUrl.searchParams.has('useskinversion') ) {
        requestUrl.searchParams.append('useskinversion', 2);
    }
    return {
        redirectUrl: requestUrl.toString()
    }
}

export function enableModernMode() {
    
    if ( !browser.webRequest.onBeforeRequest.hasListener(modernModeChangeHandler) ) {
        
        browser.webRequest.onBeforeRequest.addListener(
            modernModeChangeHandler,
            webRequestFilters,
            ["blocking"]
        ); 

    }

    return 1;
}

export function disableModernMode() {
    if ( browser.webRequest.onBeforeRequest.hasListener( modernModeChangeHandler ) ) {
        browser.webRequest.onBeforeRequest.removeListener( modernModeChangeHandler )
        browser.tabs.executeScript( 
            {
                code: `
                (function () {
                    let u = new URL( window.location.toString() );
                    u.searchParams.delete( 'useskinversion' );
                    window.location.replace( u.toString() );
                })();
                `
            })
    }

    return 0;
    
}