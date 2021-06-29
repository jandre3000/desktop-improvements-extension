function init() {
    browser.tabs.executeScript( {
        file: '/content/prototypes/tableOfContents/app.js',
        runAt: "document_end"
    } )
    browser.tabs.insertCSS( {
        file: '/content/prototypes/tableOfContents/app.css',
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
        browser.webNavigation.onCommitted.removeListener( init )
        return true;
    }
    return false;
}

export default { userPreferenceName: 'stickyHeader', enable, disable }