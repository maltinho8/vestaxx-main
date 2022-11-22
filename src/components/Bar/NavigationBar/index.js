import React from "react";
import styled from "styled-components";
import Burger from "../Burger";
import { NavLink as Link } from "react-router-dom";


const Nav = styled.nav`
  background: #f2ecd4;
  height: 130px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  z-index: 10;

  @media screen and (max-width: 768px) {
    margin-bottom: 0rem;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
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
  margin-left: 5rem;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    margin-left: 4rem;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 60px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled.button`
  border-radius: 4px;

  padding: 10px 22px;
  color: white;
  border: 1px solid orange;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    border: 2px solid darkorange;
    opacity: 1;
    background-color: transparent;
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
          <NavBtnLink>
            <a
              href="https://www.vestaxx.de/#kontakt"
              target="_blank"
              rel="noreferrer"
              style={{

                textDecoration: "none",
                color: "orange",
                fontWeight: "bold",

              }}
            >
              Kontakt
            </a>
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavBar;
