import * as React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import { formatEventNote, formatEventType, isoDateToString } from '@App/helpers';

export interface EventProps {
    type: string;
    time: string;
    note: string;
    id: string;
    caregiver_id?: string;
}

const EventContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto
    grid-auto-flow: dense;
    row-gap: 10px;
    border-left: 1px solid #e8e8e8;
    padding: 8px 16px;
    position: relative;

    & p {
        margin: 0;
    }
    & .title {
       color: var(--text-primary);
        font-size: 1.2rem;
    }

    & .time {
        font-weight: bold;
        font-size: .975rem;
    }
    & .note {
        width: 90%;
        grid-column: 1/-1;
        font-size: .95rem;
    }
    & .material-icons {
        position: absolute;
        left: 0;
        top: .6rem;
        background-color: #fff;
        transform: translateX(-50%);
    } 
`;

const IconColors = {
    general_observation: '#4CAF50',
    food_intake_observation: '#E91E63',
    fluid_intake_observation: '#9C27B0',
    task_completed: '#673AB7',
    physical_health_observation: '#3F51B5',
    visit_completed: '#2196F3',
    check_out: '#03A9F4',
    mood_observation: '#00BCD4',
    regular_medication_taken: '#009688',
    alert_raised: '#f44336',
    no_medication_observation_received: '#FF5722',
    incontinence_pad_observation: '#CDDC39',
    check_in: '#FFEB3B',
    regular_medication_not_taken: '#FFC107',
    mental_health_observation: '#FF9800',
    medication_schedule_updated: '#8BC34A',
    visit_cancelled: '#f44336',
    regular_medication_maybe_taken: '#2196F3',
    catheter_observation: '#9C27B0',
    concern_raised: '#673AB7',
    medication_schedule_created: '#3F51B5',
    alert_qualified: '#E91E63',
    task_schedule_created: '#03A9F4',
    regular_medication_partially_taken: '#00BCD4',
    task_completion_reverted: '#009688',
    toilet_visit_recorded: '#4CAF50',
    default: '#8BC34A'
};
export const EventIcons = {
    general_observation: 'visibility',
    food_intake_observation: 'fastfood',
    fluid_intake_observation: 'local_cafe',
    task_completed: 'check_circle',
    physical_health_observation: 'favorite',
    visit_completed: 'tour',
    check_out: 'outbond',
    mood_observation: 'emoji_emotions',
    regular_medication_taken: 'local_pharmacy',
    alert_raised: 'notification_important',
    no_medication_observation_received: 'local_pharmacy',
    incontinence_pad_observation: 'opacity',
    check_in: 'login',
    regular_medication_not_taken: 'local_pharmacy',
    mental_health_observation: 'psychology',
    medication_schedule_updated: 'update',
    visit_cancelled: 'cancel',
    regular_medication_maybe_taken: 'local_pharmacy',
    catheter_observation: 'opacity',
    concern_raised: 'notification_important',
    medication_schedule_created: 'event_available',
    alert_qualified: 'notification_important',
    task_schedule_created: 'event_available',
    regular_medication_partially_taken: 'local_pharmacy',
    task_completion_reverted: 'settings_backup_restore',
    toilet_visit_recorded: 'airline_seat_legroom_reduced',
    default: 'check_box_outline_blank'
};
const Event: React.FunctionComponent<EventProps> = (props) => {
    const formattedDate = React.useMemo(() => isoDateToString(props.time), []);
    return (
        <EventContainer id={props.id}>
            <Icon color={IconColors[props.type || 'default']} name={EventIcons[props.type || 'default']}/>
            <p className="title">{formatEventType(props.type)}</p>
            <p className="time">{formattedDate}</p>
            {props.caregiver_id ? <p>Caregiver: {props.caregiver_id}</p> : null}
            <p className="note">
                {formatEventNote(props.note)}
            </p>
        </EventContainer>
    );
};

export default Event;