import React from 'react';
import { Link} from 'react-router-dom';
import { Nav, Navbar,  } from 'react-bootstrap';

const  Header = () => {

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    
    window.location.reload()
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
        <Link className="text-light nav-link" aria-current="page" to="/tech"><h5>Технические задания</h5></Link>
        <Link className="text-light nav-link" to='/commertial'><h5>Коммерческие предложения</h5></Link>
        <Link className="text-light nav-link" to="/tenders"><h5>Тендерные решения</h5></Link>
        <Link className="text-light nav-link" to='/orgs'><h5>Организации</h5></Link>
        <Link className="text-light nav-link" to={`/orgs/link/${user.o_id}`}><h5>Моя организация</h5></Link>

      
        <button onClick={logoutHandler} className='btn text-light'><h5>Выйти</h5></button>

    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>
)
  }
export default Header;
