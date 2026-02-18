import { createContext } from 'react';

export const DeckPrintContext = createContext(false);
export const DeckLightModeContext = createContext(false);
/** Maps slide id → 1-based position number. Provided by DeckShell. */
export const DeckSlideIndexContext = createContext<Record<string, number>>({});
