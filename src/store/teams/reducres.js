import { ADD_TEAM_STATS, ADD_TEAMS } from './actions';

export const teamsReducer = (state = [], action) => {
    switch (action.type) {
    case ADD_TEAMS:
        return [...state, ...action.teams];



    case ADD_TEAM_STATS:
        const newState = [...state];
        let found = newState.find(team => team.id === action.id);
        if (found) {
            found['stats'] = action.stats;
        }
        return newState;

    default:
        return state;
    }
};
