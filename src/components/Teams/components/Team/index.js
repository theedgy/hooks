import React, { useContext } from 'react';
import { AppContext } from '../../../../store';
import { setCurrentTeam } from '../../../../store/current/actions';
import './index.scss';

export const Team = ({team}) => {

    const { state: {current}, dispatch } = useContext(AppContext);

    return (
        <p className="Team">
            <img src={team.crestUrl}
                 alt={team.shortName} />

            <button
                type="button"
                className={`Team-link${current === team.id ? ' active' : ''}`}
                name={team.shortName}
                onClick={() => dispatch(setCurrentTeam(team.id))}
            >
                {team.name}
            </button>
        </p>
    );
};
