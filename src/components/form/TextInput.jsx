import React from 'react';
import { useNalogField } from '../../hooks/useNalogField';

export const TextInput = ({ nalogId, id, label, className = '', children, ...props }) => {
    const { value, onChange, invalid } = useNalogField(nalogId, id);
    const finalClassName = `form-field ${className} ${invalid ? 'form-field-invalid' : ''}`;

    return (
        <div>
            <input
                id={id}
                className={finalClassName}
                type="text"
                value={value || ''} // Ensure controlled input
                onChange={onChange}
                placeholder={label}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                {...props}
            />
            {children}
        </div>
    );
};
