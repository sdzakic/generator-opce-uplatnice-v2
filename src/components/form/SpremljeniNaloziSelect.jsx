import React from 'react';
import { SelectBase } from './SelectBase';

export const SpremljeniNaloziSelect = (props) => {
    // SpremljeniNaloziSelect wraps SelectBase and maps popisNaloga to options
    // It passes children (buttons) to SelectBase as 'buttons' prop in legacy, 
    // but SelectBase I implemented puts children inside select, and buttons as separate prop.
    // Legacy SelectBase:
    // <select ...>{this.props.children}</select>
    // {this.props.buttons}

    // Legacy SpremljeniNaloziSelect:
    // <SelectBase ... buttons={this.props.children}>
    //    options...
    // </SelectBase>

    return (
        <SelectBase
            {...props}
            label="Šifra namjene"
            buttons={props.children}
        // id, onChange, value passed via props
        >
            {props.popisNaloga && props.popisNaloga.map((el, ix) =>
                <option key={el.key} value={el.key}>{el.naziv}</option>
            )}
        </SelectBase>
    );
};
