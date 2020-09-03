export const SET_RECIPIENT = 'SET_RECIPIENT';
export const REMOVE_RECIPIENT = 'REMOVE_RECIPIENT';

interface SetRecipientAction {
    type: typeof SET_RECIPIENT;
    recipientId: string;
}

interface RemoveRecipientAction {
    type: typeof REMOVE_RECIPIENT;
}

export type ActionType = RemoveRecipientAction | SetRecipientAction;

export function setRecipient(recipId: string): SetRecipientAction {
    return {
        type: SET_RECIPIENT,
        recipientId: recipId
    };
}

export function removeRecipient(recipId: string): RemoveRecipientAction {
    return {
        type: REMOVE_RECIPIENT
    };
}
