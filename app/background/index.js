/**
 * This script is loaded when the extension is installed and
 * runs continuously in the background while the browser is open.
 */

import { defaultUserPreferences, defaultUIState } from './constants.js';

async function installExtension() {
    await browser.storage.local.set( { userPreferences: defaultUserPreferences } );
    await browser.storage.local.set( { uiState: defaultUIState } );
}

browser.runtime.onInstalled.addListener( installExtension );
