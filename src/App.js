import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Billpage from './Components/Pages/Billpage';
import Dashboard from './Components/Pages/Dashboard';
import EditPage from './Components/Pages/EditPage';
import AddPage from './Components/Pages/AddPage';
import WantedList from './Components/Pages/WantedList';
import Reports from './Components/Pages/Reports';

const App = () => {
  return (
    <HashRouter>
      <Route path='/' exact component={Dashboard} />
      <Route path='/add' exact component={AddPage} />
      <Route path='/billing...' component={Billpage} />
      <Route path='/wanted' component={WantedList} />
      <Route path='/reports' component={Reports} />
      <Route path='/edit/:id' component={EditPage} exact />
    </HashRouter>
  );
};

export default App;
