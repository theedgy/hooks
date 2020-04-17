export const SET_CURRENT_TEAM = 'SET_CURRENT_TEAM';

export const setCurrentTeam = teamId => ({
    type: SET_CURRENT_TEAM,
    teamId,
});
