import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import Routes from './routes';
import { store, persistor } from './store';
import { IconSettings } from '@salesforce/design-system-react';

class App extends React.Component {

  render() {
    return (
      <IconSettings iconPath="/icons">
        <ThirdwebProvider activeChain={'ethereum'}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Routes />
            </PersistGate>
          </Provider>
        </ThirdwebProvider>
      </IconSettings>
    );
  }
}

ReactDOM.hydrate(<App />, document.getElementById('root'));