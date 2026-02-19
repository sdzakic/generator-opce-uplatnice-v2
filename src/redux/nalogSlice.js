import { createSlice } from '@reduxjs/toolkit';

const defaultNalog = {
    naziv: '',
    platitelj__ime: '',
    platitelj__adresa: '',
    platitelj__gradMjesto: '',
    primatelj__ime: '',
    primatelj__adresa: '',
    primatelj__gradMjesto: '',
    primatelj__iban: '',
    iznos: '',
    primatelj__model: '',
    primatelj__pozivNaBroj: '',
    sifra__namjene: '',
    opis_placanja: ''
};

const initialState = {
    nalozi: [{ id: 1, ...defaultNalog }]
};

export const nalogSlice = createSlice({
    name: 'nalog',
    initialState,
    reducers: {
        updateValue: (state, action) => {
            const { nalogId, id, value } = action.payload;
            const nalog = state.nalozi.find(n => n.id === nalogId);
            if (nalog) {
                nalog[id] = value;
            }
        },
        clearForm: (state, action) => {
            // For now, let's say it resets the specific form if nalogId provided, or all?
            // Existing logic was "NOVI NALOG" -> Clear.
            // If we have multiple, maybe we just reset the one being worked on?
            // Or "NOVI NALOG" creates a new one?
            // User said: "add another button... to add multiple Forma elements".
            // So "NOVI NALOG" (existing) probably cleans the FIRST one or ALL?
            // Let's make "clearForm" reset the specific nalog passed in payload.
            const { nalogId } = action.payload || {};
            if (nalogId) {
                const index = state.nalozi.findIndex(n => n.id === nalogId);
                if (index !== -1) {
                    state.nalozi[index] = { id: nalogId, ...defaultNalog };
                }
            } else {
                // Fallback or clear all? Let's just reset the first one if no ID to keep backward compat logic if possible, 
                // but better to be explicit. Let's just reset everything if no ID.
                // Actually, let's deprecate clearForm in favor of addNalog or resetNalog.
                // For now, let's just create a new one for "NOVI NALOG".
                // Wait, "NOVI NALOG" button is in ButtonBox.
                state.nalozi = initialState.nalozi;
            }
        },
        addNalog: (state) => {
            const newId = state.nalozi.length > 0 ? Math.max(...state.nalozi.map(n => n.id)) + 1 : 1;
            state.nalozi.push({ id: newId, ...defaultNalog });
        },
        removeNalog: (state, action) => {
            state.nalozi = state.nalozi.filter(n => n.id !== action.payload);
        },
        loadNalog: (state, action) => {
            const payload = action.payload;

            if (Array.isArray(payload)) {
                // New format: Array of slips
                state.nalozi = payload;
            } else if (payload.nalozi && Array.isArray(payload.nalozi)) {
                // New format wrapper
                state.nalozi = payload.nalozi;
            } else {
                // Legacy format: Single slip object
                // We wrap it in an array with a fresh ID (or ID 1)
                // Assuming legacy object doesn't have 'id' or we overwrite it to be consistent
                state.nalozi = [{ ...defaultNalog, ...payload, id: 1 }];
            }
        }
    }
});

export const { updateValue, clearForm, loadNalog, addNalog, removeNalog } = nalogSlice.actions;

export default nalogSlice.reducer;
