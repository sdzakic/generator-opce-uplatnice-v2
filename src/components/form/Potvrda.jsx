import React from 'react';
import { useSelector } from 'react-redux';
import { FormatCurrency } from '../../lib/Format';

export const Potvrda = ({ nalogId }) => {
    const nalog = useSelector(state => state.nalog.nalozi.find(n => n.id === nalogId) || {});

    // Potvrda needs a few specific fields
    const iznos = FormatCurrency(nalog.iznos);
    const { primatelj__iban, primatelj__model, primatelj__pozivNaBroj, opis_placanja, platitelj__ime } = nalog;

    return (
        <fieldset className="fieldset-potvrda">
            <div className="potvrda-field potvrda-field--iznos">{iznos}</div>
            <div className="potvrda-field potvrda-field--platitelj">{platitelj__ime}</div>
            <div className="potvrda-field potvrda-field--iban">{primatelj__iban}</div>
            <div className="potvrda-field potvrda-field--model-i-poziv-na-broj">{primatelj__model} {primatelj__pozivNaBroj}</div>
            <div className="potvrda-field potvrda-field--opis-placanja">{opis_placanja}</div>
        </fieldset>
    );
};
