import React from 'react';
import { useNalogField } from '../../hooks/useNalogField';

export const TextArea = ({ nalogId, id, label, className = '', ...props }) => {
    const { value, onChange, invalid } = useNalogField(nalogId, id);
    const finalClassName = `form-field ${className} ${invalid ? 'form-field-invalid' : ''}`;

    return (
        <textarea
            className={finalClassName}
            id={id}
            cols="33"
            rows="4"
            onChange={(e) => {
                // Replace newlines with spaces to avoid validation errors
                e.target.value = e.target.value.replace(/[\r\n]+/g, ' ');
                onChange(e);
            }}
            value={value || ''}
            placeholder={label}
            {...props}
        />
    );
};
