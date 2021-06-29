/**
 * This script is loaded when the extension is installed and
 * runs continuously in the background while the browser is open.
 */

 function init() {
    browser.tabs.executeScript( {
        file: '/content/prototypes/languageInHeader/app.js',
        runAt: "document_start"
    } )
}

function enable() {
    if ( browser.webNavigation.onCommitted.hasListener(init) ) {
        return false;
    }

    browser.webNavigation.onCommitted.addListener( init )
    return true;
}

function disable() {
    if ( browser.webNavigation.onCommitted.hasListener(init) ) {
        browser.webNavigation.onCommitted.removeListener( init );
        browser.tabs.executeScript(
            {
                code: `
                    (() => {
                        let u = new URL( window.location.toString() );
                        u.searchParams.delete( 'languageinheader' );
                        window.location.replace( u.toString() );
                    })();`
            })
    }
    return false;
}


 export default { userPreferenceName: 'dipLanguageSwitcher', enable, disable };