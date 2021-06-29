
function init() {
    browser.tabs.insertCSS( {
        file: '/content/prototypes/darkMode/darkMode.css',
        runAt: "document_start"
    } )
}

function enable() {

    if ( browser.webNavigation.onCommitted.hasListener( init ) ) {
        return false;
    }
    browser.webNavigation.onCommitted.addListener( init )
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