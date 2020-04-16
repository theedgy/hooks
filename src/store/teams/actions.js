import { Actions } from '../index';

export const addTeamStats = (stats, id) => ({
    type: Actions.ADD_TEAM_STATS,
    stats,
    id
});

export const addTeams = teams => ({
    type: Actions.ADD_TEAMS,
    teams,
});
