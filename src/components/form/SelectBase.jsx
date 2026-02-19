import React from 'react';

export const SelectBase = ({ id, className = '', children, buttons, onChange, value }) => {
    // Note: SelectBase in legacy code accepted onChange and value from props, 
    // but the specific implementations (IntentCodes, PaymentModels) were connected via ReduxConnector.
    // So the 'Connected' versions passed value and onChange.
    // Here we will expect the parent (IntentCodes, PaymentModels) to use the hook and pass props.

    return (
        <div>
            <select
                className={`form-field ${className}`}
                id={id}
                onChange={onChange}
                value={value || ''}
            >
                {children}
            </select>
            {buttons}
        </div>
    );
};
