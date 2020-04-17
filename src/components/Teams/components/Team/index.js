import React, { useContext } from 'react';
import { AppContext } from '../../../../store';
import { setCurrentTeam } from '../../../../store/current/actions';
import './index.scss';

export const Team = ({
    team,
    current = false,
}) => {
    const { dispatch } = useContext(AppContext);

    const onTeamSelect = id => {
        dispatch(setCurrentTeam(id));
    };

    return (
        <p className="Team">
            <img src={team.crestUrl} alt={`#${team.shortName}`} />

            <button
                type="button"
                className={`Team-link${current ? ' active' : ''}`}
                name={team.shortName}
                onClick={() => onTeamSelect(team.id)}
            >
                ${team.name}
            </button>
        </p>
    );
};
