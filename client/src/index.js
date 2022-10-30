import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
// import SimpleBottomNavigation from './navigator'
import * as serviceWorker from './serviceWorker';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <BrowserRouter>
 
    <App />
    
    
  </BrowserRouter>
  
);

// <React.StrictMode>
    
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
