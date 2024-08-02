import './App.css';
import ScoreBoard from './components/ScoreBoard';
import HomeScorePage from './pages/HomeScorePage';
// import ToggleThemeButton from './components/ToggleThemeButton';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <div><ToggleThemeButton /></div> */}
      {/* </header> */}
      <div className="App-body">
        <HomeScorePage />
        <ScoreBoard />
      </div>
    </div>
  );
}

export default App;
