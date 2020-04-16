import React from 'react';

import './style.scss';

export const Error = ({ message }) => {
    return (
        <div className="Error">
            <h4 className={'Error__title'}>Error</h4>
            {message && <p className={'Error__message'}>{message}</p>}
        </div>
    );
};
