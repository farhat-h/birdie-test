import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Tab = styled(NavLink)`
    font-family: 'Roboto Condensed';
    font-weight: bold;
    &.active: {
        color var(--birdie-accent);
    }
`;

const Tabs = styled.div`
    display: flex;
    width: 100%;
    height: 56px;
    border-radius: 8px;
    align-items: center;
    background-color: var(--surface-color);
    padding: 8px 16px;
    flex-direction: row;
    justify-content: space-between;
`;

export default Tabs;