import './assets/css/index.css';
import { CountriesProvider } from './context/CountriesDB/CountriesProvider';
import { F1Provider } from './context/F1DB/F1Provider';
import { Router } from './routes';

function App() {
  return (
    <F1Provider>
      <CountriesProvider>
        <Router />
      </CountriesProvider>
    </F1Provider>
  );
}

export default App;
