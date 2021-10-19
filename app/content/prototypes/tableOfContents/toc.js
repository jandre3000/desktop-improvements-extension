import Vue from "vue";
import TocSettings from './tocSettings.vue';
import './toc.css';

function getExistingDOMNodes() {
    return {
        tocEl: document.getElementById('toc'),
        sidebar: document.querySelector( '#mw-navigation' ),
        tocLinks: ( document.getElementById('toc') ) ? document.getElementById('toc').querySelectorAll( 'a' ) : null,
        headings: document
        .getElementById('bodyContent')
        .querySelectorAll( 'h1, h2, h3, h4, h5, h6'),
    }
}

function moveToCtoSidebar( tocEl, sidebar ) {
    sidebar.after( tocEl );
}

function editTocDOM( tocEl ) {
    // Remove default styles
    tocEl.removeAttribute( 'id' );
    tocEl.classList.add( 'toc-wrapper' );
    tocEl.classList.remove( 'toc' );

    const tocStyles = getTocStyles();

    for ( const style in tocStyles ) {
        if ( !tocStyles[ style ] ) continue;
        if ( style === 'tocDepth' ) {
            tocEl.classList.add( `${style}-${tocStyles[ style ]}` );
        } else {
            tocEl.classList.add( style );
        }
      }

    // Add collapse/expand arrows
    tocEl.querySelectorAll( 'li.toclevel-1' ).forEach( ( level1 ) => {
        const hasChildLevels = level1.querySelector( 'ul' );
        if ( hasChildLevels  ) {
            const sectionToggleEl = createTocSectionToggleIcon();
            level1.prepend( sectionToggleEl );
            level1.classList.add( 'collapsed' );
        }
    } )

    enableTocSectionToggleIcon( tocEl );
}

function addTocBodyClass() {
    document.body.classList.add( 'sidebar-toc' );
}

function createTocSectionToggleIcon() {
    const el = document.createElement( 'span' );
    el.classList.add( 'toc-toggle');
    return el;
}

function enableTocSectionToggleIcon( tocEl ) {
    tocEl.addEventListener( 'click', function( e ) {
        if ( !e.target.classList.contains( 'toc-toggle' ) ) {
            return;
        }
        e.target.parentNode.classList.toggle( 'collapsed' );
    })
}

function createTocSettings( tocEl ) {
    const settingsTargetEl = document.createElement( 'div' );
    tocEl.prepend( settingsTargetEl );
    new Vue({
        render: h => h(TocSettings)
      }).$mount( settingsTargetEl );
}

function init() {
    const {tocEl, sidebar, headings, tocLinks } = getExistingDOMNodes();

    if ( !tocEl ) return;

    const
        { nodeLinkMap, contentElements }= createSectionTocLinkMap(),
        observerCallback = createIntersectionObserverCallback( tocEl, nodeLinkMap ),
        observer = new IntersectionObserver(
        observerCallback, {
            rootMargin: '0% 0px -80% 0px',
            threshold: 0.1
    });

    addTocBodyClass( tocEl );
    editTocDOM( tocEl );
    moveToCtoSidebar( tocEl, sidebar );
    createTocSettings( tocEl );
    [...contentElements].forEach( el => observer.observe( el ) );
}

function createSectionTocLinkMap() {
    const contentElements = document
        .querySelector( '.mw-parser-output' )
        .querySelectorAll(":scope > *:not(.hatnote):not(.thumb):not(img)");
    const nodeLinkMap = new Map();
    let currentHeading = "";
    for ( const el of contentElements ) {
        if ( [ 'H1', 'H2', 'H3', 'H4', 'H5', 'H6' ].indexOf( el.nodeName ) >= 0 ) {
            currentHeading = el.querySelector( '.mw-headline' ).getAttribute('id');
        }
        nodeLinkMap.set( el, currentHeading );
    }
    return { nodeLinkMap, contentElements };
}
/**
 * NOTE: Sometimes the section ID and the href attribute are different.
 * e.g. https://en.wikipedia.org/wiki/Football_in_England?useskinversion=2#1992%E2%80%93present:_Premier_League_era
 * doesn't work because the href "#1992–present:_Premier_League_era"
 * doesn't match the ID, "1992.E2.80.93present%3A_Premier_League_era".
 * @param {*} observerEntries
 * @returns
 */
function createIntersectionObserverCallback( tocEl, nodeLinkMap ) {
    return function( entries ) {
        const entry = entries[ 0 ];

        if ( !entry.isIntersecting )  return;

        const currentTocHref = nodeLinkMap.get( entry.target );
        const currentTocLink = tocEl.querySelector( `a[href="#${CSS.escape(currentTocHref)}"]` );
        const activeTocLink = tocEl.querySelector( `a.active` );
        const activeTocListItem = tocEl.querySelectorAll( `li.expanded` );

        if ( currentTocLink === activeTocLink ) return;

        if ( activeTocLink && currentTocLink ) {
            activeTocLink.classList.remove( 'active' );
            [...activeTocListItem].forEach( li => {
                li.classList.remove( 'expanded' )
                li.classList.remove( 'active' )
            }  );
        }

        if ( currentTocLink ) {
            currentTocLink.classList.add( 'active' );
            currentTocLink.parentElement.classList.add( 'active' );

            if ( currentTocLink.closest( '.toclevel-1') ) {
                currentTocLink.closest( '.toclevel-1').classList.add( 'expanded' );
                /* currentTocLink.closest( '.toclevel-1').classList.add( 'active' ); */
            }
        }
    }
}

window.addEventListener('load', (event) => {
    init();
});


const observer = new MutationObserver( ( mutationsList, observer ) => {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if ( mutation.target.nodeType === Node.ELEMENT_NODE && mutation.target.id === 'toc' ) {
                addTocBodyClass();
                observer.disconnect();
            }
        }
    }
});

const defaultTocStyles = {
    tocExpandOnScroll: false,
    tocExpandAll: false,
    tocNumbered: false,
    tocEllipses: false,
    tocDepth: 6
};

function getTocStyles() {
    const storedStyles = window.localStorage.getItem( 'tocStyles' );
    return JSON.parse( storedStyles ) || defaultTocStyles;
};

observer.observe(document, { attributes: false, childList: true, subtree: true } );