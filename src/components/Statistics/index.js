import React, { useContext, useEffect, useState } from 'react';
import { Loading } from '../Loading';
import { apiConnection } from '../../services/apiConnection';
import { addTeamStats } from '../../store/teams/actions';
import { AppContext } from '../../store';
import './index.scss';

export const Statistics = () => {
    const [status, setStatus] = useState('idle');
    const { state, dispatch } = useContext(AppContext);

    const current = state.current;
    const teams = state.teams;

    const foundTeam = teams && current &&
        teams.find(team => team.id === current);

    useEffect(() => {
        if (!current
            || status === 'loading'
            || (foundTeam && 'stats' in foundTeam)) {
            return;
        }

        if (!teams) {
            setStatus('loading');
            return;
        }

        setStatus('loading');

        apiConnection(`teams/${current}/matches?status=FINISHED`)
            .then(r => {
                    dispatch(addTeamStats(r.matches, current));
                    setStatus('idle');
                },
            );

    }, [current, foundTeam, status, teams]);

    return (
        <section className="Statistics app-panel">
            <h2>Statistics {teams && foundTeam && 'stats' in
            foundTeam && `for ${foundTeam.name}`}</h2>

            {!teams &&
            <Loading message={'Waiting for teams load'} />}

            {status === 'loading' &&
            <Loading message={`Downloading ${foundTeam.name} data`} />}

            {teams && (
                !current
                    ? <p><i>Please select team to display information</i></p>
                    : foundTeam && 'stats' in foundTeam && (
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
                )
            )}
        </section>
    );
};
