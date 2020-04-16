import React, {useContext, useEffect, useState} from 'react';
import {apiConnection} from '../../services/apiConnection';
import {addTeamStats} from '../../store/teams/actions';
import {Loading} from '../Loading';
import {AppContext} from "../../store";

import './index.scss';

export const Statistics = () => {
    const [status, setStatus] = useState('idle');
    const {state, dispatch} = useContext(AppContext);
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
            .then(r => r.json())
            .then(r => {
                    if (!!dispatch) {
                        dispatch(addTeamStats(r.matches, current));
                        setStatus('idle');
                    }
                },
            ).catch(error => setStatus(`${error}`));

    }, [teams, current, foundTeam]);

    return (
        <div className="Statistics app-panel">
            <h2>Statistics {!!teams?.length && foundTeam && 'stats' in
            foundTeam && `for ${foundTeam.name}`}</h2>

            {teams?.length === 0 &&
            <Loading message={'Waiting for teams load'} />}

            {status === 'loading' &&
            <Loading message={`Downloading ${foundTeam?.name} data`} />}

            {
                !current && !!teams?.length && (
                    <p><i>Please select team to display information</i></p>
                )}

            {
                !!teams?.length && foundTeam && 'stats' in foundTeam && (
                    <table className="Statistics__list">
                        <tbody>

                        {
                            foundTeam?.stats?.map(stat => {
                                return (
                                    <tr key={stat.id} className="draw">
                                        <td>({stat.competition.name})</td>
                                        <td>{stat.homeTeam.name} {stat.score.fullTime.homeTeam} - {stat.score.fullTime.awayTeam} {stat.awayTeam.name}</td>
                                    </tr>);
                            })
                        }
                        </tbody>
                    </table>
                )
            }
        </div>
    );
};
