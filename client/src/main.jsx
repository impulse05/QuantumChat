import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  
  <Provider store={store}>
    <App />
  </Provider>
 
</StrictMode>
)
