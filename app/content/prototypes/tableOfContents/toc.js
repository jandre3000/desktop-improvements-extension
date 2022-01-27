import Vue from "vue";
import i18n from "vue-banana-i18n";
import TocSettings from './tocSettings.vue';
import './toc.css';

const messages = {
    en: {
    'settings': 'We are testing a new position for the table of contents. Below is a list of different configurations we encourage you to try out.',
    'expandOnScroll': 'Expand section when I scroll to it',
    'expandbyDefault': 'Expand all sections by default',
    'numberSections': 'Number sections',
    'useEllipses': "Don't wrap section titles (use ellipses instead)"
    },
    id: {
        'settings': 'Kami sedang menguji posisi baru daftar isi. Berikut ini adalah daftar berbagai pengaturan yang kami ingin Anda untuk mencobanya.',
        'expandOnScroll': 'Kembangkan bagian ketika saya menggulirkan padanya',
        'expandbyDefault': 'Kembangkan seluruh bagian secara baku',
        'numberSections': 'Menomori bagian',
        'useEllipses': 'Jangan lilitkan judul bagian (gunakan elips saja)'
    },
    vi: {
        'settings': 'Chúng tôi đang thử nghiệm một vị trí mới cho mục lục. Bên dưới là danh sách các cấu hình khác nhau chúng tôi khuyến khích bạn nên thử.',
        'expandOnScroll': 'Mở rộng đề mục khi tôi cuộn tới nó',
        'expandbyDefault': 'Mở rộng đề mục theo mặc định',
        'numberSections': 'Đánh số các đề mục',
        'useEllipses': 'Không bọc tiêu đề đề mục (thay vào đó sử dụng hình e-lip)'
    },
    tr: {
        'settings': 'İçindekiler tablosu için yeni bir konum test ediyoruz. Aşağıda denemenizi tavsiye ettiğimiz farklı konfigürasyonların bir listesi bulunmaktadır.',
        'expandOnScroll': 'Üstüne kaydırdığımda bölümü genişlet',
        'expandbyDefault': 'Tüm bölümleri varsayılan olarak genişlet',
        'numberSections': 'Bölümleri numaralandır',
        'useEllipses': 'Bölüm başlıklarını kapatma (yerine üç nokta kullan)'
    },
    fr: {
        'settings': 'Nous testons un nouvel emplacement pour le sommaire. Vous trouverez ci-dessous une lsite des différentes configurations que nous vous encourageons à essayer.',
        'expandOnScroll': 'Étendre la section quand je navigue vers elle',
        'expandbyDefault': 'Étendre toutes les sections par défaut',
        'numberSections': 'Numéroter les sections',
        'useEllipses': 'Ne pas enrouler les titres de section (utiliser des ellipses — et points de suspension — à la place)'
    },
    it: {
    'settings': "Stiamo testando una nuova posizione per l'indice. Qui sotto troverai una lista di diverse configurazioni che ti invitiamo a provare.",
    'expandOnScroll': 'Espandi la sezione quando ci scorro sopra',
    'expandbyDefault': 'Espandi tutte le sezioni di default',
    'numberSections': 'Enumerare le sezioni',
    'useEllipses': 'Non comprimere i titoli delle sezioni (utilizza invece i punti di sospensione)'
    },
    pl: {
    'settings': 'Testujemy nowe położenie spisu treści. Poniżej znajduje się lista konfiguracji, które chcielibyśmy, żebyś wypróbował(a).',
    'expandOnScroll': 'Rozwiń sekcje, kiedy do nich przewijam',
    'expandbyDefault': 'Domyślnie rozwiń wszystkie sekcje',
    'numberSections': 'Numeruj sekcje',
    'useEllipses': 'Nie przenoś tytułów sekcji do następnych linii (użyj wielokropków)'
    },
    fi: {
    'settings': 'Testaamme uutta sijaintia sisällysluettelolle. Alla on lista erilaisista säädöistä, joita kehotamme sinua kokeilemaan.',
    'expandOnScroll': 'Laajenna osio vierittäessäni siihen',
    'expandbyDefault': 'Laajenna oletuksena kaikki osiot',
    'numberSections': 'Numeroi osiot',
    'useEllipses': 'Älä rivitä osioiden otsikoita (käytä sen sijaan ellipsiä)'
    },
    sv: {
    'settings': 'Vi testar en ny position för innehållsförteckningen. Nedan följer en lista över olika konfigurationer vi uppmuntrar dig att testa.',
    'expandOnScroll': 'Utvidga avsnittet när jag skrollar till den',
    'expandbyDefault': 'Utvidga alla avsnitt som standard',
    'numberSections': 'Numrerade avsnitt',
    'useEllipses': 'Bryt inte upp avsnittstitlar (använd ellipser istället)'
    },
    uk: {
    'settings': 'Ми тестуємо нову позицію для змісту. Нижче наведено список різних конфігурацій, які ми рекомендуємо вам спробувати.',
    'expandOnScroll': 'Розгортати розділ, коли я прокручую до нього',
    'expandbyDefault': 'Розгорнути всі розділи за замовчуванням',
    'numberSections': 'Кількість розділів',
    'useEllipses': 'Не обертайте заголовки розділів (натомість використовуйте три крапки)'
    },
    he: {
    'settings': 'אנו בודקים את המיקום החדש של תוכן העניינים. מתחת מופיע דף ההגדרות שונות שנשמח אם תנסו אותן.',
    'expandOnScroll': 'הרחבת הפרק כשאגלגל אותו',
    'expandbyDefault': 'הרחבת כל הפרקים כברירת מחדל',
    'numberSections': 'מספור הפרקים',
    'useEllipses': 'לא להעביר את שמות הפרקים לשורה החדשה, ולהשתמש בשלוש נקודות במקום'
    },
    ar: {
    'settings': 'نختبر حاليًا موضع جديد لجدول المحتويات. التالي هو قائمة بأعمال الضبط المختلفة التي نحثّك على تجربتها.',
    'expandOnScroll': 'توسيع قسم حينما انتقل إليه',
    'expandbyDefault': 'توسيع كل الأقسام افتراضيًا',
    'numberSections': 'ترقيم الأقسام',
    'useEllipses': 'لا تستخدم بدائل لعناوين الأقسام (استخدم علامة الحذف بديلًا)'
    },
    fa: {
    'settings': 'ما در حال آزمایش موقعیت جدیدی برای فهرست مطالب هستیم. در زیر لیستی از پیکربندی های مختلف وجود دارد که شما را تشویق می کنیم آنها را امتحان کنید.',
    'expandOnScroll': 'وقتی به آن اسکرول می کنم، بخش را گسترش بده',
    'expandbyDefault': 'همه بخش ها را به طور پیش فرض گسترش بده',
    'numberSections': 'بخش های شماره',
    'useEllipses': 'عناوین بخش ها را کوتاه نکن (به جای آن از سه نقطه استفاده کن)'
    },
    th: {
    'settings': 'เรากำลังทดสอบการวางตำแหน่งใหม่ของสารบัญ ด้านล่างนี้คือรายการการตั้งค่าที่เราอยากแนะนำให้คุณลองใช้ดู',
    'expandOnScroll': 'ขยายส่วนเมื่อฉันเลื่อนถึงส่วนนั้น ๆ',
    'expandbyDefault': 'ขยายส่วนทั้งหมดโดยปริยาย',
    'numberSections': 'เพิ่มตัวเลขให้กับส่วน',
    'useEllipses': 'ไม่ต้องคลุมชื่อส่วน (ใช้วงรีแทน)'
    },
    ja: {
    'settings': '目次表の新しい配置をテスト中です。ぜひ以下のさまざまな設定を試してみてください。お願いします。',
    'expandOnScroll': '画面をスクロールして見出しを表示するまで折り畳む',
    'expandbyDefault': '既定で全ての見出しを折り畳まない',
    'numberSections': '見出しに番号をふる',
    'useEllipses': '節見出しは改行しない (省略記号の代入を推奨)'
    }

}

