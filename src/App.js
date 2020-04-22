import React, { Profiler } from 'react';
import { AppStore } from './store';
import { Teams } from './components/Teams';
import { Statistics } from './components/Statistics';
import './App.scss';

export const App = () => {
    const callback = (id, state, actual) => state === 'mount' &&
        console.log(`Render time: ${actual}`);

    return (
        <Profiler id={'App'} onRender={callback}>
            <AppStore>
                <main className="PremierLeague">
                    <Teams />
                    <Statistics />
                </main>
            </AppStore>
        </Profiler>
    );
};
