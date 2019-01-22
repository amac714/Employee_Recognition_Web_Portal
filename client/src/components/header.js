import React, { Component } from 'react';
import { Nav, NavItem, Navbar, NavbarBrand, NavLink } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {

  render() {
    const path = this.props.location.pathname;
    let item;
    if(path === "/")
      item = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            {/* Update to="" for the sign up component when it is created */}
            <NavLink tag={Link} to="/"><h5>Sign Up</h5></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/user"><h5>Sign In</h5></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/admin"><h5>Admin</h5></NavLink>
          </NavItem>
        </Nav>)
    else if(path === "/admin" || path === "/user")
      item = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/"><h5>Logout</h5></NavLink>
          </NavItem>
        </Nav>
      )

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand><h5>Ogma Employee Recognition</h5></NavbarBrand>
          {item}
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);