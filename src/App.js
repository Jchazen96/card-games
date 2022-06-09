import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Blackjack from './components/Blackjack';
import HomePage from './components/HomePage';
import War from './components/War';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path ='/blackjack'>
           <Blackjack />
          </Route>
          <Route exact path ='/war'>
            <War />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
