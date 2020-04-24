import React, { useContext, useEffect, useState } from 'react';
import { Loading } from '../Loading';
import { apiConnection } from '../../services/apiConnection';
import { addTeamStats } from '../../store/teams/actions';
import { AppContext } from '../../store';
import './index.scss';

export const Statistics = () => {
    const [status, setStatus] = useState('idle');
    const [currentTeam, setCurrentTeam] = useState(null);
    const { state, dispatch } = useContext(AppContext);

    const current = state.current;
    const teams = state.teams;

    useEffect(() => {
        const found = teams && current &&
            teams.find(team => team.id === current);

        if (found && found !== currentTeam) {
            setCurrentTeam(found);
        }
    }, [current, currentTeam, teams]);

    useEffect(() => {
        if (!current
            || status === 'loading'
            || (currentTeam && 'stats' in currentTeam)) {
            return;
        }

        setStatus('loading');

        apiConnection(`teams/${current}/matches?status=FINISHED`)
            .then(r => {
                    dispatch(addTeamStats(r.matches, current));
                    setStatus('idle');
                },
            );

    }, [current, currentTeam, dispatch, status, teams]);

    return (
        <section className="Statistics app-panel">
            <h2>Statistics</h2>

            {!teams &&
            <Loading message={'Waiting for teams load'} />}

            {status === 'loading' &&
            <Loading message={`Downloading ${currentTeam.name} data`} />}

            {teams && (
                !current
                    ? <p><i>Please select team to display information</i></p>
                    : <table className="Statistics__list">
                        <tbody>
                        {currentTeam.stats.map(match => (
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
