const url = new URL( window.location.href );

if ( !url.searchParams.has( 'languageinheader') ) {
    url.searchParams.append('languageinheader', '1');
    window.location.search = url.searchParams.toString();
}

document.addEventListener( 'click', ( event ) => {
    if ( event.target.href ) {
        const url = new URL( event.target.href );
        if ( !url.searchParams.has( 'languageinheader' ) ) {
            url.searchParams.set( 'languageinheader', '2' );
            event.target.href = url.toString();
        }
    }
})