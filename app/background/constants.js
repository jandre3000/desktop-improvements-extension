export const defaultUserPreferences = {
    modernMode:         { value: false },
    stickyHeader:       { value: false },
    compactUserMenu:    { value: false },
    dipLanguageSwitcher:{ value: false },
    dipToc:             { value: false },
    dipLineLength:      { value: false },
    darkMode:           { value: false },
    darkModeSystem:     { value: false }
}

export const defaultUIOptions = {
    visible: { value: false }
}

export const webRequestFilters = {
    urls: [
        "https://*.wikipedia.org/wiki/*",
        "https://*.wikipedia.org/w/index.php*",
        "https://commons.wikimedia.org/wiki/*",
        "https://commons.wikimedia.org/w/index.php*",
        "https://*.wikibooks.org/wiki/*",
        "https://*.wikibooks.org/w/index.php*",
        "https://*.wikiversity.org/wiki/*",
        "https://*.wikiversity.org/w/index.php*",
        "https://*.wikivoyage.org/wiki/*",
        "https://*.wikivoyage.org/w/index.php*",
        "https://*.wikinews.org/wiki/*",
        "https://*.wikinews.org/w/index.php*",
        "https://*.wikiquote.org/wiki/*",
        "https://*.wikiquote.org/w/index.php",
        "https://*.wiktionary.org/wiki/*",
        "https://*.wiktionary.org/w/index.php",
        "https://www.wikidata.org/wiki/*",
        "https://www.wikidata.org/w/index.php",
        "https://www.mediawiki.org/wiki/*",
        "https://www.mediawiki.org/w/index.php",
        "https://office.wikimedia.org/wiki/*",
        "https://office.wikimedia.org/w/index.php"
    ]
};
