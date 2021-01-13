
import { webNavigationFilters } from "@app/scripts/constants.js";

function enableDipUserMenuHandler() {
    browser.tabs.executeScript( {
        file: '/prototypes/DIP/compactUserMenu/app.js', 
        runAt: "document_end"
    } )
    browser.tabs.insertCSS( {
        file: '/prototypes/DIP/compactUserMenu/app.css', 
        runAt: "document_start"
    } )
    .catch( (err) => alert(  err.message ))
}

export function enableDipUserMenu() {
    if ( !browser.webNavigation.onCommitted.hasListener( enableDipUserMenuHandler ) ) {
        browser.webNavigation.onCommitted.addListener( 
            enableDipUserMenuHandler, 
            webNavigationFilters )
        return 1;
    }
    return 0;
}

export function disableDipUserMenu() {
    if ( browser.webNavigation.onCommitted.hasListener( enableDipUserMenuHandler ) ) {
        browser.webNavigation.onCommitted.removeListener( enableDipUserMenuHandler )
        return 1;
    }
    return 0;
}