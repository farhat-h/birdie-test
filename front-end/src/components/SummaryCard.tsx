import * as React from 'react';
import styled from 'styled-components';
import List, { ListWrapper } from '@App/components/List';
import ConcernChip from '@App/components/ConcernChip';
import Button from '@App/components/Button';
import { countMap, sortHighlights } from '@App/helpers';
import EventsTimeline from '@App/components/EventsTimeline';
import { useHistory } from 'react-router-dom';

export interface SummaryCardProps {
    formatted_date: string;
    concerns?: string[][];
    highlights?: string[][];
}

export const Card = styled.div`
    box-shadow: var(--card-shadow);
    padding: 16px 32px;
    margin: 8px 0;
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    display: grid; 
    grid-template-columns: auto 1fr;
    column-gap: 10px;
    row-gap: 12px;
    
    .highlight-title{
        color: var(--text-primary);
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: 8px;
        text-transform: capitalize !important; 
    }
    .highlight-note {
        font-size: .975rem;
        margin-bottom: 16px;
    }
    & h5, & p {
        margin: 0;
    }
    & .fullWidth, hr{
        grid-column: 1/-1;
    }
`;

const buildConcerns = (numbers: { [key: string]: number }, concernType: string, index: number) => {
    return (
        <ConcernChip key={index} eventType={concernType} count={numbers[concernType]}>
            {concernType}
        </ConcernChip>
    );
};

const SummaryCard: React.FunctionComponent<SummaryCardProps> = (props) => {
    const sortedHighlights = React.useMemo(() => sortHighlights(props.highlights), []);
    const concerns = React.useMemo(() => countMap(props.concerns, '0'), []);
    const history = useHistory();
    return (
        <>
            <p style={{fontWeight: 'bold', fontSize: '1.2rem'}}>{props.formatted_date}</p>
            <Card>
                <p>Concerns</p>
                <ListWrapper wrap={true}>
                    <List
                        list={Object.keys(concerns)}
                        renderItem={buildConcerns.bind(SummaryCard, concerns)}
                        emptyState={<ConcernChip level={'ok'}>Everything is okay overall 👍</ConcernChip>}
                    />
                </ListWrapper>
                <hr/>
                <p>Highlights</p>
                <EventsTimeline events={sortedHighlights}/>
                <Button
                    onClick={() => history.push('/daily/' + props.formatted_date)}
                    className={'fullWidth'}
                    block={true}
                    link={true}
                >
                    See more
                </Button>
            </Card>
        </>
    );
};
SummaryCard.defaultProps = {
    formatted_date: '24 Oct 10023'
};
export default SummaryCard;