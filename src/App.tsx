import './assets/css/index.css';
import { F1Provider } from './context/F1DB/F1Provider';
import { Router } from './routes';

function App() {
  return (
    <F1Provider>
      <Router />
    </F1Provider>
  );
}

export default App;
