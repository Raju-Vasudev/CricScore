import './App.css';
import HomeScorePage from './pages/HomeScorePage';
import ToggleThemeButton from './components/ToggleThemeButton';
import { useSelector } from 'react-redux';

function App() {
  const theme = useSelector((state) => state.theme);
  console.log(theme);
  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        {/* <div><ToggleThemeButton /></div> */}
        <h1>Cric Count</h1>
      </header>
      <div className="App-body">
        <HomeScorePage />
      </div>
    </div>
  );
}

export default App;
