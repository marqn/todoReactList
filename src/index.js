import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/axios/dist/axios.min.js';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
