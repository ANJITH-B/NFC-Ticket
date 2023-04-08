import React, { useContext } from 'react'
import { Container, DropdownButton, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import './navBar.css';

function NavB() {
  const { history } = useHistory()
  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)

  return (
    <div>
      <Navbar bg="secondary" variant="dark" fixed='top'>
        <Container>
          <img className='img' src={require('./R.png')}></img>
          <Navbar.Brand href="/" className='mt-2'><h6>NFC-TICKET</h6></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/account">account</Nav.Link>
              <Nav.Link href="/ticket">Ticket</Nav.Link>
            </Nav>
          </Navbar.Collapse>



          <DropdownButton
            id="dropdown-button-dark-example2"
            variant="secondary"
            menuVariant="dark"
            title={user ? user.displayName : <span href='/login'>login </span>}
            className="mr-4"
          >
            <span>{user ?
              <Dropdown.Item href="/signUp">recharge</Dropdown.Item> :
              <Dropdown.Item href="/login">login</Dropdown.Item>
            }</span>

            <span>{user ?
              <Dropdown.Item href="/signUp">profile</Dropdown.Item> :
              <Dropdown.Item href="/signUp">signUp</Dropdown.Item>
            }</span>


            <Dropdown.Divider />
            <Dropdown.Item >
              {user && <span onClick={() => {
                firebase.auth().signOut();
                history.push('/login')
              }}>logOut</span>}
            </Dropdown.Item>
          </DropdownButton>
          <img className='img' src={require('./profile_image.png')} ></img>
          <Navbar.Brand href="/"></Navbar.Brand>



        </Container>
      </Navbar>
    </div>
  )
}

export default NavB;
