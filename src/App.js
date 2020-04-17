import React, { Profiler } from 'react';
import { AppStore } from './store';
import { Teams } from './components/Teams';
import { Statistics } from './components/Statistics';
import './App.scss';

export const App = () => {

    return (
        <AppStore>
            <main className="PremierLeague">
                    <Teams />
                    <Statistics />
            </main>
        </AppStore>
    );
};
