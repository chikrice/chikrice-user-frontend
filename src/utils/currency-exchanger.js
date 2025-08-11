import fx from 'money';
import numeral from 'numeral';
import { useEffect, useState } from 'react';

import { useLocales } from 'src/locales';

export function useCurrencyConverter() {
  const { lang } = useLocales();

  const [currencyCode, setCurrencyCode] = useState('USD');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    switch (lang) {
      case 'ar':
        setCurrencyCode('AED');
        setCurrencySymbol('د.إ');
        break;
      case 'cn':
        setCurrencyCode('CNY');
        setCurrencySymbol('¥');
        break;
      case 'fa':
        setCurrencyCode('IRR');
        setCurrencySymbol('تومان');
        break;
      default:
        // Keep the default currency code and symbol for English
        break;
    }
  }, [lang]);

  const fCurrency = (value) => {
    if (!value) return '';

    fx.base = 'USD';
    fx.rates = {
      USD: 1,
      AED: 3.67,
      CNY: 6.43,
      IRR: 41905,
      // Add more exchange rates as needed
    };
    const convertedValue = fx.convert(value, { from: 'USD', to: currencyCode });

    // Format the converted value with the determined currency symbol
    const formattedValue = convertedValue ? numeral(convertedValue).format('0,0.00') : '';
    return currencySymbol + formattedValue;
  };

  return { fCurrency };
}
