import React, { useContext, useEffect, useState } from 'react';
import { apiConnection } from '../../services/apiConnection';
import { addTeamStats } from '../../store/teams/actions';
import { Loading } from '../Loading';
import { AppContext } from '../../store';

import './index.scss';

export const Statistics = () => {
    const [status, setStatus] = useState('idle');
    const { state, dispatch } = useContext(AppContext);
    let foundTeam = null;

    const current = state?.current;
    const teams = state?.teams;

    const found = (!!teams?.length && current) &&
        teams.find(team => team.id === current);

    if (found) {
        foundTeam = found;
    }

    useEffect(() => {
        if (!current) {
            return;
        }

        if (!teams) {
            setStatus('loading');
            return;
        }

        if (!!teams.length && foundTeam && 'stats' in foundTeam) {
            return;
        }

        setStatus('loading');

        apiConnection(`teams/${current}/matches?status=FINISHED`)
            .then(r => {
                    dispatch(addTeamStats(r.matches, current));
                    setStatus('idle');
                },
            );

    }, [teams, current, foundTeam, dispatch]);

    return (
        <section className="Statistics app-panel">
            <h2>Statistics {!!teams?.length && foundTeam && 'stats' in
            foundTeam && `for ${foundTeam.name}`}</h2>

            {!!teams?.length &&
            <Loading message={'Waiting for teams load'} />}

            {status === 'loading' &&
            <Loading message={`Downloading ${foundTeam?.name} data`} />}

            {!current && !!teams?.length && (
                <p><i>Please select team to display information</i></p>
            )}

            {!!teams.length && foundTeam && 'stats' in foundTeam && (
                <table className="Statistics__list">
                    <tbody>
                    {foundTeam.stats.map(match => (
                        <tr key={match.id}>
                            <td>({match.competition.name})</td>
                            <td>{match.homeTeam.name} {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam} {match.awayTeam.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};
