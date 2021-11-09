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

function getTocStyles() {
    const storedStyles = window.localStorage.getItem( 'tocStyles' );
    return JSON.parse( storedStyles ) || defaultTocStyles;
};

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
    function toggleSection( activeEl ) {
        level1ListItems.forEach( el => {
            if ( el !== activeEl ) {
                el.classList.remove( 'expanded' );
            }
        }  );
        activeEl.classList.toggle( 'expanded' );
    }

    const tocStyles = getTocStyles();
    const level1ListItems = tocEl.querySelectorAll( 'li.toclevel-1' );

    // Edit default styles
    tocEl.removeAttribute( 'id' );
    tocEl.classList.add( 'toc-wrapper' );
    tocEl.classList.remove( 'toc' );

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
        sectionToggleArrow.addEventListener( 'click', toggleSection.bind( null, level1Li ) )
        level1Li.prepend( sectionToggleArrow );
    }

    sidebar.after( tocEl );
    createIntroSection( tocEl );
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

    const { tocEl, sidebar } = getExistingDOMNodes();

    if ( !tocEl ) return;

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
        if ( !tocExpandAll ) l1.classList.remove('expanded' );
    } )

    if ( tocExpandOnScroll || tocExpandAll ) {
        activeTopLevelSection.classList.add( 'expanded' );
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
    addTocBodyClass();
    init();
}
