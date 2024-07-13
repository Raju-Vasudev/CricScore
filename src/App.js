import './App.css';
import ScoreScreen from './components/ScoreScreen';
import ActionButtons from './components/ActionButtons';
import ToggleThemeButton from './components/ToggleThemeButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <ToggleThemeButton />
        </div>
        <ScoreScreen />
        <ActionButtons />
      </header>
    </div>
  );
}

export default App;
