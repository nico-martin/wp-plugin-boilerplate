import {Settings, Translations} from './types';

declare global {
    interface Window {
        PREFIXJsVars: {
            ajaxUrl: string;
            homeUrl: string;
            generalError: string;
            settings: Settings;
            restBase: string;
            restPwpBase: string;
            translationStrings: Translations;
        };
    }
}

export const VARS = window.PREFIXJsVars;

console.log('VARS', window.PREFIXJsVars);