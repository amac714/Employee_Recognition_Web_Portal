import React, { Component } from 'react';
import { Nav, NavItem, Navbar, NavbarBrand, NavLink } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {

  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('access_token');
    this.props.history.push('/');
  }

  render() {
      var awardType = "Week";
    // NavItems on Navbar depends on current pathname
    const path = this.props.location.pathname;
    let item;
    if(path === "/")
      item = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/admin"><h5>Admin</h5></NavLink>
          </NavItem>
        </Nav>);
    else if(path === "/adminDash" || path === "/addAdmin" || path === "/createUser")
      item = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/adminDash"><h5>Dashboard</h5></NavLink>
          </NavItem>
          <NavItem>
            <button onClick={this.logout}>Logout</button>
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