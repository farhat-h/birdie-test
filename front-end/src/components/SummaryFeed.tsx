import { RootState } from '@App/store/reducers';
import * as React from 'react';
import { connect } from 'react-redux';
import { get } from '../helpers/http';
import List from './List';
import SummaryCard, { SummaryCardProps } from './SummaryCard';

const buildEventCard = (event: SummaryCardProps) => <SummaryCard {...event} />;
const SummaryFeed: React.FunctionComponent<{ recipientId?: string }>
    = (props) => {
    const [events, setEvents] = React.useState([]);
    React.useEffect(() => {
        get('/api/timeline/' + props.recipientId)
            .then(res => {
                if (!res.error) {
                    setEvents(res.data);
                }
            });
        // tslint:disable-next-line: align
    }, []);

    return (
        <List
            list={events}
            renderItem={buildEventCard}
            emptyState={<p>Loading...⌛</p>}
        />
    );
};

const mapStateToProps = (state: RootState) => ({recipientId: state.recipientId});

export default connect(mapStateToProps, null)(SummaryFeed);