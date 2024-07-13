import logo from './logo.svg';
import './App.css';
import { useSelector , useDispatch } from 'react-redux';
import { increment } from './reducers/features/scoreCardSlice';
import Button from '@mui/material/Button';

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Score Card
        </div>
        <div>
          Score : {state.scoreCard.value}
        </div>
        <div>
        <Button variant="contained" onClick={() => dispatch(increment())}>Outlined</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
