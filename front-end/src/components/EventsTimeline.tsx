import * as React from 'react';
import Event from './Event';
import List, { ListWrapper } from './List';

const buildEvents = (event: string[]) => {
    const [type, id, time, note] = event;

    return (
        <Event note={note} id={id} type={type} time={time}/>);
};
const EventsTimeline: React.FunctionComponent<{ events: string[][] }> = (props) => {
    return (
        <ListWrapper
            direction="column"
            alignItems="stretch"
        >
            <List
                list={props.events}
                renderItem={buildEvents}
                emptyState={<p>Nothing special to notate 📝</p>}
            />
        </ListWrapper>
    );
};

export default EventsTimeline;