import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthRoute from './util/AuthRoute';
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
import EquipmentPage from './components/equipment/EquipmentPage';
import NotFound from './components/NotFound';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <AuthRoute path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <AuthRoute path="/jobs" exact component={JobList} />
          <AuthRoute path="/jobs/:id" exact component={Job} />
          <AuthRoute path="/equipment" exact component={EquipmentList} />
          <AuthRoute path="/equipment/machine" exact component={MachineList} />
          <AuthRoute path="/equipment/shoring" exact component={ShoringList} />
          <AuthRoute path="/equipment/rental" exact component={RentalList} />
          <AuthRoute path="/equipment/other" exact component={OtherList} />
          <AuthRoute path="/equipment/:id" exact component={EquipmentPage} />
          <Route path="/" render={() => <NotFound />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
