import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from './redux';
import { AppLayout } from './layouts/AppLayout';

let persistor = persistStore(store);

function App() {  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppLayout />
      </PersistGate>
    </Provider>
  );
}

export default App;
