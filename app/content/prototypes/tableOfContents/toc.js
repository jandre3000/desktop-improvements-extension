import Vue from "vue";
import TocSettings from './tocSettings.vue';
import './toc.css';

function getExistingDOMNodes() {
    return {
        tocEl: document.getElementById('toc'),
        sidebar: document.querySelector( '#mw-navigation' ),
        tocLinks: ( document.getElementById('toc') ) ? document.getElementById('toc').querySelectorAll( 'a' ) : null,
        headings: document
        .getElementById('content')
        .querySelectorAll( 'h1, h2, h3, h4, h5, h6'),
        stickyHeader: document.getElementById( 'vector-sticky-header' )
    }
}

function getTocStyles() {
    const storedStyles = window.localStorage.getItem( 'tocStyles' );
    return JSON.parse( storedStyles ) || defaultTocStyles;
};

function toggleSection( level1ListItems, activeEl ) {
    const { tocExpandAll, tocExpandOnScroll } = getTocStyles();
    [...level1ListItems].forEach( el => {
        if ( el !== activeEl ) {
            el.classList.remove( 'expanded' );
        }
    }  );
    activeEl.classList.add( 'expanded' );
}

function toggleSectionOnClick( level1ListItems, activeEl ) {
    const { tocExpandAll, tocExpandOnScroll } = getTocStyles();
    [...level1ListItems].forEach( el => {
        if ( el !== activeEl ) {
            el.classList.remove( 'expanded' );
        }
    }  );
    activeEl.classList.toggle( 'expanded' );
}


function editTocDOM( tocEl, sidebar ) {

    function createTocSectionToggleIcon() {
        const el = document.createElement( 'span' );
        el.classList.add( 'toc-toggle');
        return el;
    }

    function createIntroSection( tocEl ) {
        tocEl.lastElementChild.insertAdjacentHTML('afterbegin', `
        <li class="toclevel-1">
            <a href="#firstHeading">
                <span class="toctext">
                    Introduction
                </span>
            </a>
        </li>`);
    }

    // Edit default styles
    tocEl.removeAttribute( 'id' );
    tocEl.classList.add( 'toc-wrapper' );
    tocEl.classList.remove( 'toc' );
    createIntroSection( tocEl );
    sidebar.after( tocEl );
    const tocStyles = getTocStyles();
    const level1ListItems = tocEl.querySelectorAll( 'li.toclevel-1' );

    // option specific styling.
    for ( let style in tocStyles ) {
        if ( !tocStyles[ style ] ) continue;
        if ( style === 'tocDepth' ) {
            tocEl.classList.add( `${style}-${tocStyles[ style ]}` );
        } else if ( style === 'tocExpandAll' ) {
            tocEl.querySelectorAll( 'li' ).forEach( li => li.classList.add( 'expanded' ))
        } else {
            tocEl.classList.add( style );
        }
      }

    for ( let level1Li of level1ListItems ) {
        const hasExpandableSections = level1Li.querySelector( 'ul' );
        if (!hasExpandableSections) continue;
        const sectionToggleArrow = createTocSectionToggleIcon();

        // Get the first link.
        const level1a = level1Li.querySelector('a');
        level1a.addEventListener( 'click', toggleSectionOnClick.bind( null, level1ListItems, level1Li ) );
        sectionToggleArrow.addEventListener( 'click', function( e ) {
            level1Li.classList.toggle( 'expanded' );
            e.stopPropagation();
            e.preventDefault();
        });
        level1Li.prepend( sectionToggleArrow );
    }
}

function addTocBodyClass() {
    if ( document.body ) {
        document.body.classList.add( 'sidebar-toc' );
    }
}

function createTocSettings( tocEl ) {
    const settingsTargetEl = document.createElement( 'div' );
    tocEl.prepend( settingsTargetEl );
    new Vue({
        render: h => h(TocSettings)
      }).$mount( settingsTargetEl );
}

let initCalled = false;

function init() {

    if ( initCalled ) {
        return;
    }

    const { tocEl, sidebar, stickyHeader } = getExistingDOMNodes();

    if ( !tocEl ) return;

    if ( stickyHeader ) {
        stickyHeaderObserver.observe( stickyHeader, { attributes: true, childList: false, subtree: false }  );
    }

    addTocBodyClass( tocEl );
    editTocDOM( tocEl, sidebar);
    createTocSettings( tocEl );
    const { headings } = getExistingDOMNodes();
    initIntersectionObserver( headings, tocEl );
    initCalled = true;
}