function getLocale() {
    const tocPrototypeLang = window.location.hostname.match( /.+?(?=-toc)/ ),
        productionLang = window.location.hostname.match( /[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])?/ ),
        fallback = 'en';

 if ( tocPrototypeLang ) {
    return tocPrototypeLang[ 0 ];
 }
 if ( productionLang ) {
    return productionLang[ 0 ];
 }
 return fallback;
}

Vue.use(i18n, {
    locale:  getLocale(),
    messages:messages
})


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
    console.log( 'stored ToC Styles', storedStyles )
    return JSON.parse( storedStyles ) || defaultTocStyles;
};

function toggleSection( level1ListItems, activeEl ) {
    const { tocExpandAll, tocExpandOnScroll } = getTocStyles();
    if (!tocExpandAll ) {
        [...level1ListItems].forEach( el => {
            if ( el !== activeEl ) {
                el.classList.remove( 'expanded' );
            }
        }  );
    }

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
            <a id="toc-intro" href="#firstHeading">
                <span class="toctext">
                    Introduction
                </span>
            </a>
        </li>`);

        tocEl.querySelector('#toc-intro').addEventListener( 'click', () => {
            window.scrollTo( 0, 0 );
        });

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
        }

        if ( style === 'tocExpandAll' ) {
            tocEl.querySelectorAll( '.toclevel-1' ).forEach( li => li.classList.add( 'expanded' ))
        }

        tocEl.classList.add( style );
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
        document.body.classList.add( 'prototype-sidebar-toc' );
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
