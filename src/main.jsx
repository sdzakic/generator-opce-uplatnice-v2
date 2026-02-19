import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import './index.css'

// Import legacy libraries for side-effects (attaching to window)

import BarcodePayment from './lib/BarcodePayment'

// Initialize BarcodePayment global settings
BarcodePayment.Init({
  ValidateIBAN: false,
  ValidateModelPozivNaBroj: true
});

// Expose BarcodePayment to window if needed by legacy code, 
// though we should try to use the imported module where possible.
window.BarcodePayment = BarcodePayment;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
