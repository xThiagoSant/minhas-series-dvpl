import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler
  } from 'reactstrap'
  
  
  const Header = () =>{
    const [colapsed, setColapsed] = useState(false)
    const toggleColapsed = () => setColapsed(!colapsed)
  
    return(
      <Navbar color='light' light expand='md'>
        <NavbarBrand tag={Link} to='/'>Minhas Séries</NavbarBrand>
        <NavbarToggler onClick={toggleColapsed}/>
        <Collapse isOpen={colapsed} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/generos'>Gêneros</NavLink>
            </NavItem>
          </Nav>
        </Collapse> 
      </Navbar>    
    )
  }

  export default Header