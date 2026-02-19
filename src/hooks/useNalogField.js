import { useSelector, useDispatch } from 'react-redux';
import { updateValue } from '../redux/nalogSlice';
import { paramName } from '../lib/paymentParamsFacade';
import BarcodePayment from '../lib/BarcodePayment';

export function useNalogField(nalogId, id) {
    // Access state.nalog (slice) .nalozi (array) .find(id) .[field]
    const value = useSelector(state => {
        const nalog = state.nalog.nalozi.find(n => n.id === nalogId);
        return nalog ? nalog[id] : '';
    });
    const dispatch = useDispatch();

    const onChange = (e) => {
        // e.target.value for inputs/selects
        dispatch(updateValue({ nalogId, id, value: e.target.value }));
    };

    const param = paramName[id];
    let invalid = false;

    if (param && BarcodePayment.validate && BarcodePayment.validate[param]) {
        // Validation returns 0 if OK, otherwise some bitmask error code
        invalid = BarcodePayment.validate[param](value) !== 0;
    }

    return { value, onChange, invalid };
}
