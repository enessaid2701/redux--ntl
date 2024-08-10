import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import { IntlProvider } from 'react-intl';
import messages_en from './locales/en.json';
import messages_tr from './locales/tr.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const messages = {
  en: messages_en,
  tr: messages_tr,
};

const IntlApp = () => {
  const locale = useSelector(state => state.locale.locale);
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <App />
    </IntlProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <IntlApp />
  </Provider>
);

reportWebVitals();
