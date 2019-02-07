import React, { Component } from 'react';
import { Nav, NavItem, Navbar, NavbarBrand, NavLink } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {

  render() {
      var awardType = "Week";
    // NavItems on Navbar depends on current pathname
    const path = this.props.location.pathname;
    let item;
    if(path === "/" || path === "/login")
      item = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            {/* Update to="" for the sign up component when it is created */}
            <NavLink tag={Link} to="/"><h5>Sign Up</h5></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/login"><h5>Sign In</h5></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/userHomePage"><h5>User</h5></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/admin"><h5>Admin</h5></NavLink>
          </NavItem>
        </Nav>);
    else if(path === "/admin" || path === "/adminDash" || path === "/addAdmin" || path === "/createUser")
      item = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/adminDash"><h5>Dashboard</h5></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/"><h5>Logout</h5></NavLink>
          </NavItem>
        </Nav>
      );
    else if(path === "/userHomePage" || path === "/updateUserInfo" || path === "/designAward")
      item = (
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink tag={Link} to="/designAward">
                    <button>New Employee Award</button>
                </NavLink>
            </NavItem>
          <NavItem>
          {/* TODO: update so profile links to correct page */}
            <NavLink tag={Link} to="/userHomePage"><h5>Profile</h5></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/"><h5>Logout</h5></NavLink>
          </NavItem>
        </Nav>
      );

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