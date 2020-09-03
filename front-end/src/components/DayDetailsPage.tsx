import { RootState } from '@App/store/reducers';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get } from '../helpers/http';
import { filterArrayByKey, uniqueValues } from '../helpers';
import Page from './Page';
import List, { ListWrapper } from '@App/components/List';
import Event from '@App/components/Event';
import { Card } from './SummaryCard';
import { Select } from '@App/components/Input';

interface EventProps {
    type: string;
    time: string;
    note: string;
    id: string;
}

const buildEvents = (event: EventProps) => {
    return <Event type={event.type} time={event.time} note={event.note} id={event.id}/>;
};
const buildFilterOption = (item: EventProps) => <option value={item.type}>{item.type}</option>;

const DayDetailsPage: React.FunctionComponent<{ recipientId?: string }> = (props) => {

    const [state, setState] = React.useState({loading: true, events: [], eventsDisplay: []});
    const {date} = useParams();

    React.useEffect(() => {
        get(`/api/timeline/${props.recipientId}/${date}`)
            .then(res => {
                if (!res.error) {
                    setState({loading: false, events: res.data, eventsDisplay: res.data});
                }
            });
        // tslint:disable-next-line: align
    }, []);

    const filters = uniqueValues(state.events, 'type');
    const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        if (value !== 'DEFAULT') {
            setState({...state, eventsDisplay: filterArrayByKey(state.events, 'type', value)});
        } else {
            setState({...state, eventsDisplay: state.events});
        }
    };
    return (
        <Page>
            <Link to={'/daily'}>Go back</Link>
            <h2>EVENTS TIMELINE {date}</h2>
            <hr/>
            <Select
                onChange={onFilterChange}
                block={true}
                label="Type filter"
            >
                <option value="DEFAULT">ALL TYPES</option>
                <List list={filters} renderItem={buildFilterOption}/>
            </Select>
            <Card style={{display: 'unset'}}>
                <ListWrapper alignItems="stretch" direction="column">
                    <List
                        list={state.eventsDisplay}
                        renderItem={buildEvents}
                        emptyState={state.loading ? <p>Loading... ⌛</p> : <p>No events to show today 😔</p>}
                    />
                </ListWrapper>
            </Card>
        </Page>
    );
};

const mapStateToProps = (state: RootState) => ({recipientId: state.recipientId});

export default connect(mapStateToProps, null)(DayDetailsPage);