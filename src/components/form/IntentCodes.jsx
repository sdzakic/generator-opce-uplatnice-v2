import React from 'react';
import { SelectBase } from './SelectBase';
import { useNalogField } from '../../hooks/useNalogField';
import BarcodePayment from '../../lib/BarcodePayment';

export const IntentCodes = ({ nalogId, id, className = '', ...props }) => {
    const { value, onChange, invalid } = useNalogField(nalogId, id);
    const finalClassName = `${className} ${invalid ? 'form-field-invalid' : ''}`;

    return (
        <SelectBase
            id={id}
            className={finalClassName}
            onChange={onChange}
            value={value}
            {...props}
        >
            <option key="" value=""></option>
            {BarcodePayment.IntentCodes.map(el => <option key={el.code} value={el.code}>{el.code + " -  " + el.title}</option>)}
        </SelectBase>
    );
};
