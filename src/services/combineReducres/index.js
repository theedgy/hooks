export const combineReducers = (reducerDict) =>
    (state, action) => Object.keys(reducerDict)
        .reduce((acc, curr) => ({
            ...acc, [curr]: reducerDict[curr](state[curr], action),
        }), state);
