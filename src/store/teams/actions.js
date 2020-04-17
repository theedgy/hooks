export const ADD_TEAM_STATS = 'ADD_TEAM_STATS';
export const ADD_TEAMS = 'ADD_TEAMS';

export const addTeamStats = (stats, id) => ({
    type: ADD_TEAM_STATS,
    stats,
    id,
});

export const addTeams = teams => ({
    type: ADD_TEAMS,
    teams,
});
