import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store';
import { Team } from './components/Team';
import { Loading } from '../Loading';
import { apiConnection } from '../../services/apiConnection';
import { addTeams } from '../../store/teams/actions';
import './index.scss';

export const Teams = () => {
    const [status, setStatus] = useState('idle');
    const { state: { teams }, dispatch } = useContext(AppContext);

    useEffect(() => {
        // Do nothing when request is in progress or teams already stored
        if (teams || status === 'loading') {
            return;
        }

        setStatus('loading');

        apiConnection('competitions/2021/teams').then(r => {
            dispatch(addTeams(r.teams));
            setStatus('success');
        });
    }, [teams, status, dispatch]);

    return (
        <section className="Teams app-panel">
            <h2>Teams</h2>

            {(status === 'loading') &&
            <Loading message="Loading Teams..." />}

            {teams && (
                <div className="Team__list">
                    {teams.map(team => (
                        <Team key={team.id} team={team} />
                    ))}
                </div>
            )}
        </section>
    );
};
