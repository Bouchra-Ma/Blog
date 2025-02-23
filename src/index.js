import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './Components/AuthContext';// là c lui qui va fournir les fonctions de login et logout
import { ThemeProvider } from './Components/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
  <React.StrictMode>
     <BrowserRouter>
     <AuthProvider>
     <ThemeProvider>
        <App />
     </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
