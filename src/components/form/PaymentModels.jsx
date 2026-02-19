import React from 'react';
import { SelectBase } from './SelectBase';
import { useNalogField } from '../../hooks/useNalogField';
import BarcodePayment from '../../lib/BarcodePayment';

export const PaymentModels = ({ nalogId, id, className = '', ...props }) => {
    const { value, onChange, invalid } = useNalogField(nalogId, id);
    const finalClassName = `${className} ${invalid ? 'form-field-invalid' : ''}`; // SelectBase handles form-field class

    return (
        <SelectBase
            id={id}
            className={finalClassName}
            onChange={onChange}
            value={value}
            {...props}
        >
            <option key="" value=""></option>
            {BarcodePayment.PaymentModels.map(({ model }) => <option key={model} value={"HR" + model}>{"HR" + model}</option>)}
        </SelectBase>
    );
};
