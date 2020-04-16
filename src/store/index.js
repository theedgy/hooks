import React, { useReducer } from 'react';

import { combineReducers } from '../services/combineReducres';
import { teamsReducer } from './teams/reducres';
import { currentReducer } from './current/reducres';

export const Actions = {
    ADD_TEAM_STATS: 'ADD_TEAM_STATS',
    ADD_TEAMS: 'ADD_TEAMS',
    SET_CURRENT_TEAM: 'SET_CURRENT_TEAM',
};

export const AppContext = React.createContext({});

export const AppStore= ({ children }) => {
    const [state, dispatch] = useReducer(combineReducers({
        teams: teamsReducer,
        current: currentReducer,
    }), {});

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
