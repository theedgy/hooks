import React, { useReducer } from 'react';
import { combineReducers } from '../services/combineReducres';
import { teamsReducer } from './teams/reducres';
import { currentReducer } from './current/reducres';

export const AppContext = React.createContext({});

export const AppStore = ({ children }) => {
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
