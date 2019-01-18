import React, { Component } from 'react';
import { Nav, NavItem, Navbar, NavbarBrand, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <Navbar color="light" light expand="md">
        <NavbarBrand><h1>Ogma Employee Recognition</h1></NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/admin"><h1>Admin</h1></NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;