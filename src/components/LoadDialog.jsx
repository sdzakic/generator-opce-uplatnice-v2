import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loadNalog } from '../redux/nalogSlice';
import { SpremljeniNaloziSelect } from './form/SpremljeniNaloziSelect';

export const LoadDialog = () => {
    const dispatch = useDispatch();
    const loadFileRef = useRef(null);

    const getPopisNaloga = () => {
        return Object.entries(localStorage).map(el => {
            try {
                return { key: el[0], naziv: JSON.parse(el[1]).naziv };
            } catch (e) {
                return null;
            }
        }).filter(el => el !== null);
    };

    const [popisNaloga, setPopisNaloga] = useState(getPopisNaloga());
    const [selectedKey, setSelectedKey] = useState(popisNaloga.length > 0 ? popisNaloga[0].key : undefined);
    const [validationMsg, setValidationMsg] = useState('');
    const [validationMsgType, setValidationMsgType] = useState('none');

    useEffect(() => {
        const handleStorageChange = () => {
            const noviPopis = getPopisNaloga();
            setPopisNaloga(noviPopis);
            if (noviPopis.length === 1) {
                setSelectedKey(noviPopis[0].key);
            } else if (noviPopis.length === 0) {
                setSelectedKey(undefined);
            } else if (!noviPopis.find(p => p.key === selectedKey) && noviPopis.length > 0) {
                setSelectedKey(noviPopis[0].key);
            }
        };

        window.addEventListener('popisNalogaChanges', handleStorageChange);
        // Also listen to storage events if multiple tabs
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('popisNalogaChanges', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const showMsg = (msgText, msgType) => {
        setValidationMsgType(msgType);
        setValidationMsg(msgText);
        setTimeout(() => {
            setValidationMsgType('none');
            setValidationMsg('');
        }, 4000);
    };

    const handleHandleClick = (ev) => {
        ev.preventDefault();

        switch (ev.target.id) {
            case 'fieldset-load-dialog__load':
                if (selectedKey) {
                    try {
                        const data = JSON.parse(localStorage.getItem(selectedKey));
                        dispatch(loadNalog(data));
                        showMsg('Nalozi uspješno učitani', 'ok');
                    } catch (e) {
                        showMsg('Greška kod učitavanja naloga', 'error');
                    }
                }
                break;
            case 'fieldset-load-dialog__delete':
                if (selectedKey) {
                    localStorage.removeItem(selectedKey);
                    showMsg('Nalozi uspješno obrisani sa vašeg računala ...', 'ok');
                    window.dispatchEvent(new Event('popisNalogaChanges'));
                }
                break;
            case 'fieldset-load-dialog__load-file-button':
                loadFileRef.current.click();
                break;
        }
    };

    const handleFileSelected = (ev) => {
        const file = ev.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (progressEv) => {
            const jsonString = progressEv.target.result;
            try {
                const loadedObject = JSON.parse(jsonString);
                dispatch(loadNalog(loadedObject));
                showMsg('Nalozi uspješno učitani iz datoteke', 'ok');
            } catch (e) {
                showMsg('Greška kod učitavanja datoteke. Format datoteke nije prepoznat...', 'error');
            }
        };
        reader.readAsText(file);
        ev.target.value = null; // Reset input
    };

    return (
        <fieldset className="fieldset-load-dialog">
            <SpremljeniNaloziSelect
                popisNaloga={popisNaloga}
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                id="load-dialog-select"
            >
                <button id="fieldset-load-dialog__load" onClick={handleHandleClick} disabled={!selectedKey}>Učitaj odabrane naloge</button>
                <button id="fieldset-load-dialog__delete" onClick={handleHandleClick} disabled={!selectedKey}>Obriši odabrane naloge</button>
                <input
                    className="fieldset-load-dialog__load-file"
                    type="file"
                    id="load-file"
                    name="load-file"
                    onChange={handleFileSelected}
                    accept=".json"
                    ref={loadFileRef}
                    style={{ display: 'none' }} // Usually hidden by CSS, but explicit here helps
                />
                <button className="fieldset-load-dialog__load-file-button" id="fieldset-load-dialog__load-file-button" onClick={handleHandleClick}>Učitaj naloge iz datoteke</button>
            </SpremljeniNaloziSelect>
            <span className={"fieldset-validation-msg fieldset-validation-msg-" + validationMsgType}>{validationMsg}</span>
        </fieldset>
    );
};
