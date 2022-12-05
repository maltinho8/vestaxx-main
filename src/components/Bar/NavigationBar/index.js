import React from 'react';
import styled from 'styled-components';
import Burger from '../Burger';
import { NavLink as Link } from 'react-router-dom';
import { Button } from '../../Button/Button.js';

const Nav = styled.nav`
  background: #f2ecd4;
  height: 130px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  padding-right: 10rem;
  padding-left: 10rem;
  border-bottom: 1px solid white;
  @media screen and (max-width: 768px) {
    margin-bottom: 0rem;
  }
`;

const NavLink = styled(Link)`
  color: darkorange;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  font-weight: bold;
  &.active {
    font-weight: bold;
  }
`;

const NavMenu = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LogoHeadline = styled.h4`
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const A = styled.a`
  color: white;
  &.hover {
    color: darkorange;
  }
`;

const NavBar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/LandingPage">
          <LogoHeadline>vestaxx</LogoHeadline>
        </NavLink>
        <Burger />
        <NavMenu>
          <NavLink to="/Modellierung">Heizkostenvergleich</NavLink>
        </NavMenu>
        <NavBtn>
          <Button>
            <A
              href="https://www.vestaxx.de/#kontakt"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
              }}
            >
              Kontakt
            </A>
          </Button>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavBar;
