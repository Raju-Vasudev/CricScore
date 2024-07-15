import './App.css';
import HomeScorePage from './pages/HomeScorePage';
import ToggleThemeButton from './components/ToggleThemeButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <ToggleThemeButton />
        </div>
        <HomeScorePage />
      </header>
    </div>
  );
}

export default App;
