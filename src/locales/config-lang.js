import merge from 'lodash/merge';
import { enUS as enUSDate, faIR as faIRDate } from '@mui/x-date-pickers/locales';
// date-pickers
import { enUS as enUSCore, arSA as arSACore, faIR as faIRCore } from '@mui/material/locale'; // data-grid
import { faIR as faIRGrid, enUS as enUSDataGrid, arSD as arSDDataGrid } from '@mui/x-data-grid';
// core
import { enUS as enUSAdapter, arSA as arSAAdapter, faIR as faIRAdapter } from 'date-fns/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },

  {
    label: 'Arabic',
    value: 'ar',
    systemValue: merge(faIRDate, arSDDataGrid, arSACore),
    adapterLocale: arSAAdapter,
    icon: 'flagpack:ae',
  },
  {
    label: 'Farsi',
    value: 'fa',
    systemValue: merge(faIRGrid, faIRCore),
    adapterLocale: faIRAdapter,
    icon: 'flagpack:ir',
  },
];

// Function to get the default language based on the browser's language setting
export const getBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.languages[0];

  // Check if browser language is Arabic or English
  if (browserLang.startsWith('ar')) {
    return allLangs[1]; // Arabic
  } else if (browserLang.startsWith('en')) {
    return allLangs[0]; // English
  } else {
    return allLangs[2];
  }
};

export const defaultLang = getBrowserLanguage();
