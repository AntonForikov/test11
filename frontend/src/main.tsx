import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {persistor, store} from './app/store';
import {BrowserRouter} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {PersistGate} from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <CssBaseline/>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
