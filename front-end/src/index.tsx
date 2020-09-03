import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import store from '@App/store';
import { Provider } from 'react-redux';
import App from '@App/components/app/App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,

  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
