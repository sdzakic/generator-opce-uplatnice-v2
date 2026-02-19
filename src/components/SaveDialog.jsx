import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateValue } from '../redux/nalogSlice';
import { TextInput } from './form/TextInput';

export const SaveDialog = () => {
    const dispatch = useDispatch();
    const nalozi = useSelector(state => state.nalog.nalozi);
    const [naziv, setNaziv] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const [validationMsgType, setValidationMsgType] = useState('none');

    // Initialize naziv from first slip if available and empty
    // Actually, controlled input is better. 

    const showMsg = (msgText, msgType) => {
        setValidationMsgType(msgType);
        setValidationMsg(msgText);
        setTimeout(() => {
            setValidationMsgType('none');
            setValidationMsg('');
        }, 4000);
    };

    const validateNaziv = (naziv) => {
        if (!naziv || naziv.trim() === '') {
            showMsg('Naziv ne smije biti prazan. Molimo upišite naziv, pa probaje ponovo...', 'error');
            return false;
        }
        return true;
    };

    const handleClick = (ev) => {
        ev.preventDefault();
        const cleanNaziv = naziv.trim();

        if (!validateNaziv(cleanNaziv)) return;

        // Wrap data to include the "collection name" in the saved file?
        // Legacy format used fields directly.
        // We'll save the array, but maybe we should verify if we need to store the name "naziv" inside the JSON?
        // Legacy used `nalog.naziv` for display in LoadDialog.
        // `LoadDialog` reads `JSON.parse(el[1]).naziv`.
        // So we MUST include `naziv` in the saved object!
        // We cannot just save `nalozi` array because `Array` doesn't have properties.
        // So we MUST save: `{ naziv: cleanNaziv, nalozi: nalozi }`.

        const dataToSave = {
            naziv: cleanNaziv,
            nalozi: nalozi
        };

        const nalogJson = JSON.stringify(dataToSave); // "nalogJson" name kept for diff minimality
        const recordName = cleanNaziv.replace(/\s+/g, '-').toLocaleLowerCase();

        if (ev.target.name === 'save') {
            localStorage.setItem(recordName, nalogJson);
            showMsg('Nalozi su uspješno spremljeni na vaše računalo!', 'ok');
            window.dispatchEvent(new Event('popisNalogaChanges'));
        } else if (ev.target.name === 'download') {
            const prettyJson = JSON.stringify(dataToSave, null, 2);
            const fileName = recordName + '.json';
            const blob = new Blob([prettyJson], { type: 'application/json' });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = "none";
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    };

    return (
        <fieldset className="fieldset-save-dialog">
            <div className="form-field-wrapper">
                <input
                    type="text"
                    className="form-field"
                    value={naziv}
                    onChange={(e) => setNaziv(e.target.value)}
                    placeholder="Naziv seta naloga"
                />
                <button name="save" onClick={handleClick}>Spremi u web preglednik</button>&nbsp;
                <button name="download" onClick={handleClick}>Spremi u datoteku</button>
            </div>
            <span className="fieldset-save-dialog__hint">Ako popunjeni nalog planirate još koji puta koristiti možete ga trajno <strong>spremiti</strong> u memoriju web preglednika ili <strong>preuzeti</strong> u obliku datoteke na lokalno računalo.</span>
            <span className={"fieldset-validation-msg fieldset-validation-msg-" + validationMsgType}>{validationMsg}</span>
        </fieldset>
    );
};
