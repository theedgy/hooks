import { Actions } from '../index';

export const currentReducer = (state = 0, action) => {
    switch (action.type) {
        case Actions.SET_CURRENT_TEAM:
            return action.teamId;

        default:
            return state;
    }
};
