import './App.css';
import React, {Component} from 'react';
import Orgs from './components/Orgs'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.min.js'
import { BrowserRouter, Route } from "react-router-dom";
import Org from './components/Org'
import CP from './components/CP';
import Techs from './components/Techs';
import Tenders from './components/Tenders';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Tech from './components/Tech';
import CP_New from './components/CP_new';
import Tender from './components/Tender';
import Org_upd from './components/Org_upd';
import Tech_new from './components/Tech_new';
import Tech_upd from './components/Tech_upd';
import CP_One from './components/CP_one';
import CP_Upd from './components/CP_upd';

const  App = () => {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  const admin = localStorage.getItem('admin')

  return (
    <BrowserRouter>
    <div className="App">

     <Route path="/packom" component={ SignUp }/>
      {userInfo ?
      <div>
        <Header/>
          <Route exact path="/orgs"> 
            <Orgs/>
          </Route>
          <Route exact path="/commertial">
            
            <CP/>
          </Route>
          <Route exact path="/tech">
            
            <Techs/>
          </Route>
          <Route exact path="/tenders">
            
            <Tenders/>
          </Route>
          <Route exact path="/orgs/link/:o_id">
          
          <Org/>
            </Route>
            <Route exact path="/cps/link/:cp_id">
          
          <CP_One/>
            </Route>
            <Route exact path="/tenders/link/:tender_id">
          
          <Tender/>
            </Route>
            <Route exact path='/orgs/upd/:o_id'>
            
            <Org_upd/>
            </Route>
            <Route exact path="/techs/link/:tz_id">
          
          <Tech/>
            </Route>
            <Route exact path="/techs/create">
            
          <Tech_new/>
            </Route>
            <Route exact path="/cps/create/:tz_id">
            
          <CP_New/>
            </Route>
            <Route exact path="/techs/upd/:tz_id">
            
          <Tech_upd/>
            </Route>
            <Route exact path="/cps/upd/:cp_id">
            
          <CP_Upd/>
            </Route>
            </div>:
            <div>
        
          <Route path="/" component={ SignIn }/>
          </div>}
        </div>
      </BrowserRouter>
  );
}

export default App;
