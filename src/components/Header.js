import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header(props) {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      console.log('Logging out');
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const nav = () => {
    if (currentUser) {
      return (
        <Nav>
          <Navbar.Text>{currentUser.email}</Navbar.Text>
          &nbsp; &nbsp;
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link onClick={handleLogout}>
            Log Out
            </Nav.Link>
        </Nav>
      )
    } else {
      return (
        <Nav>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      )
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
      <Navbar.Brand href="/">Lion Circuits</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        {nav()}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;