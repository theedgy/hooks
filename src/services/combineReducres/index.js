export function combineReducers(reducerDict) {
    return function(state, action) {
        return Object.keys(reducerDict).reduce((acc, curr) => {
            let slice = reducerDict[curr](state[curr], action);
            return { ...acc, [curr]: slice };
        }, state);
    };
}
