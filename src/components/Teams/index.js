import React, {useContext, useEffect, useState} from 'react';
import {apiConnection} from '../../services/apiConnection';
import {Error} from '../Error';
import {Loading} from '../Loading';
import {AppContext} from "../../store";
import {Team} from "./components/Team";
import {addTeams} from "../../store/teams/actions";
import './index.scss';

const defaultStatus = 'idle';

export const Teams = () => {
    const [status, setStatus] = useState<string>(defaultStatus);

    const {state, dispatch} = useContext(AppContext);
    // Need that type of conditional for
    // typescript to stop yelling about
    // undefined context value possible
    const teams = state?.teams;
    const current = state?.current;

    useEffect(() => {
        // Return if data exists in store or is already requesting for it
        if ((teams && !!teams.length) || status === 'success') {
            return;
        }

        setStatus('loading');

        apiConnection('competitions/2021/teams')
            .then(response => {
                    if (!!response.errorCode) {
                        setStatus(`${response.errorCode} : ${response.message}`);
                        return;
                    }
                    if (!!dispatch) {
                        dispatch(addTeams(response.teams));
                        setStatus('success');
                    }
                },
            );
    }, [teams]);
    return (
        <section className="Teams app-panel">
            <h2>Teams</h2>

            {(status === 'loading') &&
            <Loading message="Loading Teams..." />}

            {!['idle', 'loading', 'success'].includes(status) && (
                <Error message={status} />
            )}

            <div className="Team__list">
                {!!teams?.length && teams.map(team => (
                    <Team key={team.id}
                          team={team}
                          current={current === team.id}
                    />
                ))}
            </div>
        </section>
    );
};
