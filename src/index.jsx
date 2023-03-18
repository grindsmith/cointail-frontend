import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import Routes from './routes';
import { store, persistor } from './store';

function App() {
  return (
    <ThirdwebProvider activeChain="ethereum">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </ThirdwebProvider>
  );
}

ReactDOM.hydrate(<App />, document.getElementById('root'));
