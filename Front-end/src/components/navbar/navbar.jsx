import React from 'react'
import picture from '../../../public/pageFont.png';

import { Button, Nav, Navbar } from 'react-bootstrap';

const navbar = () => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Sign In</Nav.Link>
          <Nav.Link href="#features">Sign Up</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default navbar