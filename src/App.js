import './App.css';
import { useSelector , useDispatch } from 'react-redux';
import ScoreScreen from './components/ScoreScreen';
import ActionButtons from './components/ActionButtons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Score Card
        </div>
        <ScoreScreen />
        <ActionButtons />
      </header>
    </div>
  );
}

export default App;
