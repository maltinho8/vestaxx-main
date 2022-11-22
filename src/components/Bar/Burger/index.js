import React, { useState } from 'react';
import styled from 'styled-components';
import RightNav from '../RightNavigationBar';

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 50px;
  right: 20px;
  z-index: 99;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    curser: pointer;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? 'white' : 'white')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        {/* state = Zustand, [Status, Funktion, um den Status zu manipulieren] */}
        {/* useState - definiert den Grundzustand vom Status */}
        {/* Übergabe des Status - Funktion onClick, setOpen manipuliert den Status:
      ! - nur bei boolean, bedeutet das Gegenteil vom definierten Grundzustand */}
        <div />
        <div />
        <div />
      </StyledBurger>
      {open && <RightNav closeMenu={() => setOpen(false)} />}
      {/* if open => render die RightNavBar, durch das && gekennzeichnet */}
      {/* gleichzeitig Übergabe einer Methode, die das Menu wieder schließt - false (=geschlossen) */}
    </>
  );
};

export default Burger;
