import React from 'react';
import { TextInput } from './form/TextInput';
import { PaymentModels } from './form/PaymentModels';
import { IntentCodes } from './form/IntentCodes';
import { TextArea } from './form/TextArea';
import { Barcode } from './form/Barcode';
import { Potvrda } from './form/Potvrda';
import uplatnicaImg from '../assets/uplatnica.jpg';

export const Forma = ({ nalogId }) => {
    return (
        <form className="uplatnica" >
            <img className="uplatnica__img" src={uplatnicaImg} alt="Uplatnica" />
            <fieldset className="fieldset-platitelj">
                <TextInput nalogId={nalogId} id="platitelj__ime" label="ime i prezime / naziv" />
                <TextInput nalogId={nalogId} id="platitelj__adresa" label="adresa" />
                <TextInput nalogId={nalogId} id="platitelj__gradMjesto" label="grad/mjesto" />
            </fieldset>
            <fieldset className="fieldset-primatelj">
                <TextInput nalogId={nalogId} id="primatelj__ime" label="ime i prezime / naziv" />
                <TextInput nalogId={nalogId} id="primatelj__adresa" label="adresa" />
                <TextInput nalogId={nalogId} id="primatelj__gradMjesto" label="grad/mjesto" />
            </fieldset>
            <fieldset className="fieldset-brojke">
                <TextInput nalogId={nalogId} id="iznos" label="iznos uplate" className="form-field--iznos" />
                <TextInput nalogId={nalogId} id="primatelj__iban" label="IBAN primatelja" className="form-field--iban" maxLength={21} />
                <br />
                <PaymentModels nalogId={nalogId} id="primatelj__model" className="form-field--model" />
                <TextInput nalogId={nalogId} id="primatelj__pozivNaBroj" className="form-field--poziv-na-broj" />
                <IntentCodes nalogId={nalogId} id="sifra__namjene" className="form-field--sifra-namjene" />
                <TextArea nalogId={nalogId} id="opis_placanja" className="form-field--opis" label="opis plaćanja" />
            </fieldset>
            {/* Barcode component typically uses canvas ref, needs to be placed correctly */}
            <Barcode nalogId={nalogId} />
            <Potvrda nalogId={nalogId} />

        </form>
    );
};
