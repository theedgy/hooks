import React from 'react';

import './style.scss';

export const Loading = ({
    message = 'Loading...',
}) => {
    return (
        <div className="LoadingMessage">
            <div className="LoadingMessage__ring">
                <div />
                <div />
                <div />
                <div />
            </div>
            <span>{message}</span>
        </div>
    );
};
