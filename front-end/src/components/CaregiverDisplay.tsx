import * as React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const CaregiverDisplay = styled.p`
    margin: 0;
    padding: 8px;
    background-color: var(--surface-color);
    color: var(--text-primary);
    font-size: .968rem;
    border-radius: 6px;
`;

const Caregiver: React.FunctionComponent<{}> = ({ children }) => {
    return (
        <CaregiverDisplay>
            <Icon name="spa" />
            {children}
        </CaregiverDisplay>
    );
};
export default Caregiver;