function setActiveToCLink( sectionId, tocEl ) {
    const tocLinks = tocEl.querySelectorAll( 'li a' );
    const activeTocLink = tocEl.querySelector( `a[href="#${CSS.escape( sectionId )}"]` );
    const { tocExpandAll, tocExpandOnScroll } = getTocStyles();

    if ( !activeTocLink ) return;

    const activeTopLevelSection = activeTocLink.closest( '.toclevel-1');


    tocEl.querySelectorAll( '.toclevel-1' ).forEach( l1 => {
        l1.classList.remove('active' )
    } )

    if ( tocExpandOnScroll || tocExpandAll ) {
        toggleSection( tocEl.querySelectorAll( '.toclevel-1' ), activeTopLevelSection  )
    }
    activeTopLevelSection.classList.add( 'active' );
    tocLinks.forEach( l => l.classList.remove('active') )
    activeTocLink.classList.add( 'active')
};

function getTopMostHeading( headings ) {
    let topOfPageY = 60;
    let closestHeadingY = topOfPageY;
    let closestHeading;

    for (let currentHeading of headings ) {
        if ( closestHeadingY === topOfPageY ) {
            closestHeading = document.getElementById('firstHeading');
            closestHeadingY = document.getElementById('firstHeading').getBoundingClientRect().y;
        } else if (
            currentHeading.getBoundingClientRect().y < topOfPageY &&
            currentHeading.getBoundingClientRect().y > closestHeadingY
        ) {
            closestHeading = currentHeading;
            closestHeadingY = currentHeading.getBoundingClientRect().y;
        }
    }

    return closestHeading;
}

function initIntersectionObserver( headings, tocEl ) {
    const observer = new IntersectionObserver( () => {
        const activeHeading = getTopMostHeading( headings );
        if ( activeHeading ) {
            const activeHeadingEl = activeHeading.querySelector( '.mw-headline');
            if ( activeHeadingEl ) {
                setActiveToCLink( activeHeadingEl.id, tocEl );
            } else {
                setActiveToCLink( activeHeading.id, tocEl );
            }
        }
    },
    {
        rootMargin: '-60px 0px 0px 0px',
        threshold: 1
    } );
    [...headings].forEach( h => observer.observe( h ) );
}

const stickyHeaderObserver = new MutationObserver( ( mutationsList  ) => {
    for (const mutation of mutationsList) {
        if (
            mutation.target.classList.contains('vector-sticky-header-visible')
        ) {
            document.documentElement.style.setProperty('--sidebar-toc-top', "72px");
        } else if (
            !mutation.target.classList.contains('vector-sticky-header-visible')
        ) {
            document.documentElement.style.setProperty('--sidebar-toc-top', "20px");
        }
    }
} );

const domReadyObserver = new MutationObserver( ( mutationsList, observer ) => {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if ( mutation.target.nodeType === Node.ELEMENT_NODE && mutation.target.id === 'toc' ) {
                addTocBodyClass();
                observer.disconnect();
            }
        }
    }
});

window.addEventListener('load', () => {
    init();
});



const defaultTocStyles = {
    tocExpandOnScroll: true,
    tocExpandAll: false,
    tocNumbered: false,
    tocEllipses: false,
    tocDepth: 6
};

domReadyObserver.observe(document, { attributes: false, childList: true, subtree: true } );

// If calling from resourceLoader, after document.ready.
if (typeof mw !== 'undefined' ) {
    init();
    // For patch demo, intercept all clicks and ensure they are redirected to production content pages
    var content = document.querySelector('.mw-parser-output');

    content.addEventListener( 'click', e => {
    if (
        e.target.nodeType === 1 &&
        e.target.tagName === 'A' &&
        /^\/wiki/.test( e.target.getAttribute( 'href' ) )
    ) {
        var hrefParts = e.target.href.split('/');
        var title = hrefParts[ hrefParts.length-1 ];
        e.target.setAttribute( 'href', `${mw.config.get('wgScript')}?title=${title}` );
    }
    })
}
