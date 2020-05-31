import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import JobList from './components/jobs/JobList';
import Job from './components/jobs/Job';
import EquipmentList from './components/equipment/EquipmentList';
import MachineList from './components/equipment/machines/MachineList';
import ShoringList from './components/equipment/shoring/ShoringList';
import RentalList from './components/equipment/rentals/RentalList';
import OtherList from './components/equipment/other/OtherList';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/jobs" exact component={JobList} />
        <Route path="/jobs/:id" exact component={Job} />
        <Route path="/equipment" exact component={EquipmentList} />
        <Route path="/equipment/machines" exact component={MachineList} />
        <Route path="/equipment/shoring" exact component={ShoringList} />
        <Route path="/equipment/rentals" exact component={RentalList} />
        <Route path="/equipment/other" exact component={OtherList} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
