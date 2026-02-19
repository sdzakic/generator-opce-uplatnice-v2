import React from 'react';
import { useSelector } from 'react-redux';
import { paramName } from '../lib/paymentParamsFacade';
import BarcodePayment from '../lib/BarcodePayment';

export const Validacija = ({ nalogId }) => {
    const nalog = useSelector(state => state.nalog.nalozi.find(n => n.id === nalogId) || {});

    const getErrorMessages = () => {
        const messages = [];

        Object.entries(paramName).forEach(([fieldId, paramKey]) => {
            const value = nalog[fieldId];
            const validator = BarcodePayment.validate[paramKey];

            if (validator) {
                const result = validator(value);
                if (result !== 0) {
                    // Check specific bits
                    for (const [key, code] of Object.entries(BarcodePayment.ValidationResult)) {
                        if ((result & code) === code && code !== 0) {
                            // Only if this specific error bit is set
                            // We need to check if the error is relevant to this paramKey
                            // Because ValidationResult contains ALL errors mixed? 
                            // No, ValidationResult constants are unique bits.
                            // But we need to make sure we map the bit to a logical message.
                            // Some bits are generic like "Invalid", others specific "MaxLength".

                            // We should only show messages relevant to the current field to avoid confusion, 
                            // although the validator only returns bits relevant to it (defined in BarcodePayment.validate methods).

                            const msg = mapErrorToText(key, paramKey);
                            if (msg) messages.push(msg);
                        }
                    }
                }
            }
        });

        return [...new Set(messages)]; // Deduplicate
    };

    const mapErrorToText = (errorKey, paramKey) => {
        // Map error key (e.g. 'PricePatternInvalid') to text
        const fieldMap = {
            'Iznos': 'Iznos',
            'ImePlatitelja': 'Ime platitelja',
            'AdresaPlatitelja': 'Adresa platitelja',
            'SjedistePlatitelja': 'Grad/Mjesto platitelja',
            'Primatelj': 'Ime primatelja',
            'AdresaPrimatelja': 'Adresa primatelja',
            'SjedistePrimatelja': 'Grad/Mjesto primatelja',
            'IBAN': 'IBAN',
            'ModelPlacanja': 'Model plaćanja',
            'PozivNaBroj': 'Poziv na broj',
            'SifraNamjene': 'Šifra namjene',
            'OpisPlacanja': 'Opis plaćanja'
        };

        const fieldName = fieldMap[paramKey] || paramKey;

        if (errorKey.includes('MaxLengthExceeded')) {
            // Get max length logic if needed, or just generic
            return `${fieldName}: Prekoračen maksimalan broj znakova.`;
        }

        if (errorKey.includes('Invalid')) {
            if (paramKey === 'Iznos' && errorKey === 'PricePatternInvalid') {
                return `${fieldName}: Neispravan format (primjer: 123,45).`;
            }
            if (paramKey === 'IBAN') {
                return `${fieldName}: Neispravan format.`;
            }
            return `${fieldName}: Podatak nije ispravan.`;
        }

        return null;
    };

    const errors = getErrorMessages();

    if (errors.length === 0) return null;

    return (
        <div className="validation-errors">
            <ul>
                {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
        </div>
    );
};
