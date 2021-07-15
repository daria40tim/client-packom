import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../actions/userAction';
import logo from '../pic/logo.svg' 
import { Nav, Navbar,  } from 'react-bootstrap';



const  Header = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin 

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    
    window.location.reload()
    //dispatch(logout)
  }

  const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

  //render() {
    return( 
      <div className="navigator">
      <Navbar expand="lg" className="text-light navbar-fixed-top">
  <Navbar.Brand className="nav-link text-light"><h3>Packom</h3></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav nav-link" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto nav-link">
      <Nav.Link className="nav-link"> 
        <Link className="text-light" aria-current="page" to="/tech"><h5>Технические задания</h5></Link>
      </Nav.Link>
      <Nav.Link>
        <Link className="text-light" to='/commertial'><h5>Коммерческие предложения</h5></Link>
      </Nav.Link>
      <Nav.Link>
        <Link className="text-light" to="/tenders"><h5>Тендерные решения</h5></Link>
      </Nav.Link>
      <Nav.Link>
        <Link className="text-light " to='/orgs'><h5>Организации</h5></Link>
      </Nav.Link>
      <Nav.Link>
        <Link className="text-light " to={`/orgs/link/${user.o_id}`}><h5>Моя организация</h5></Link>
      </Nav.Link>
      <Nav.Link>
        <Link className="text-light" onClick={logoutHandler}><h5>Выйти</h5></Link>
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>
)
  }
//}

export default Header;
/*<div className="navigator">
    <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <a className="navbar-brand nav-link">  
      <h1>Packom</h1>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item m-1">
            <Link className="nav-link" aria-current="page" to="/tech"><h4>Технические задания</h4></Link>
          </li>
          <li className="nav-item m-1">
            <Link className="nav-link" to='/commertial'><h4>Коммерческие предложения</h4></Link>
          </li>
          <li className="nav-item m-1">
            <Link className="nav-link" to="/tenders"><h4>Тендерные решения</h4></Link>
          </li>
          <li className="nav-item m-1">
            <Link className="nav-link " to='/orgs'><h4>Организации</h4></Link>
          </li>
           <li className="nav-item m-1">
           <Link className="nav-link " to={`/orgs/link/${user.o_id}`}><h4>Моя организация</h4></Link>
         </li> 
  
           <li className="nav-item m-1">
           <Link className="nav-link" onClick={logoutHandler}><h4>Выйти</h4></Link>
         </li> 
        </ul>
      </div>
    </div>
  </nav>
  </div>*/