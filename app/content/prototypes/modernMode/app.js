const url = new URL( window.location.href );

if (
    !url.searchParams.has( 'useskinversion') ||
    !url.searchParams.has( 'vectorstickyheader')
) {
    url.searchParams.append('useskinversion', '2');
    url.searchParams.append('vectorstickyheader', '1');

    window.location.search = url.searchParams.toString();
}

document.addEventListener( 'click', ( event ) => {
    if ( event.target.href ) {
        const url = new URL( event.target.href );
        if (
            !url.searchParams.has( 'useskinversion' ) ||
            !url.searchParams.has( 'vectorstickyheader')
            ) {
            url.searchParams.set( 'useskinversion', '2' );
            url.searchParams.set('vectorstickyheader', '1');
            event.target.href = url.toString();
        }
    }
});
