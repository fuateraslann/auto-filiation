import React from 'react';
import './App.css';
import LoginPage from "./pages/LoginPage"
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import FiliationPage from "./pages/FiliationPage";
import NotFoundPage from './pages/NotFoundPage';
import DemoApp from "./pages/clustermap";
function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={LoginPage}/>
                    <Route path="/Command-Panel" exact component={FiliationPage}/>
                    <Route path="/Map" exact component={DemoApp}/>
                    <Route component={NotFoundPage}></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
