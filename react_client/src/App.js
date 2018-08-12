import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import HomePage from './HomePage/HomePage'
import Search from './SearchPage/Search'
import AddCredit from './AddCreditPage/AddCredit'
import MoreInfo from './MoreInfoPage/MoreInfo'
import AddHouse from './AddHousePage/AddHouse'
import Register from './RegisterPage/Register'
import Login from './LoginPage/Login';

const App = () =>
  <Router>
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/search/:areaLimit/:maxPrice/:dealType/:buildingType" component={Search}/>
      <Route exact path="/addCredit" component={AddCredit}/>
      <Route exact path="/moreInfo/:houseId/:serverNum" component={MoreInfo}/>
      <Route exact path="/AddHouse" component={AddHouse}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </div>
  </Router>

export default App