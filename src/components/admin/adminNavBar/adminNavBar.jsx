import React,{useContext} from 'react'
import { Container, DropdownButton, Nav, Navbar, Dropdown } from 'react-bootstrap';
// import { AuthContext, FirebaseContext } from '../../store/Context';



function Navb() {
  
  return (
    <div>
    <Navbar bg="secondary" variant="dark" fixed='top'>
      <Container>
      <img className='img' src={require('./R.png')}></img>
        <Navbar.Brand href="/" className='mt-2'><h6>NFC-ADMIN</h6></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/account">account</Nav.Link>
            <Nav.Link href="/ticket">Ticket</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        

            
           


      
      </Container>
    </Navbar>
    </div>
  )
}

export default Navb;
