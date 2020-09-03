import * as React from 'react';
import styled from 'styled-components';
import Icon, { IconProps } from './Icon';

const Label = styled.label`
    font-weight: 700;
    color: var(--text-label);
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 8px;
`;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    block?: boolean;
}

const InputContainer = styled.div<ContainerProps>`
    display: ${props => props.block ? 'block' : 'inline-block'};
    ${props => props.block && 'width: 100%;'}
    position: relative;
`;
const InputGroup = styled.div<ContainerProps>`
    height: 48px;
    background-color: var(--surface-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 8px 16px;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    iconLeft?: IconProps;
    block?: boolean;
}

const Input: React.FunctionComponent<InputProps> = (props) => {
    return (
        <InputContainer block={props.block}>
            <Label>{props.label}</Label>
            <InputGroup>
                {props.iconLeft && <Icon  {...props.iconLeft} />}
                <input
                    {...props}
                />
            </InputGroup>
        </InputContainer>
    );
};

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    iconLeft?: IconProps;
    block?: boolean;
}

export const Select: React.FunctionComponent<SelectProps> = (props) => {
    return (
        <InputContainer block={props.block}>
            {props.label ? <Label>{props.label}</Label> : null}
            <InputGroup>
                {props.iconLeft && <Icon  {...props.iconLeft} />}
                <select {...props}>
                    {props.children}
                </select>
            </InputGroup>
        </InputContainer>
    );
};
Input.defaultProps = {
    label: 'Default Label'
};

export default Input;
