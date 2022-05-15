import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './services/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './contexts/useAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <AuthProvider>
            <App />
         </AuthProvider>
      </Provider>
   </React.StrictMode>
);
