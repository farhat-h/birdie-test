import { ActionType, REMOVE_RECIPIENT, SET_RECIPIENT } from '../actions';

const RECIPIENT_ID_STORAGE_KEY = 'RECIPIENT_ID_STORAGE_KEY';
interface InitialState {
    recipientId: string | null;
}
const initialState: InitialState = {
    recipientId: localStorage.getItem(RECIPIENT_ID_STORAGE_KEY)
};

export function rootReducer(oldState: InitialState = initialState, action: ActionType) {
    switch (action.type) {
        case SET_RECIPIENT: {
            localStorage.setItem(RECIPIENT_ID_STORAGE_KEY, action.recipientId);
            return { ...oldState, recipientId: action.recipientId };
        }
        case REMOVE_RECIPIENT: {
            localStorage.removeItem(RECIPIENT_ID_STORAGE_KEY);
            return { recipientId: null };
        }
        default: return oldState;
    }
}

export type RootState = ReturnType<typeof rootReducer>;