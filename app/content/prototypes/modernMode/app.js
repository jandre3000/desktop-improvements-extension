const url = new URL( window.location.href );
const newSkinParamName = 'useskin';
const newSkinParamValue = 'vector-2022';

if ( !url.searchParams.has( newSkinParamName ) ) {
    url.searchParams.append( newSkinParamName, newSkinParamValue );
    window.location.search = url.searchParams.toString();
};

document.addEventListener( 'click', ( event ) => {
    if ( event.target.href ) {
        const url = new URL( event.target.href );
        if ( !url.searchParams.has( newSkinParamName ) ) {
            url.searchParams.set( newSkinParamName, newSkinParamValue );
            event.target.href = url.toString();
        }
    }
});
