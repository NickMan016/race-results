import './assets/css/index.css';
import { CountriesProvider } from './context/CountriesDB/CountriesProvider';
import { F1Provider } from './context/F1DB/F1Provider';
import { Router } from './routes';

function App() {
  return (
    <CountriesProvider>
      <F1Provider>
        <Router />
      </F1Provider>
    </CountriesProvider>
  );
}

export default App;
