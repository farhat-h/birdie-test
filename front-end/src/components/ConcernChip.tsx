import * as React from 'react';
import styled from 'styled-components';

const concernTextColor = {
    ok: '#65DA63',
    warn: '#FFB55E',
    danger: '#FF5555'
};
const typeToLevel = {
    regular_medication_not_taken: 'danger',
    concern_raised: 'warn',
    no_medication_observation_received: 'danger',
    visit_cancelled: 'warn',
    alert_raised: 'danger'
};
const concernBackgroundColor = {
    danger: 'rgba(255, 85, 85, 0.2)',
    warn: 'rgba(255, 181, 94, 0.2)',
    ok: 'rgba(101, 218, 99, 0.2)'
};

interface HighlightItemContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    level: string;
}

const HighlightItemContainer = styled.div<HighlightItemContainerProps>`
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    font-size: .925rem;
    text-transform: capitalize;
    border-radius: 20px;
    background-color: ${props => concernBackgroundColor[props.level]};
    color: ${props => concernTextColor[props.level]};
    & .dot {
        width: 10px;
        height: 10px;
        border-radius: 10px;
        display: inline-block;
        margin-right: 4px;
        background-color: ${props => concernTextColor[props.level]} 
    }
    & .count {
        font-weight: bold;
    }
`;
const ConcernChip: React.FunctionComponent<{ level?: string, eventType?: string, count?: number }> = (props) => {
    return (
        <HighlightItemContainer level={props.eventType ? typeToLevel[props.eventType] : props.level}>
            <span className={'dot'}/>
            {props.count && props.count > 1 ? <span className={'count'}>{`${props.count}X`}</span> : null}
            {props.children}
        </HighlightItemContainer>
    );
};

export default ConcernChip;
