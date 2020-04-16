import { Actions } from '../index';

export const setCurrentTeam = teamId => ({
    type: Actions.SET_CURRENT_TEAM,
    teamId,
});
