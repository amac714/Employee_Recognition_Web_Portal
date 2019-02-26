/*
 * Description: Navigation Bar component
 */

import React, { Component } from 'react';
import { Nav, NavItem, Navbar, NavbarBrand, NavLink, Container } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  logout = e => {
    e.preventDefault();
    localStorage.removeItem('access_token');
    this.props.history.push('/');
  };

  render() {
    var awardType = 'Week';
    // NavItems on Navbar changes based on pathname
    const path = this.props.location.pathname;
    let item;
    if (path === '/')
      item = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/admin">
              <span className="header--link">Admin</span>
            </NavLink>
          </NavItem>
        </Nav>
      );
    else if (
      path === '/adminDash' ||
      path === '/addAdmin' ||
      path === '/createUser' ||
      path === '/editUser'
    )
      item = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/adminDash">
              <span className="header--link">Dashboard</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="" onClick={this.logout}><span className="header--link">Logout</span></NavLink>
          </NavItem>
        </Nav>
      );
    else if (
      path === '/userHomePage' ||
      path === '/updateUserInfo' ||
      path === '/designAward'
    )
      item = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/userHomePage">
              <span className="header--link">Profile</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="" onClick={this.logout}>
              <span className="header--link">Logout</span>
            </NavLink>
          </NavItem>
        </Nav>
      );

    return (
      <div className="header">
        <Container>
          <Navbar light expand="md">
            <NavbarBrand>
              <h1 className="header__title">Ogma Employee Recognition</h1>
            </NavbarBrand>
            {item}
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default withRouter(Header);
