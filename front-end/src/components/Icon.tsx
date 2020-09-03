import * as React from 'react';
export interface IconProps {
    name: string;
    color?: string;
    size?: number;
}
const Icon: React.FunctionComponent<IconProps> = ({ name, size, color }) => {
    return <i className="material-icons" style={{ fontSize: size, color }}>{name}</i>;
};
Icon.defaultProps = {

    size: 18,
    color: 'var(--text-primary)'
};
export default Icon;
