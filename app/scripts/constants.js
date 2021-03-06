export const defaultOptions = {
    dip:                { value: false }, 
    dipHeader:          { value: false },
    dipUserMenu:        { value: false },
    dipLanguageSwitcher:{ value: false },
    dipToc:             { value: false },
    dipLineLength:      { value: false },
    darkMode:           { value: false },
    darkModeSystem:     { value: false }
}

export const webRequestFilters = { 
    urls: [
        "https://*.wikipedia.org/wiki/*",
        "https://*.wikipedia.org/w/index.php*"
    ] 
};

export const webNavigationFilters = { 
    url: [ 
        { hostContains: "wikipedia.org" } 
    ] 
};