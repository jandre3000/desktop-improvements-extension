const url = new URL( window.location.href );

if ( !url.searchParams.has( 'useskinversion') ) {
    url.searchParams.append('useskinversion', '2');
    window.location.search = url.searchParams.toString();
};

document.addEventListener( 'click', ( event ) => {
    if ( event.target.href ) {
        const url = new URL( event.target.href );
        if ( !url.searchParams.has( 'useskinversion' ) ) {
            url.searchParams.set( 'useskinversion', '2' );
            event.target.href = url.toString();
        }
    }
});
