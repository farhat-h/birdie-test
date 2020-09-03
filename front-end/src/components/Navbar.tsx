import styled from 'styled-components';
import * as React from 'react';

const logo = require('@App/assets/images/logo-birdie.svg');
const NavbarContainer = styled.nav`
    display: flex;
    padding: 16px 0px;
    margin-bottom: 16px;
    flex-direction: row;
    align-items: center;
    max-width: 100%;
    width: 900px;
    margin-left: auto; 
    margin-right: auto;
    & img {
        width: 100px;
    }
`;
const Navbar = () => {
    return (
        <NavbarContainer>
            <a href="https://birdie.care/">
                <img src={logo} alt="Birdie"/>
            </a>
        </NavbarContainer>
    );
};
export default Navbar;