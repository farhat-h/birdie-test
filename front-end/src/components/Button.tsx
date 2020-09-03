import styled from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    block?: boolean;
    link?: boolean;
}
const Button = styled.button<ButtonProps>`
    background-color: ${props => props.link ? 'transparent' : 'var(--birdie-accent)'};
    color: ${props => props.link ? 'var(--text-link)' : '#fff'};
    text-transform: uppercase;
    font-weight: bold;
    font-family: 'Roboto Condensed';
    padding: 8px 16px;
    outline: none; 
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    ${props => props.block && 'display: block;'}
    ${props => props.block && 'width: 100%;'}
    cursor: pointer;
    user-select: none;
    &:hover {
        background-color: ${props => props.link ? 'rgba(72, 189, 255, 0.2)' : '#01B8B0'};
    }
    &:disabled {
        background-color: gray;
        cursor: default;
        &:hover {
            background-color: gray;
        }
    }
`;

export default Button;