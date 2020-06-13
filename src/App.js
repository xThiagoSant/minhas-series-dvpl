import React, {useState} from 'react';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap'


function App() {
  const [colapsed, setColapsed] = useState(false)
  const toggleColapsed = () => setColapsed(!colapsed)
  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarBrand>Minhas Séries</NavbarBrand>
        <NavbarToggler onClick={toggleColapsed}/>
        <Collapse isOpen={colapsed} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink href='/'>Gêneros</NavLink>
            </NavItem>
          </Nav>
        </Collapse> 
      </Navbar>
    </div>
  );
}

export default App;
// esse app vai usar bootstrap: yarn add bootstrap
// e para as interações com ele vamos adicionar um modulo chamada reacstrap: yarn add reactstrap
// sempre que não existe a pasta node_modules: yarn ou npm install