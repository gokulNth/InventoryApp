import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Billpage from './Components/Pages/Billpage';
import Dashboard from './Components/Pages/Dashboard';
import EditPage from './Components/Pages/EditPage';
import AddPage from './Components/Pages/AddPage';

const App = () => {
  return (
    <HashRouter>
      <Route path='/' exact component={Dashboard} />
      <Route path='/add' exact component={AddPage} />
      <Route path='/billing...' component={Billpage} />
      <Route path='/edit/:id' component={EditPage} exact />
    </HashRouter>
  );
};

export default App;
