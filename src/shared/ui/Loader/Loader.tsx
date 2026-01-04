import './Loader.scss';
import React from 'react';

export const Loader = React.memo(() => (
    <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
    </div>
));
