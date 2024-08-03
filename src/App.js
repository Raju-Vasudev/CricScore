import './App.css';
import HomeScorePage from './pages/HomeScorePage';
// import ToggleThemeButton from './components/ToggleThemeButton';

function App() {
  return (
    <div className="App">
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
