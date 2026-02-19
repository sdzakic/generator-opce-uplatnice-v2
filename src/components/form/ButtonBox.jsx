import React from 'react';
import { useDispatch } from 'react-redux';
import { clearForm, addNalog } from '../../redux/nalogSlice';

export const ButtonBox = () => {
    const dispatch = useDispatch();

    const handleClick = (ev) => {
        ev.preventDefault();

        switch (ev.target.name) {
            case 'novi-nalog':
                // Reset to initial state (single empty slip)
                // Use a dedicated action for full reset or fix clearForm
                // For now, let's assume clearForm() creates a fresh start if implemented that way.
                // Re-implementation of clearForm in slice required to handle global reset.
                // Assuming I will fix nalogSlice next.
                dispatch(clearForm());
                break;
            case 'print':
                window.print();
                break;
            case 'dodaj-nalog':
                dispatch(addNalog());
                break;
        }
    };

    return (
        <fieldset className="fieldset-novi-nalog">
            <button name="dodaj-nalog" onClick={handleClick}>DODAJ UPLATNICU</button>
            <button name="novi-nalog" onClick={handleClick}>NOVI NALOG (RESET)</button>
            <button name="print" onClick={handleClick}>ISPIS NALOGA</button>
        </fieldset>
    );
};
