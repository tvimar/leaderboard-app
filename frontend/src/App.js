import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Leaderboard Application</h1>
                <Switch>
                    <Route path="/" exact component={Leaderboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;